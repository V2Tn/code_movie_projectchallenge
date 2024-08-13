import * as React from "react";
import Card from "@mui/material/Card";
import { Box, CardActionArea, styled } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../api/config";
import { useAuth } from "../contexts/AuthContext";

const MovieCard = styled(Card)(({ theme }) => ({
  color: theme.palette.success.main,
  margin: theme.spacing(2),
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.3)",
  },
}));

export default function ActionAreaCard({ item }) {
  const [showInfo, setShowInfo] = React.useState(false);
  const [trailerKey, setTrailerKey] = React.useState(null);
  const hoverTimeoutRef = React.useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  let movieParams = useParams();

  const handleClick = (e) => {
    if (auth.user) {
      navigate(`/movie/${movieParams.movieId}`);
    } else {
      navigate("/login");
    }
  };

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowInfo(true);
      fetchTrailer(); // Lấy trailer khi hover
    }, 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setShowInfo(false);
    setTrailerKey(null); // Ẩn trailer khi rời chuột
  };

  const fetchTrailer = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${API_KEY}`
      );
      const videos = response.data.results;
      const trailer = videos.find((vid) => vid.type === "Trailer");
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <MovieCard
      onClick={handleClick}
      sx={{ maxWidth: 345 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardActionArea LinkComponent={Link} to={`/movie/${item.id}`}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.poster_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "300px",
            position: "relative",
          }}
        >
          {showInfo && (
            <React.Fragment>
              {trailerKey && (
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  zIndex={2}
                  sx={{
                    transition: "opacity 0.5s ease-in-out",
                    opacity: showInfo ? 1 : 0,
                    height: "50%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Trailer"
                  />
                </Box>
              )}
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bgcolor="rgba(0, 0, 0, 0.7)"
                color="white"
                padding={1}
                zIndex={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                sx={{
                  transition: "opacity 0.5s ease-in-out",
                  opacity: showInfo ? 1 : 0,
                  height: "50%",
                }}
              >
                <Box paddingBottom={0.5}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "30px",
                    }}
                  >
                    {item.title}
                  </p>
                </Box>
                <Box maxHeight="50px" overflow="hidden">
                  <p style={{ margin: 0 }}>{item.overview}</p>
                </Box>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </CardActionArea>
    </MovieCard>
  );
}

// Container chứa các MovieCard
export function MovieList({ movies }) {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {movies.map((movie) => (
        <ActionAreaCard key={movie.id} item={movie} />
      ))}
    </Box>
  );
}
