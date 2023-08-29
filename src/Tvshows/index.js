import { Title, Grid, Card, Badge, Group, Space } from "@mantine/core";
import axios from "axios";
import { useState, useEffect } from "react";

function Tvshows() {
  const [tvshows, setTvShows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tvshow")
      .then((response) => {
        setTvShows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Title align="center">Tvshows</Title>
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
                      <Badge
                        variant="gradient"
                        gradient={{ from: "indigo", to: "cyan" }}
                      >
                        {tvshow.genre}
                      </Badge>
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
