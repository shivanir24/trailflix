import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "../../api/MovieList";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [rdate, setRdate] = useState("");
  const [rating, setRating] = useState("");
  const [link, setLink] = useState("");
  const [desc, setDesc] = useState("");
  const [genreid, setGenreid] = useState("");
  const [posterLink, setPosterlink] = useState("");
  const [cnames, setCnames] = useState([]);
  const [croles, setCroles] = useState([]);
  const [cimgs, setCimgs] = useState([]);
  const [cgenders, setCgenders] = useState([]);
  const [dname, setDname] = useState("");
  const [dimg, setDimg] = useState("");
  const [dgender, setDgender] = useState("");
  const [dNumMovies, setDNumMovies] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  {
    /*Director table*/
  }

  const handleChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await MovieList.post("/add-movie-list", {
        title: title,
        date_of_release: rdate,
        movie_desc: desc,
        genreid: genreid,
        poster_link: posterLink,
        link: link,
        imdb_rating: rating,
        cnames,
        cimgs,
        croles,
        cgenders,
        dname,
        dgender,
        dimg,
        dNumMovies,
      });

      console.log(response);
      alert("success");
      navigate("/");
    } catch (error) {
      setError("Failed to save movie as it might be a duplicate");
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
        <form action="#" method="POST" onSubmit={handleChanges}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-8 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6 lg:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Movie Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                  <label
                    htmlFor="rdate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Of Release
                  </label>
                  <input
                    type="date"
                    name="rdate"
                    id="rdate"
                    value={rdate}
                    onChange={(e) => {
                      setRdate(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Movie Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    id="link"
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="posterLink"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Poster Link
                  </label>
                  <input
                    type="text"
                    name="posterLink"
                    id="posterLink"
                    value={posterLink}
                    onChange={(e) => {
                      setPosterlink(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="desc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Movie Description
                  </label>
                  <textarea
                    rows="4"
                    cols="50"
                    name="desc"
                    id="desc"
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <lable
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    IMDB rating
                  </lable>
                  <input
                    type="number"
                    name="rating"
                    value={rating}
                    onChange={(e) => {
                      setRating(e.target.value);
                    }}
                    id="rating"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 ">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Genre ID
                  </label>
                  <input
                    type="number"
                    name="genreid"
                    id="genreid"
                    value={genreid}
                    onChange={(e) => {
                      setGenreid(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                {/* Cast names */}
                <div className="col-span-6 sm:col-span-3 ">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cast-1 Name
                  </label>
                  <input
                    type="text"
                    name="c1name"
                    id="c1name"
                    value={cnames[0]}
                    onChange={(e) => {
                      const updatedArray = [...cnames];
                      updatedArray[0] = e.target.value;
                      setCnames(updatedArray);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cast-1 Image
                  </label>
                  <input
                    type="text"
                    name="c1img"
                    id="c1img"
                    value={cimgs[0]}
                    onChange={(e) => {
                      const updatedArray = [...cimgs];
                      updatedArray[0] = e.target.value;
                      setCimgs(updatedArray);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cast-1 Gender
                  </label>
                  <input
                    type="text"
                    name="c1gender"
                    id="c1gender"
                    value={cgenders[0]}
                    onChange={(e) => {
                      const updatedArray = [...cgenders];
                      updatedArray[0] = e.target.value;
                      setCgenders(updatedArray);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cast-1 Role
                  </label>
                  <input
                    type="text"
                    name="c1role"
                    id="c1role"
                    value={croles[0]}
                    onChange={(e) => {
                      const updatedArray = [...croles];
                      updatedArray[0] = e.target.value;
                      setCroles(updatedArray);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cast-2 Name
                  </label>
                  <input
                    type="text"
                    name="c1name"
                    id="c1name"
                    value={cnames[1]}
                    onChange={(e) => {
                      const updatedArray = [...cnames];
                      updatedArray[1] = e.target.value;
                      setCnames(updatedArray);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cast-2 Image
                  </label>
                  <input
                    type="text"
                    name="c2img"
                    id="c2img"
                    value={cimgs[1]}
                    onChange={(e) => {
                      const updatedArray = [...cimgs];
                      updatedArray[1] = e.target.value;
                      setCimgs(updatedArray);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cast-2 Gender
                  </label>
                  <input
                    type="text"
                    name="c2gender"
                    id="c2gender"
                    value={cgenders[1]}
                    onChange={(e) => {
                      const updatedArray = [...cgenders];
                      updatedArray[1] = e.target.value;
                      setCgenders(updatedArray);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cast-2 Role
                  </label>
                  <input
                    type="text"
                    name="c1role"
                    id="c1role"
                    value={croles[1]}
                    onChange={(e) => {
                      const updatedArray = [...croles];
                      updatedArray[1] = e.target.value;
                      setCroles(updatedArray);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3 ">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Director name
                </label>
                <input
                  type="text"
                  name="dname"
                  id="dname"
                  value={dname}
                  onChange={(e) => {
                    setDname(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                />
                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Director image link
                  </label>
                  <input
                    type="text"
                    name="dimglink"
                    id="dimglink"
                    value={dimg}
                    onChange={(e) => {
                      setDimg(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Director Gender
                  </label>
                  <input
                    type="text"
                    name="dgender"
                    id="dgender"
                    value={dgender}
                    onChange={(e) => {
                      setDgender(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />

                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of movies directed
                  </label>
                  <input
                    type="number"
                    name="dnum"
                    id="dnum"
                    value={dNumMovies}
                    onChange={(e) => {
                      setDNumMovies(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>

            {error && <div className="text-red-500 text-lg bg-red-200 border-red-200 text-center p-3">{error}</div>}
          </div>
        </form>
      </div>
    </>
  );
}
