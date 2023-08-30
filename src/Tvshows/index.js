import { Title, Grid, Card, Badge, Group, Space, Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";

function Tvshows() {
  const [tvshows, setTvshows] = useState([]);
  // const [tvshowAPI, setTvshowAPI] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tvshow")
      .then((response) => {
        setTvshows(response.data);
        // setTvshowAPI(response.data);
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

  const handleTvshowDelete = async (tvshow_id) => {
    try {
      await axios({
        method: "DELETE",
        url: "http://localhost:5000/tvshow/" + tvshow_id,
      });
      //show movie delete message
      notifications.show({
        title: "TvShow Deleted",
        color: "green",
      });
      // // filter out the deleted movie (method 1)
      const newTvshows = tvshows.filter((t) => t._id !== tvshow_id);
      setTvshows(newTvshows);

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

  //API method
  // const filterTvshow = async (genre) => {
  //   if (genre !== "") {
  //     const newTvshow = tvshowAPI.filter((tv) => tv.genre.includes(genre));
  //     setTvshowAPI(newTvshow);
  //   } else {
  //     setTvshows(tvshowAPI);
  //   }
  // };

  return (
    <>
      <Group position="apart">
        <Title order={3} align="center">
          Tvshows
        </Title>
        <Button component={Link} to="/tvshows_add" color="green">
          Add new tvshow
        </Button>
      </Group>
      <Space h="20px" />
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
                    <Space h="20px" />
                    <Group position="apart">
                      <Button
                        component={Link}
                        to={"/tvshows/" + tvshow._id}
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
                          handleTvshowDelete(tvshow._id);
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

export default Tvshows;
