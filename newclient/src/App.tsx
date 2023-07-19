import "./App.css";
import { useEffect, useState, FC } from "react";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import { Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface News {
  imagePath: string;
  title: string;
  subtitle: string;
  likes: number;
}

const initialState: News[] = [
  {
    imagePath:
      "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
    title: "hello",
    subtitle: "blabla",
    likes: 3,
  },
  {
    imagePath:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    title: "hello",
    subtitle: "blabla",
    likes: 3,
  },
  {
    imagePath:
      "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    title: "hello",
    subtitle: "blabla",
    likes: 3,
  },
  {
    imagePath:
      "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    title: "hello",
    subtitle: "blabla",
    likes: 3,
  },
  {
    imagePath:
      "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    title: "hello",
    subtitle: "blabla",
    likes: 3,
  },
];

interface NewsItemProp {
  news: News;
  key: number;
}

export const NewsItem: FC<NewsItemProp> = ({ key: id, news }) => {
  const [count, setCount] = useState(0);
  console.log("render");
  return (
    <Grid item xs={4}>
      <Card>
        <CardMedia
          sx={{ height: 100 }}
          image={news.imagePath}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {news.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {news.subtitle}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            Like
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

//const initialState: News = [];

function App() {
  const [news, setNews] = useState<News[]>(initialState);
  const [count, setCount] = useState(0);

  // const handleClick = () => {
  //   console.log();
  //   setCount(count + 1);
  // };

  return (
    <Container maxWidth={"md"}>
      <h1>{count}</h1>
      <br />
      <br />
      <Grid container spacing={2}>
        {news.map((item, id) => (
          <NewsItem key={id} news={item} />
        ))}

        {/* {news.map((item, id) => (
          <Grid item key={id}>
            <Card sx={{ maxWidth: 245 }}>
              <CardMedia
                sx={{ height: 100 }}
                image={item.imagePath}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.subtitle}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleClick}>
                  Share
                </Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}*/}
      </Grid>
    </Container>
  );
}

export default App;
