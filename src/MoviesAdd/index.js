import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  Divider,
  NumberInput,
  Button,
  Group,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const addMovie = async (data) => {
  const response = await axios({
    method: "POST",
    url: "http://localhost:5000/movie",
    headers: { "Content-Type": "application/json" },
    data: data,
  });
  return response.data;
};

function MoviesAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [rating, setRating] = useState(1);

  //create mutation
  const createMutation = useMutation({
    mutationFn: addMovie,
    onSuccess: () => {
      // when the movie is created
      // show add success message
      notifications.show({
        title: "Movie Added",
        color: "green",
      });
      // redirect back to home page
      navigate("/");
    },
    onError: (error) => {
      //when there is an error in API call
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  // console.log(queryClient.getQueryData(["movies", ""]));

  const handleAddNewMovie = async (event) => {
    event.preventDefault();
    createMutation.mutate(
      JSON.stringify({
        title: title,
        director: director,
        release_year: releaseYear,
        genre: genre,
        rating: rating,
      })
    );
    // const response = await axios.post("http://localhost:5000/movie");
    // try {
    //   const response = await axios({
    //     method: "POST",
    //     url: "http://localhost:5000/movie",
    //     headers: { "Content-Type": "application/json" },
    //     data: JSON.stringify({
    //       title: title,
    //       director: director,
    //       release_year: releaseYear,
    //       genre: genre,
    //       rating: rating,
    //     }),
    //   });
    //   // show add success message
    //   notifications.show({
    //     title: "Movie Added",
    //     color: "green",
    //   });
    //   //redirect back to home page
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    //   notifications.show({
    //     title: error.response.data.message,
    //     color: "red",
    //   });
    // }
  };

  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Add New Movie
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={title}
          placeholder="Enter the movie title here"
          label="Title"
          description="The title of the movie"
          withAsterisk
          onChange={(event) => setTitle(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={director}
          placeholder="Enter the movie director here"
          label="Director"
          description="The director of the movie"
          withAsterisk
          onChange={(event) => setDirector(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={releaseYear}
          placeholder="Enter the release year here"
          label="Release Year"
          description="The release year of the movie"
          withAsterisk
          onChange={setReleaseYear}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={genre}
          placeholder="Enter the genre here"
          label="Genre"
          description="The genre of the movie"
          withAsterisk
          onChange={(event) => setGenre(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={rating}
          placeholder="Enter the rating here"
          label="Rating"
          min={1}
          max={10}
          precision={2}
          description="The rating of the movie"
          withAsterisk
          onChange={setRating}
        />
        <Space h="20px" />
        <Button fullWidth onClick={handleAddNewMovie}>
          Add New Movie
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back to Home
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}

export default MoviesAdd;
