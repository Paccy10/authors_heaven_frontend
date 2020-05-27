/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button
} from '@material-ui/core';
import stringParser from 'react-to-string';
import htmlParser from 'html-react-parser';
import moment from 'moment';
import articleDefaultImg from '../assets/img/article.svg';

const HomeArticle = ({ article, onReadMore }) => {
  const { author } = article;
  const body = stringParser(htmlParser(article.body));

  return (
    <Card className="article-card">
      <CardHeader
        avatar={
          <Avatar
            src={author.image ? author.image.url : null}
            className="avatar"
          />
        }
        title={`${author.firstname} ${author.lastname}`}
        subheader={moment(article.createdAt).fromNow()}
      />
      <CardMedia
        className="media"
        image={article.image ? article.image.url : articleDefaultImg}
        title={article.title}
      />
      <CardContent>
        <h3>
          {article.title.length > 50
            ? `${article.title.substring(0, 50)}...`
            : article.title}
        </h3>
        <Typography variant="body2" color="textSecondary" component="p">
          {body.length > 200 ? `${body.substring(0, 210)}...` : body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          onClick={() => onReadMore(article.slug)}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

HomeArticle.propTypes = {
  article: PropTypes.object
};

export default HomeArticle;
