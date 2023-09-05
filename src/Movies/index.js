import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Button,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchMovies = async (genre = "") => {
  const response = await axios.get(
    "http://localhost:5000/movie" + (genre !== "" ? "?genre=" + genre : "")
  );
  return response.data; //movie data from express
};

const deleteMovie = async (movie_id = "") => {
  const response = await axios({
    method: "DELETE",
    url: "http://localhost:5000/movie/" + movie_id,
  });
};

function Movies() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [genre, setGenre] = useState("");
  // const [genreOptions, setGenreOptions] = useState([]);
  const {
    isLoading,
    isError,
    data: movies,
    error,
  } = useQuery({
    queryKey: ["movie", genre],
    queryFn: () => fetchMovies(genre),
  });

  //extract genre from movies
  // useEffect(() => {
  //   if (genre === "") {
  //     let options = [];
  //     //loop through all the movies to get the genre from each movie
  //     if (movies && movies.length > 0) {
  //       movies.forEach((movie) => {
  //         //to make sure genre wasnt already in the options
  //         if (!options.includes(movie.genre)) {
  //           options.push(movie.genre);
  //         }
  //       });
  //     }
  //     // console.log(options);
  //     setGenreOptions(options);
  //   }
  // }, [movies, genre]);

  //extract genre from movie using useMemo
  const memoryMovies = queryClient.getQueryData(["movie", ""]);
  const genreOptions = useMemo(() => {
    let options = [];
    //loop through all the movies to get the genre from each movie
    if (movies && movies.length > 0) {
      movies.forEach((movie) => {
        //to make sure genre wasnt already in the options
        if (!options.includes(movie.genre)) {
          options.push(movie.genre);
        }
      });
    }
    return options;
  }, [memoryMovies]);

  const deleteMutation = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      //triggered when API successfully executed
      queryClient.invalidateQueries({
        //ask React query to retrigger the API
        queryKey: ["movie", genre],
      });
      //movie is deleted message
      notifications.show({
        title: "Movie deleted",
        color: "green",
      });
    },
  });

  // if (isLoading) return <Loader />;

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/movie")
  //     .then((response) => {
  //       setMovies(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const filterMovie = async (genre = "") => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/movie?genre=" + genre
  //     );
  //     setMovies(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleMovieDelete = async (movie_id) => {
  //   try {
  //     await axios({
  //       method: "DELETE",
  //       url: "http://localhost:5000/movie/" + movie_id,
  //     });
  //     //show movie delete message
  //     notifications.show({
  //       title: "Movie Deleted",
  //       color: "green",
  //     });
  //     // // filter out the deleted movie (method 1)
  //     const newMovies = movies.filter((m) => m._id !== movie_id);
  //     // setMovies(newMovies);

  //     //method 2 (recall the api for movies again)
  //     // axios
  //     // .get("http://localhost:5000/movie")
  //     // .then((response) => {
  //     //   setMovies(response.data);
  //     // })
  //     // .catch((error) => {
  //     //   console.log(error);
  //     // });
  //   } catch (error) {
  //     notifications.show({
  //       title: error.response.data.message,
  //       color: "red",
  //     });
  //   }
  // };

  return (
    <>
      <Group position="apart">
        <Title order={3} align="center">
          Movies
        </Title>
        <Button component={Link} to="/movies_add" color="green">
          Add new movie
        </Button>

        {/* 
        Navigate method:
        <Button
          color="green"
          onClick={() => {
            navigate("/movie_add");
          }}
        >
          Add New
        </Button> */}
      </Group>
      <Space h="20px" />
      <Group>
        <select
          value={genre}
          onChange={(event) => {
            setGenre(event.target.value);
          }}
        >
          <option value="">All genre</option>
          {genreOptions.map((genre) => {
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            );
          })}
        </select>
        {/* <Button
          onClick={() => {
            setGenre("");
          }}
        >
          All
        </Button>

        <Button
          onClick={() => {
            setGenre("Drama");
          }}
        >
          Drama
        </Button>
        <Button
          onClick={() => {
            setGenre("Fantasy");
          }}
        >
          Fantasy
        </Button>
        <Button
          onClick={() => {
            setGenre("Action");
          }}
        >
          Action
        </Button>
        <Button
          onClick={() => {
            setGenre("Sci-Fi");
          }}
        >
          Sci-fi
        </Button> */}
      </Group>
      <Space h="30px" />
      <LoadingOverlay visible={isLoading} />
      <Grid>
        {movies
          ? movies.map((movie) => {
              return (
                <Grid.Col key={movie._id} span={4}>
                  <Card withBorder shadow="sm" p="20px">
                    <Title order={5}>{movie.title}</Title>
                    <Space h="20px" />
                    <Group position="center" spacing="5px">
                      <Badge color="green">{movie.director}</Badge>
                      <Badge color="yellow">{movie.genre}</Badge>
                      <Badge color="grape">{movie.rating}</Badge>
                    </Group>
                    <Space h="20px" />
                    <Group position="apart">
                      <Button
                        component={Link}
                        to={"/movies/" + movie._id}
                        color="blue"
                        size="xs"
                        radius="50px"
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          deleteMutation.mutate(movie._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
              );
            })
          : null}
      </Grid>
    </>
  );
}

export default Movies;
