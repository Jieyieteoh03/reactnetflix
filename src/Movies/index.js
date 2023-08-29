import { Title, Grid, Card, Badge, Group, Space } from "@mantine/core";
import axios from "axios";
import { useState, useEffect } from "react";

function Movies() {
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
  return (
    <>
      <Title order={3} align="center">
        Movies
      </Title>
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
