import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { default as CardMaterial } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = {
  card: {
    maxWidth: 500,
    margin: '10px auto',
  },
  media: {
    height: 250,
  },
};

const Card = ({ classes, text, image }) => {
  const [caption, setCaption] = useState(`Click to see how your ${text} are doing...`);
  
  return (
    <CardMaterial className={classes.card} onClick={async () => {
      const { data: dataSamples } = await axios.get('http://172.26.17.163:5000/data');

      const dataLength = dataSamples.data.length;

      const day = (dataSamples.data.reduce((prev, current) => prev + current[2], 0)) / dataLength;
      const humidity = (dataSamples.data.reduce((prev, current) => prev + current[0], 0)) / dataLength;
      const voltage = (dataSamples.data.reduce((prev, current) => prev + current[1], 0)) / dataLength;

      const { data: newCaptionData } = await axios.get(
        `http://localhost:3030/predict?product=${text.slice(0, -1)}&day=${day}&humidity=${humidity}&voltage=${voltage}`
      );

      const caption = newCaptionData.quality
        .replace('1', '(1)First Grade')
        .replace('2', '(2)Second Grade')
        .replace('3', '(3)Third Grade');

      setCaption(`The quality of the ${text} is: ${caption}!`);
    }}>
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
          <Typography component="p" variant="h6">
            {caption}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardMaterial>
  );
};

export default withStyles(styles)(Card);
