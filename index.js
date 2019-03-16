require('@tensorflow/tfjs-node');
const loadCSV = require('./load-csv');
const LogisticRegression = require('./regression');
const _ = require('lodash');

const { features, labels, testFeatures, testLabels } = loadCSV(
  './data_new.csv',
  {
    dataColumns: ['day', 'humidity', 'voltage'],
    labelColumns: ['quality'],
    shuffle: true,
    splitTest: 1000,
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
  batchSize: 50
});

regression.train();

const accuracy = regression.test(testFeatures, _.flatMap(testLabels));
console.log('Accuracy: ', accuracy);

const prediction = regression.predict([[4, 36, 600]]).get([0]);
console.log('Prediction: ', prediction);
