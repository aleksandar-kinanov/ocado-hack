require('@tensorflow/tfjs-node');
const express = require('express');
const _ = require('lodash');
const loadCSV = require('./load-csv');
const LogisticRegression = require('./regression');

const { features, labels, testFeatures, testLabels } = loadCSV(
  './data_new.csv',
  {
    dataColumns: ['day', 'humidity', 'voltage'],
    labelColumns: ['quality'],
    shuffle: true,
    splitTest: 50000,
    converters: {
      quality: value => {
        if (value == 1) return [1,0,0];
        if (value == 2) return [0,1,0];
        return [0,0,1];
      }
    }
  }
);

const regression = new LogisticRegression(features, _.flatMap(labels), {
  learningRate: 1,
  iterations: 100,
  batchSize: 5000
});

regression.train();

const accuracy = regression.test(testFeatures, _.flatMap(testLabels));
console.log('Accuracy is: ', accuracy);

const app = express();
const port = 3030;

app.get('/prediction', (req, res) => {
  const { product, day, humidity, voltage } = req.query;

  if (!product || !day || !humidity || !voltage) {
    return res.send('Missing params!');
  }

  if (product === 'orange') {
    const prediction = regression.predict([[day, humidity, voltage]]).get([0]) + 1;

    return res.send(`Predicted ${product} quality is: ${prediction}!`);
  }

  return res.send('Invalid product!');  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
