import React from "react";
import Grid from "@mui/material/Grid";
import MoviesCard from "../components/MoviesCard";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function FavoritePage() {
  let list = JSON.parse(localStorage.getItem("fav"));

  return (
    <>
      <Typography variant="h5" mb={2}>
        YOUR FAVORITES
      </Typography>
      <Divider />
      <Grid container direction="row" spacing={5} mt={2}>
        {list?.map((movie) => (
          <Grid key={movie.id} item xs={6} sm={4} md={3}>
            <MoviesCard item={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FavoritePage;
