const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

/**************Movies*************/
app.get("/get-movie-list", async (req, res) => {
  try {
    const info = await pool.query("SELECT * FROM movies");

    res.status(200).json({
      status: "Success",
      info: info.rows.length,
      data: {
        info: info.rows,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/get-movie-list/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const video = await pool.query("SELECT * FROM movies where videoid=$1", [
      id,
    ]);
    console.log(video);

    if (video.rows) {
      res.status(200).json({
        status: "Success",
        length: video.rows.length,
        data: {
          movie_title: video.rows[0],
        },
      });
    } else {
      return res.status(404).json({ message: "error" });
    }
  } catch (err) {
    return res.status(404).json({ message: "Error" });
    console.log(err.message);
  }
});

app.post("/add-movie-list", async (req, res) => {
  try {
    const { link } = req.body;
    const { title } = req.body;
    const { imdb_rating } = req.body;
    const { date_of_release } = req.body;
    const { genreid } = req.body;
    const { movie_desc } = req.body;
    const {
      poster_link,
      cnames,
      cimgs,
      croles,
      cgenders,
      dname,
      dgender,
      dimg,
      dNumMovies,
    } = req.body;

    const isvideo = await pool.query(
      `SELECT videoid FROM movies WHERE link = $1`,
      [link]
    );

    if (isvideo.rows[0]) {
      return res.status(400).json({
        status: "Duplicate movie data",
      });
    }

    castIds = [];
    for (let i = 0; i < cnames.length; i++) {
      const [fname, lname] = cnames[i].split(" ");
      const cast = await pool.query(
        `SELECT actorid FROM movie_cast WHERE fname = $1 AND lname = $2`,
        [fname, lname]
      );
      if (cast.rows[0]) {
        castIds.push(cast.rows[0].actorid);
      } else {
        const newcast = await pool.query(
          "INSERT INTO movie_cast (fname,lname,aimg_link,gender) VALUES ($1,$2,$3,$4)  RETURNING *",
          [fname, lname, cimgs[i], cgenders[i]]
        );
        const actorid = newcast.rows[0].actorid;
        castIds.push(actorid);
      }
    }

    let directorId;
    const [fname, lname] = dname.split(" ");
    const director = await pool.query(
      `SELECT directorid FROM director WHERE fname = $1 AND lname = $2`,
      [fname, lname]
    );
    if (!director.rows[0]) {
      const newdirector = await pool.query(
        "INSERT INTO director (fname,lname,dimg_link,gender,no_of_movies) VALUES ($1,$2,$3,$4,$5)  RETURNING *",
        [fname, lname, dimg, dgender, dNumMovies]
      );
      directorId = newdirector.rows[0].directorid;
    } else {
      directorId = director.rows[0].directorid;
    }

    let video;
    const videoid = await pool.query(
      `SELECT videoid FROM movies WHERE link = $1`,
      [link]
    );
    if (!videoid.rows[0]) {
      video = await pool.query(
        "INSERT INTO movies (poster_link, link,title,imdb_rating,genreid,movie_desc,date_of_release) VALUES ($1,$2,$3,$4,$5,$6, $7)  RETURNING *",
        [
          poster_link,
          link,
          title,
          imdb_rating,
          genreid,
          movie_desc,
          date_of_release,
        ]
      );
    } else {
      video = videoid;
    }

    for (let i = 0; i < castIds.length; i++) {
      const acted_by = await pool.query(
        `SELECT * FROM acted_by WHERE actorid = $1 AND movieid = $2`,
        [castIds[i], video.rows[0].videoid]
      );
      if (!acted_by.rows[0]) {
        await pool.query(
          "INSERT INTO acted_by (actorid,movieid,cast_role) VALUES ($1,$2,$3)  RETURNING *",
          [castIds[i], video.rows[0].videoid, croles[i]]
        );
      }
    }

    const directed_by = await pool.query(
      `SELECT * FROM directed_by WHERE directorid = $1 AND movieid = $2`,
      [directorId, video.rows[0].videoid]
    );
    if (!directed_by.rows[0]) {
      await pool.query(
        "INSERT INTO directed_by (directorId,movieid) VALUES ($1,$2)  RETURNING *",
        [directorId, video.rows[0].videoid]
      );
    }
    res.status(201).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/update-movie/:videoid", async (req, res) => {
  try {
    const { videoid } = req.params;
    const { viewcount } = req.body;
    const { link } = req.body;
    const { title } = req.body;
    const { imdb_rating } = req.body;
    const { date_of_release } = req.body;
    const { genreid } = req.body;
    const { movie_desc } = req.body;

    const update_movie = await pool.query(
      "UPDATE movies SET viewcount=$1,link=$2,title=$3,imdb_rating=$4,genreid=$5,movie_desc=$6,date_of_release=$7 WHERE videoid=$8 RETURNING *",
      [
        viewcount,
        link,
        title,
        imdb_rating,
        genreid,
        movie_desc,
        date_of_release,
        videoid,
      ]
    );
    console.log(update_movie);
    res.status(204).json({
      status: "Success",
      data: {
        result: update_movie.rows[0],
      },
    });
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/delete-movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delete_movie = await pool.query(
      "DELETE FROM movies WHERE videoid=$1",
      [id]
    );
    console.log(delete_movie);
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err.message);
  }
});

/************************Users*******************/
app.get("/login-user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Query for user with matching email and password
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // If no matching user is found
    if (user.rows.length === 0) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // Extract user details from the query result
    const { user_fname, user_lname, user_email } = user.rows[0];

    // Set the cookie
    res.cookie(
      "user",
      JSON.stringify({
        name: `${user_fname} ${user_lname}`,
        email: user_email,
      }),
      {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: "None", // For cross-origin requests (if needed)
        secure: false, // Ensure this is true for HTTPS
      }
    );

    const userCookie = req.cookies.user;
    if (userCookie) {
      const user = JSON.parse(userCookie);
      console.log(user);
    }

    console.log(`Cookie set for user: ${user_email}`);

    // Send user details as response
    return res.status(200).send(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Server error" });
  }
});

app.post("/add-comments/:movieid", async (req, res) => {
  try {
    const { name } = req.body;
    const { comments } = req.body;
    const { movieid } = req.params;

    const comment = await pool.query(
      "insert into comment (username,comment,movieid) values ($1,$2,$3) returning *",
      [name, comments, movieid]
    );
    res.status(200).json({ status: "Success" });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get-movie-comment/:movid", async (req, res) => {
  try {
    const { movid } = req.params;

    const userComment = await pool.query(
      "select * from comment where movieid=$1",
      [movid]
    );
    return res.status(200).json({ info: userComment.rows });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/register", async (req, res) => {
  try {
    const {
      user_lname,
      user_fname,
      user_email,
      user_passwd,
      user_country,
      user_mobilenum,
      subid,
    } = req.body;

    const user = await pool.query(
      "select user_id from users where user_email=$1",
      [user_email]
    );

    if (user.rows[0]) {
      return res.status(400).send("User already exists");
    }

    const register = await pool.query(
      "INSERT INTO users (user_lname,user_fname,user_email,user_passwd,user_country,user_mobilenum,subid) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        user_lname,
        user_fname,
        user_email,
        user_passwd,
        user_country,
        user_mobilenum,
        subid,
      ]
    );
    return res.status(200).send(register.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

/**************director**********/

app.post("/reg-director", async (req, res) => {
  try {
    const { fname } = req.body;
    const { lname } = req.body;
    const { no_of_movies } = req.body;
    const { gender } = req.body;
    const { dimg_link } = req.body;

    const direc_register = await pool.query(
      "INSERT INTO direcctor (fname,lname,dimg_link,no_of_movies,gender) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [fname, lname, dimg_link, no_of_movies, gender]
    );
    return res.status(200).send(direc_register.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/director-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ddetails = await pool.query(
      "select * from director inner join directed_by on director.directorid=directed_by.directorid inner join movies on movies.videoid=directed_by.movieid where movies.videoid=$1;",
      [id]
    );
    console.log(ddetails);
    return res.status(200).json({
      info: ddetails.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
});

{
  /*****************Actors*********************/
}

app.get("/actor-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const adetails = await pool.query(
      "select * from movie_cast inner join acted_by on acted_by.actorid=movie_cast.actorid where acted_by.movieid=$1;",
      [id]
    );
    console.log(adetails);
    return res.status(200).json({
      info: adetails.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
});

/******************genre ****************/

app.get("/get-genre/:genid", async (req, res) => {
  try {
    const { genid } = req.params;
    const gen = await pool.query("select * from genre where genreid=$1", [
      genid,
    ]);

    return res.status(200).json(gen.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get-genre", async (req, res) => {
  try {
    const genre = await pool.query("select * from genre");

    return res.status(200).json(genre.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get-genre-list", async (req, res) => {
  try {
    const genre = await pool.query(
      " select * from genre inner join movies on genre.genreid=movies.genreid "
    );

    return res.status(200).json(genre.rows);
  } catch (error) {
    console.log(error.message);
  }
});

/***********************************Wishlist*******************************/

app.post("/add-to-wishlist/:vid/:usrid", async (req, res) => {
  try {
    const vid = req.params.vid;
    const usrid = req.params.usrid;
    const wishlist = await pool.query(
      "insert into wishlist(userid,videoid) values($2,$1)",
      [vid, usrid]
    );
    return res.status(200).json({ status: "Success" });
  } catch (error) {
    console.log(error.message);
  }
});

/*****************************Login and logout****************************/
app.post("/logout", (req, res) => {
  try {
    res.clearCookie("user");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

const port = process.env.SERVERPORT || 5001;
app.listen(port, (req, res) => {
  console.log(`Server is working at port ${port}`);
});
