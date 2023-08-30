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
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import axios from "axios";

function TvshowsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [premiereYear, setPremiereYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [genre, setGenre] = useState("");
  const [creator, setCreator] = useState("");
  const [seasons, setSeasons] = useState("");
  const [rating, setRating] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tvshow/" + id)
      .then((response) => {
        setTitle(response.data.title);
        setCreator(response.data.creator);
        setGenre(response.data.genre);
        setPremiereYear(response.data.premiere_year);
        setEndYear(response.data.end_year);
        setSeasons(response.data.seasons);
        setRating(response.data.rating);
      })
      .catch((error) => {
        notifications.show({
          title: error.response.data.message,
          color: "red",
        });
      });
  }, []);

  const handleUpdateTvShows = async (event) => {
    event.preventDefault();
    // const response = await axios.post("http://localhost:5000/movie");
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:5000/tvshow/" + id,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          title: title,
          creator: creator,
          premiere_year: premiereYear,
          end_year: endYear,
          seasons: seasons,
          genre: genre,
          rating: rating,
        }),
      });
      // show add success message
      notifications.show({
        title: "Tvshow Edited",
        color: "green",
      });
      //redirect back to home page
      navigate("/");
    } catch (error) {
      console.log(error);
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    }
  };

  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Edit Movie
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
          value={creator}
          placeholder="Enter the movie creator here"
          label="Creator"
          description="The creator of the movie"
          withAsterisk
          onChange={(event) => setCreator(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={premiereYear}
          placeholder="Enter the premiere year here"
          label="Premiere Year"
          description="The premiere year of the movie"
          withAsterisk
          onChange={setPremiereYear}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={endYear}
          placeholder="Enter the end year here"
          label="End Year"
          description="The end year of the movie"
          withAsterisk
          onChange={setEndYear}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={seasons}
          placeholder="Enter the seasons here"
          label="Seasons"
          description="The seasons of the movie"
          withAsterisk
          onChange={setSeasons}
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
          description="The rating of the movie"
          withAsterisk
          onChange={setRating}
        />
        <Space h="20px" />
        <Button fullWidth onClick={handleUpdateTvShows}>
          Update
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

export default TvshowsEdit;
