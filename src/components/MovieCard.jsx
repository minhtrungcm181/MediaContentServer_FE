import { GoPencil } from "react-icons/go";
import { BiTrashAlt } from "react-icons/bi";
import MovieStars from "./MovieStars";
import { Link } from "react-router-dom";
import axios from "axios";
import { MOVIE_API_URL } from "../constants/const";
import ConfirmDialog from "./ConfirmDialog";

// id: film.filmId,
//   movieUrl: film.movieUrl,
//     movieCurrentEp: film.movieCurrentEp,
//       movieDescription: film.movieDescription,
//         movieLogo: film.movieLogo,
//           movieM3U8: film.movieM3U8,
//             movieRating: film.movieRating,
//               movieTitle: film.movieTitle,
//                 movieTotalEp: film.movieTotalEp,
//                   movieYear: film.movieYear,
//                     genre: film.genre
const MovieCard = ({ data, setmovielist, movielist }) => {
  const { id, movieCurrentEp, genre, movieRating, movieDescription, movieLogo, movieTitle, movieTotalEp } = data;

  const handleMovieDelete = async (id) => {
    const data = await axios(MOVIE_API_URL, { method: "DELETE", data: { id } });
    const newmovielist = movielist.filter((item) => item._id != data.data._id);
    setmovielist(newmovielist);
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl w-1/5 h-45">
      <figure className="w-2/3">
        <img
          className="h-full"
          src={movieLogo}
          alt="Movie"
        />
      </figure>
      <div className="card-body space-y-1">
        <h2 className="card-title">{movieTitle}</h2>
        <div>
          <p className="text-xs text-slate-500">
            {movieDescription}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="badge badge-outline text-xs" >
            {genre}
          </div>
        </div>
        {/* <div className="rating rating-sm">
          <MovieStars movieName={movieName} rating={rating} id={_id} />
        </div> */}
        <div className="card-actions justify-end">
          <Link to={`/movie/${id}`}>
            <GoPencil />
          </Link>
          <ConfirmDialog
            message="This movie will be permanently deleted. Are you sure?"
            onConfirm={() => handleMovieDelete(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
