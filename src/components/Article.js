/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';

class Article extends Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <Card className="article-card">
        <CardActionArea>
          <CardMedia
            className="media"
            image="https://i.pinimg.com/originals/4d/1c/5b/4d1c5b07a3fd870cede9ebcbbdef1d00.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default Article;
