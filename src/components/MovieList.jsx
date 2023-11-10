import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MOVIE_API_URL } from "../constants/const";
import axios from "axios";
import { data } from "autoprefixer";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-balham.css'; // Optional theme CSS

const MovieList = () => {
  const [movieList, setMovieList] = useState([{}]);

  useEffect(() => {
    getMovieList();
  }, []);
  const getMovieList = async () => {
    const response = await axios({
      method: 'get',
      url: MOVIE_API_URL,
    }).then(res => setMovieList(res.data))
      .then(console.log(movieList))

  };

  // const column = [
  //   {
  //     field: 'id',
  //     headerName: 'ID',
  //     width: 120
  //   },
  //   {
  //     field: 'movieTitle',
  //     headerName: 'Movie Title',
  //     width: 150
  //   },
  //   {
  //     field: 'movieRating',
  //     headerName: 'Movie Rating',
  //     width: 150
  //   },
  //   {
  //     field: 'movieYear',
  //     headerName: 'Year',
  //     width: 150
  //   },
  //   {
  //     field: 'movieRating',
  //     headerName: 'Rating',
  //     width: 150
  //   },
  //   {
  //     field: 'movieDescription',
  //     headerName: 'Description',
  //     width: 150
  //   },
  //   {
  //     field: 'genre',
  //     headerName: 'Genre',
  //     width: 150
  //   },
  //   {
  //     field: 'movieTotalEp',
  //     headerName: 'Total Ep',
  //     width: 150
  //   },
  //   {
  //     field: 'movieCurrentEp',
  //     headerName: 'Current Ep',
  //     width: 150
  //   },
  // ]



  return (
    <div className="flex gap-2 flex-wrap justify-left">
      {movieList?.map((item) => (
        <MovieCard key={item.id} data={item} movielist={movieList} setmovielist={setMovieList} />
      ))}
      {/* <AgGridReact
        rowData={movieList}
        columnDefs={column}
      /> */}

    </div>
  );
};

export default MovieList;
