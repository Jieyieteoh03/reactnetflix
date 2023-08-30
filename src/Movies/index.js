import { Title, Grid, Card, Badge, Group, Space, Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";

function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movie")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterMovie = async (genre = "") => {
    try {
      const response = await axios.get(
        "http://localhost:5000/movie?genre=" + genre
      );
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieDelete = async (movie_id) => {
    try {
      await axios({
        method: "DELETE",
        url: "http://localhost:5000/movie/" + movie_id,
      });
      //show movie delete message
      notifications.show({
        title: "Movie Deleted",
        color: "green",
      });
      // // filter out the deleted movie (method 1)
      const newMovies = movies.filter((m) => m._id !== movie_id);
      setMovies(newMovies);

      //method 2 (recall the api for movies again)
      // axios
      // .get("http://localhost:5000/movie")
      // .then((response) => {
      //   setMovies(response.data);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    } catch (error) {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    }
  };

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
        <Button
          onClick={() => {
            filterMovie("");
          }}
        >
          All
        </Button>

        <Button
          onClick={() => {
            filterMovie("Drama");
          }}
        >
          Drama
        </Button>
        <Button
          onClick={() => {
            filterMovie("Fantasy");
          }}
        >
          Fantasy
        </Button>
        <Button
          onClick={() => {
            filterMovie("Action");
          }}
        >
          Action
        </Button>
        <Button
          onClick={() => {
            filterMovie("Sci-Fi");
          }}
        >
          Sci-fi
        </Button>
      </Group>
      <Space h="30px" />
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
                          handleMovieDelete(movie._id);
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
