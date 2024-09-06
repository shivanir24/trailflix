import React, { useContext, useState, useEffect } from "react";
import MovieList from "../../api/MovieList";
import { MovieContext } from "../../context/MovieContext";
import { useNavigate, useParams } from "react-router-dom";

export default function VideoPlayer() {
  const { id } = useParams();
  const nav = useNavigate();

  // const [movieid, setMovieid] = useState(id);

  const { movies, setMovies } = useContext(MovieContext);
  const [actors, setActors] = useState("");
  const [director, setDirector] = useState("");
  const [comments, setComments] = useState("");
  const [firstname, setFirstname] = useState("");
  const [userComments, setUserComments] = useState([]);
  const [date, setDate] = useState("");
  const [genreid, setGenreid] = useState("");

  const [genreName, setGenreName] = useState("");

  const fetchData = async () => {
    try {
      const video = await MovieList.get(`/get-movie-list/${id}`);
      setMovies(video.data);
      setGenreid(movies?.data?.movie_title?.genreid);
      const adetail = await MovieList.get(`/actor-details/${id}`);
      setActors(adetail.data.info);
      const ddetail = await MovieList.get(`/director-details/${id}`);
      setDirector(ddetail.data.info);

      const user = await MovieList.get(`/get-movie-comment/${id}`);
      setUserComments(user.data.info);
      console.log(genreid);

      //console.log(movies?.data?.movie_title?.genreid);

      const gen = await MovieList.get(`/get-genre/${genreid}`);
      setGenreName(gen?.data);
      console.log(genreName);

      //console.log(video.data);
    } catch (error) {
      console.log(error.message);
      //redirect to homepage
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    console.log(movies);
    try {
      const user = await MovieList.post(
        `/add-comments/${movies.data.movie_title.videoid}`,
        {
          name: firstname,
          comments: comments,
        }
      );
      window.location.reload();

      console.log(user?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //const style = { on: { color: "#000" }, off: { color: "#111" } };

  useEffect(() => {
    fetchData();

    addComment();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <div>
        <iframe
          width="1000"
          height="500"
          src={movies?.data?.movie_title?.link}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="my-10">
        <h1 className="font-bold text-4xl dark:text-black">Movie Cast</h1>
      </div>
      <div className="flex gap-4">
        {actors &&
          actors.map((actor) => {
            return (
              <div className="block p-6 max-w-sm bg-gray-700 rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-700">
                <div key={actor?.movieid} class="flex items-center space-x-4 ">
                  <img
                    class="w-36 h-36 rounded-full"
                    src={actor?.aimg_link}
                    alt=""
                  />

                  <div className="space-y-1 font-medium dark:text-white">
                    <div className="text-white">
                      {actor?.fname.concat(" ".concat(actor.lname))}
                    </div>
                    <div className="text-white">Gender: {actor.gender}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="my-10">
        <h1 className="font-bold text-4xl dark:text-black">Director</h1>
      </div>
      <div>
        {director &&
          director.map((director) => {
            return (
              <div className="block p-6 max-w-sm bg-gray-700 rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-700">
                <div class="flex items-center space-x-4 ">
                  <img
                    class="w-36 h-36 rounded-full"
                    src={director?.dimg_link}
                    alt=""
                  />
                  <div class="space-y-1 font-medium dark:text-white ">
                    <div className="text-white hover:text-white ">
                      {director?.fname.concat(" ".concat(director.lname))}
                    </div>
                    <div className="text-white hover:text-white ">
                      Gender: {director?.gender}
                    </div>
                    <div className="text-white hover:text-white ">
                      No Of Movies: {director?.no_of_movies}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <p className="py-10 font-bold text-3xl">Movie Details</p>
      <div>
        <a
          href="#"
          class="flex flex-col items-center w-max h-100 bg-gray-700 rounded-lg border shadow-md md:flex-col md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg pt-6"
            src={movies?.data?.movie_title?.poster_link}
            alt=""
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
              {movies?.data?.movie_title?.title}
            </h5>
            <p class="mb-3 font-normal text-white dark:text-gray-400">
              {movies?.data?.movie_title?.movie_desc}
            </p>
            <div className="space-x-4 flex text-base">
              <p class="mb-1  font-normal text-5xl text-yellow-600">
                {"*".repeat(movies?.data?.movie_title?.imdb_rating)}
              </p>
              <p className="font-normal text-yellow-600 text-xl ">
                {movies?.data?.movie_title?.imdb_rating}
              </p>
            </div>
            <p className="text-white">
              Date of Release:{" "}
              {movies?.data?.movie_title?.date_of_release.slice(0, 10)}
            </p>
            {<p className="text-white pt-3">Genre: {genreName?.genre_name}</p>}
          </div>
        </a>
      </div>
      <div className="w-1/2">
        <p className="text-3xl py-10 font-bold text-center">Add Comments</p>
        <form
          className="pt-4"
          onSubmit={(e) => {
            addComment(e);
          }}
        >
          <div class="w-full mb-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div class="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
              <label for="comment" class="sr-only">
                Your comment
              </label>
              <input
                type="text"
                value={firstname}
                class="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="First Name"
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                required=""
              ></input>
            </div>
            <div class="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
              <label for="comment" class="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="4"
                value={comments}
                onChange={(e) => {
                  setComments(e.target.value);
                }}
                class="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Write a comment..."
                required=""
              ></textarea>
            </div>
            <div class="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
              <button
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Post comment
              </button>
            </div>
          </div>
        </form>
      </div>
      <p className="text-3xl py-6 font-bold ">Comments</p>
      <div class="w-1/2 bg-gray-700 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="grid mb-4">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            {userComments &&
              userComments.map((userComments) => {
                return (
                  <li class="py-3 sm:py-4 ">
                    <div class="items-baseline justify-between space-x-4">
                      <div class="flex-1 min-w-0">
                        <p class=" text-xl font-medium text-white truncate dark:text-white">
                          {userComments?.username}
                        </p>
                      </div>
                      <div class="">
                        <p class="text-white">{userComments?.comment}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
