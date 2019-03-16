import React from 'react';
import Typography from '@material-ui/core/Typography';
import { default as CardMaterial } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: 500,
    margin: '10px auto'
  },
  media: {
    height: 250,
  },
};

const Card = ({ classes, text, image }) => {
  return (
    <CardMaterial className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={text}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </Typography>
          <Typography component="p">
            See how your {text} are doing
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardMaterial>
  );
};

export default withStyles(styles)(Card);