import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Container, Grid } from "@mui/material";
import TrendingCardGroup from "../components/TrendingCardGroup";
import Category from "../components/Category";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [trendingList, setTrendingList] = useState([]);
  const [cutInitial, setcutInitial] = useState([]);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoadingTrending(true);
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        setTrendingList(res.data.results);
        setcutInitial([...res.data.results].splice(16, 4));
        setLoadingTrending(false);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    if (q) {
      const fetchSearchResults = async () => {
        try {
          const res = await apiService.get(
            `/search/multi?api_key=${API_KEY}&query=${q}`
          );
          setSearchResults(res.data.results);
        } catch (e) {
          console.log(e.message);
        }
      };

      fetchSearchResults();
    }
  }, [q]);

  return (
    <Container sx={{ p: 1 }} maxWidth="lg">
      <Grid
        container
        direction="column"
        justifyContent={{ md: "center", xs: "flex-end" }}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid>
          <TrendingCardGroup
            trendingList={trendingList}
            cutInitial={cutInitial}
            loadingTrending={loadingTrending}
            searchResults={searchResults}
            searchQuery={q}
          />
        </Grid>
        <Grid item direction="column" mt={5} container>
          <Category />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
