import * as React from "react";

import MoviesDetail from "../components/MoviesDetail";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Divider, Typography } from "@mui/material";

function MoviesDetailPages() {
  let movieParams = useParams();
  const [loading, setLoading] = React.useState();
  const [movieDetail, setMovieDetail] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `movie/${movieParams.movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        console.log(res.data);
        setMovieDetail(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [movieParams]);

  return (
    <>
      <Typography variant="h5" mb={2} sx={{ margin: "20px" }}>
        MOVIE INFO
      </Typography>
      <Divider />

      <MoviesDetail movieDetail={movieDetail} loading={loading} />
    </>
  );
}
export default MoviesDetailPages;
