import { useEffect, useState } from "react";
import {
  CLOUDINARY_IMAGE_UPLOAD_URL,
  GENRE_API_URL,
  MOVIE_API_URL,
  MOVIE_UPLOAD_API_URL,
} from "../constants/const";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddMovie = () => {
  const [image, setImg] = useState(null);
  const [videoSource, setVideo] = useState(null);
  const [movieRating, setMovieRating] = useState(5);
  const [movieTotalEp, setMovieTotalEp] = useState(1);
  const [movieCurrentEp, setMovieTCurrentEp] = useState(1);
  const [genre, setMovieGenre] = useState("hanh dong");
  const [movieTitle, setMovieTitle] = useState("");
  const [selectImageUrl, setSelecedImageUrl] = useState("");
  const [movieYear, setMovieYear] = useState("2023");
  const [movieDescription, setMovieDescription] = useState("excited movie !");
  const [errorImage, setErrorImg] = useState(false);
  const [errorVideo, setErrorVideo] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // getAllGenre();
    // if (param.id) {
    //   getMovieById(param.id);
    // }
  }, []);

  // const getMovieById = async (id) => {
  //   const response = await axios(MOVIE_API_URL + "/movieById", {
  //     method: "POST",
  //     data: { id },
  //   });
  //   const { rating, genre, movieName, _id, imageName } = response?.data;
  //   setRating(rating);
  //   setCheckedGenre(genre);
  //   setMovieName(movieName);
  //   setMovieId(_id);
  //   //setImg(URL.createObjectURL(`http://localhost:3456/images/${imageName}`));
  //   setSelecedImageUrl(imageName);
  // };
  // const getAllGenre = async () => {
  //   const data = await axios(GENRE_API_URL);
  //   setGenreList(data?.data);
  // };

  // const handleCheckbox = (event) => {
  //   const id = event.target.id;
  //   if (!checkedGenre.includes(id) && event.target.checked) {
  //     setCheckedGenre([...checkedGenre, id]);
  //   } else {
  //     const newList = checkedGenre.filter((item) => item != id);
  //     setCheckedGenre(newList);
  //   }
  // };
  const uploadSuccess = () => {
    return (
      <div class="flex items-center">
        <div>
          <span>Upload Success !</span>
        </div>
      </div>
    )
  }


  const handleImage = (event) => {
    const img = event.target.files[0];
    setImg(img);
    setSelecedImageUrl(URL.createObjectURL(img));
    setErrorImg(false);
  };
  const handleVideo = (event) => {
    const video = event.target.files[0];
    setVideo(video);
    setErrorVideo(false);
  }
  const handleMovieTitle = (event) => {
    setMovieTitle(event.target.value);
    setErrorTitle(false)
  }
  const handleAddMovie = async () => {

    if (image == null) {
      setErrorImg(true);
    }
    if (videoSource == null) {
      setErrorVideo(true);
    }
    if (movieTitle == "") {
      setErrorTitle(true);
    }

    else {

      setUploading(true);

      alert("Uploading, Please wait for a while")
      var data = new FormData();
      data.append("movieTitle", movieTitle);
      data.append("movieCurrentEp", movieCurrentEp);
      data.append("movieTotalEp", movieTotalEp);
      data.append("movieDescription", movieDescription);
      data.append("movieYear", movieYear);
      data.append("movieRating", movieRating);
      data.append("movieM3U8", "");
      data.append("genre", genre);
      data.append("filemp4", videoSource);
      data.append("fileJpg", image);

      var resp = await axios({
        method: 'post',
        url: MOVIE_UPLOAD_API_URL,
        data: data,
      })
      if (resp.status == 201) {
        setUploading(false)
        alert("Upload finished")
      }
    }
  }

  // const handleAddMovie = async () => {
  //   debugger;
  //   let movieImgUrl = movieId == 0 ? "" : selectImageUrl;
  //   if (movieId == 0) {
  //     var data = new FormData();
  //     data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
  //     data.append("file", img);
  //     data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

  //     const config = {
  //       method: "POST",
  //       body: data,
  //     };
  //     const response = await fetch(CLOUDINARY_IMAGE_UPLOAD_URL, config);
  //     const responseData = await response.json();
  //     movieImgUrl = responseData.url;
  //     setSelecedImageUrl(responseData.url);
  //   }

  //   if (movieImgUrl != "") {
  //     const response = await axios(MOVIE_API_URL, {
  //       method: "POST",
  //       data: {
  //         image: movieImgUrl,
  //         movieName,
  //         id: movieId,
  //         rating,
  //         genre: checkedGenre,
  //       },
  //     });
  //     if ((response.status = 200)) {
  //       navigate("/");
  //     }
  //   }
  // };

  return (
    <div className="w-full flex justify-center">
      <div className="flex-row bg-slate-900 p-8 rounded-md shadow-sm w-3/5">

        {/* add movie thumbnail */}

        <div className="w-full">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="file-input file-input-bordered file-input-primary w-full"
            />
            <div className="h-1/6 w-1/6 ">
              <img className="rounded-sm" src={selectImageUrl} alt="" />
            </div>
            {errorImage ? <span style={{ color: "red" }}>Please Enter some value</span> : ''}
          </div>
        </div>

        {/* add movie source */}
        <div className="w-full">
          <label className="label">
            <span className="label-text">Movie Source</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideo}
              className="file-input file-input-bordered file-input-primary w-full"
            />
            {errorVideo ? <span style={{ color: "red" }}>Please Enter some value</span> : ''}
          </div>
        </div>


        <div className="w-full">


          {/* add movie title */}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              value={movieTitle}
              onChange={handleMovieTitle}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            {errorTitle ? <span style={{ color: "red" }}>Please Enter some value</span> : ''}
          </div>



          {/* add movie description */}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              value={movieDescription}
              onChange={(e) => setMovieDescription(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
              required />
          </div>





          {/* add movie rating */}
          <div className="my-3">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <input
              type="text"
              value={movieRating}
              onChange={(e) => setMovieRating(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          {/* add movie year */}

          <div className="my-3">
            <label className="label">
              <span className="label-text">Year</span>
            </label>
            <input
              type="text"
              value={movieYear}
              onChange={(e) => setMovieYear(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>

          {/* add movie total ep */}
          <div className="my-3">
            <label className="label">
              <span className="label-text">Total Episodes</span>
            </label>
            <input
              type="number"
              value={movieTotalEp}
              onChange={(e) => setMovieTotalEp(e.target.value)}
              min="1" max="1000"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>

          {/* add movie current ep */}
          <div className="my-3">
            <label className="label">
              <span className="label-text">Current Episodes</span>
            </label>
            <input
              type="number"
              value={movieCurrentEp}
              onChange={(e) => setMovieTCurrentEp(e.target.value)}
              min="1" max="1000"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>

          {/* add movie genre */}
          <div className="my-3">
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setMovieGenre(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>


          {/* <div className="my-3 flex justify-between flex-wrap">
            {genreList.map((item) => (
              <div key={item.key} className="form-control ">
                <label className="label cursor-pointer space-x-2">
                  <span className="label-text">{item.genre}</span>
                  <input
                    id={item._id}
                    name={item.genre}
                    type="checkbox"
                    checked={checkedGenre.includes(item._id) || false}
                    className="checkbox checkbox-primary"
                    onChange={handleCheckbox}
                  />
                </label>
              </div>
            ))}
          </div> */}
          <div>
            <button
              className="btn btn-block bg-primary"
              onClick={handleAddMovie}
              disabled = {uploading}
              >
              {uploading ? 
              <span style={{ color: "white" }}>Uploading, wait for a while...</span> : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
