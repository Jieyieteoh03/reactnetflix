import { Title, Grid, Card, Badge, Group, Space, Button } from "@mantine/core";
import axios from "axios";
import { useState, useEffect } from "react";

function Tvshows() {
  const [tvshows, setTvshows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tvshow")
      .then((response) => {
        setTvshows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterTvshow = async (genre = "") => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tvshow?genre=" + genre
      );
      setTvshows(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Title align="center">Tvshows</Title>
      <Group>
        <Button
          onClick={() => {
            filterTvshow("");
          }}
        >
          All
        </Button>

        <Button
          onClick={() => {
            filterTvshow("Drama");
          }}
        >
          Drama
        </Button>

        <Button
          onClick={() => {
            filterTvshow("Action");
          }}
        >
          Action
        </Button>
        <Button
          onClick={() => {
            filterTvshow("Sci-Fi");
          }}
        >
          Sci-fi
        </Button>

        <Button
          onClick={() => {
            filterTvshow("Adventure");
          }}
        >
          Adventure
        </Button>

        <Button
          onClick={() => {
            filterTvshow("Thriller");
          }}
        >
          Thriller
        </Button>

        <Button
          onClick={() => {
            filterTvshow("Crime");
          }}
        >
          Crime
        </Button>

        <Button
          onClick={() => {
            filterTvshow("Mystery");
          }}
        >
          Mystery
        </Button>

        <Button
          onClick={() => {
            filterTvshow("History");
          }}
        >
          History
        </Button>

        <Button
          onClick={() => {
            filterTvshow("Biography");
          }}
        >
          Biography
        </Button>
      </Group>
      <Grid>
        {tvshows
          ? tvshows.map((tvshow) => {
              return (
                <Grid.Col key={tvshow._id} span={4}>
                  <Card withBorder shadow="sm" p="20px">
                    <Title order={5}>{tvshow.title}</Title>
                    <Space h="20px" />
                    <Group position="center" spacing="5px">
                      <Badge
                        variant="gradient"
                        gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                      >
                        {tvshow.creator}
                      </Badge>

                      {tvshow.genre.map((genre) => (
                        <Badge
                          key={genre}
                          variant="gradient"
                          gradient={{ from: "indigo", to: "cyan" }}
                        >
                          {genre}
                        </Badge>
                      ))}

                      <Badge
                        variant="gradient"
                        gradient={{ from: "teal", to: "lime", deg: 105 }}
                      >
                        {tvshow.rating}
                      </Badge>
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

export default Tvshows;
