require('@tensorflow/tfjs-node');
const express = require('express');
var cors = require('cors');
const _ = require('lodash');
const loadCSV = require('./load-csv');
const LogisticRegression = require('./regression');

let regressionOranges, regressionApples;

console.log('Training started!');

console.log('Training oranges...');
// Oranges
(() => {
  const { features, labels, testFeatures, testLabels } = loadCSV(
    './data/oranges.csv',
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
  
  regressionOranges = new LogisticRegression(features, _.flatMap(labels), {
    learningRate: 1,
    iterations: 5,
    batchSize: 5000
  });
  
  regressionOranges.train();
  
  const accuracy = regressionOranges.test(testFeatures, _.flatMap(testLabels));
  console.log('Accuracy for oranges is: ', accuracy);
})();

console.log('Training apples...');
// Apples
(() => {
  const { features, labels, testFeatures, testLabels } = loadCSV(
    './data/apples.csv',
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
  
  regressionApples = new LogisticRegression(features, _.flatMap(labels), {
    learningRate: 1,
    iterations: 5,
    batchSize: 5000
  });
  
  regressionApples.train();
  
  const accuracy = regressionApples.test(testFeatures, _.flatMap(testLabels));
  console.log('Accuracy for apples is: ', accuracy);
})();

console.log('Training finished!');

const app = express();
const port = 3030;

app.use(cors());

app.get('/predict', (req, res) => {
  const { product, day, humidity, voltage } = req.query;

  if (!product || !day || !humidity || !voltage) {
    return res.send('Missing params!');
  }

  if (product === 'orange') {
    const prediction = regressionOranges.predict([[day, humidity, voltage]]).get(0) + 1;

    return res.json({ quality: prediction.toString() });
  }

  if (product === 'apple') {
    const prediction = regressionApples.predict([[day, humidity, voltage]]).get(0) + 1;

    return res.json({ quality: prediction.toString() });
  }

  return res.send('Invalid product!');  
});

app.get('/predictFullTensor', (req, res) => {
  const { product, day, humidity, voltage } = req.query;

  if (!product || !day || !humidity || !voltage) {
    return res.send('Missing params!');
  }

  if (product === 'orange') {
    const prediction = regressionOranges.predictFullTensor([[day, humidity, voltage]]);

    return res.json({ tensor: prediction });
  }

  if (product === 'apple') {
    const prediction = regressionApples.predictFullTensor([[day, humidity, voltage]]);

    return res.json({ tensor: prediction });
  }

  return res.send('Invalid product!');  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
