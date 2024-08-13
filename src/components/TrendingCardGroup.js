import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MoviesCard from "./MoviesCard";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

function TrendingCardGroup({
  trendingList,
  cutInitial,
  loadingTrending,
  searchResults,
  searchQuery,
}) {
  const [cutList, setCutList] = useState([]);
  const [copiedList, setCopiedList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      if (searchResults.length > 0) {
        setIsSearching(true);
        setCopiedList([...searchResults]);
        setCutList([...searchResults].slice(0, 8));
      } else {
        setIsSearching(false);
        setCopiedList([...trendingList]);
        setCutList([...cutInitial].slice(0, 8));
      }
    } else {
      setIsSearching(false);
      setCopiedList([...trendingList]);
      setCutList([...cutInitial].slice(0, 8));
    }
  }, [searchResults, trendingList, cutInitial, searchQuery]);

  function handleList() {
    let y;
    if (copiedList.length === 0) {
      setCopiedList(isSearching ? [...searchResults] : [...trendingList]);
      y = isSearching
        ? [...searchResults].slice(0, 8)
        : [...trendingList].slice(0, 8);
    } else if (copiedList.length === 8) {
      setCopiedList(isSearching ? [...searchResults] : [...trendingList]);
      y = copiedList.splice(0, 8);
    } else {
      y = copiedList.splice(8, 8);
    }
    return y;
  }

  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" my={3}>
          TRENDING
        </Typography>

        <PaginationItem onClick={() => setCutList(handleList())} type="next" />
      </Stack>
      <Divider />
      <Grid container direction="row" spacing={5} mt={2}>
        {loadingTrending
          ? placeholder.map((item) => (
              <Grid key={item} item xs={6} sm={4} md={3}>
                {detailSkeleton}
              </Grid>
            ))
          : cutList.map((item) => (
              <Grid key={item.id} item xs={6} sm={6} md={3}>
                <MoviesCard item={item} />
              </Grid>
            ))}
      </Grid>
    </>
  );
}

export default TrendingCardGroup;
