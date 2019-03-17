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
    maxWidth: 1000,
    margin: '20px auto',
  },
  media: {
    height: 200,
  },
};

const Card = ({ classes, text, image }) => {
  const [caption, setCaption] = useState(`Click to see how your ${text} are doing...`);
  const [readings, setReadings] = useState(null);
  const [captionTensor, setCaptionTensor] = useState(null);

  let color = '#000000';
  if (caption.indexOf('1') > -1) color = '#24bb33'; 
  if (caption.indexOf('2') > -1) color = '#f0ad4e'; 
  if (caption.indexOf('3') > -1) color = '#bb2123'; 

  return (
    <CardMaterial className={classes.card} onClick={async () => {
      const { data: dataSamples } = await axios.get('http://172.26.17.163:5000/data');

      const dataLength = dataSamples.data.length;
      const day = (dataSamples.data.reduce((prev, current) => prev + current[2], 0)) / dataLength;
      const humidity = (dataSamples.data.reduce((prev, current) => prev + current[0], 0)) / dataLength;
      const voltage = (dataSamples.data.reduce((prev, current) => prev + current[1], 0)) / dataLength;
      setReadings(`Readings: Humidity(${humidity}%) & Voltage(${voltage}mV)`);

      const { data: newCaptionData } = await axios.get(
        `http://localhost:3030/predict?product=${text.slice(0, -1)}&day=${day}&humidity=${humidity}&voltage=${voltage}`
      );
      const caption = newCaptionData.quality
        .replace('1', '(1)First Grade')
        .replace('2', '(2)Second Grade')
        .replace('3', '(3)Third Grade');
      setCaption(`The quality of the ${text} is: ${caption}!`);

      const { data: newCaptionTensorData } = await axios.get(
        `http://localhost:3030/predictFullTensor?product=${text.slice(0, -1)}&day=${day}&humidity=${humidity}&voltage=${voltage}`
      );
      const captionTensor = newCaptionTensorData.tensor;
      setCaptionTensor(`The probabilities tensor is: ${captionTensor}`);
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
          <Typography component="p" variant="h6" style={{color}}>
            {caption}
          </Typography>
          <Typography component="p" variant="h6">
            {readings}
          </Typography>
          <Typography component="p">
            {captionTensor}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardMaterial>
  );
};

export default withStyles(styles)(Card);
