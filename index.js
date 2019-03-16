require('@tensorflow/tfjs-node');
const loadCSV = require('./load-csv');
const LogisticRegression = require('./regression');

const { features, labels, testFeatures, testLabels } = loadCSV(
  './houses.csv',
  {
    dataColumns: ['bedrooms', 'sqft_living', 'condition', 'grade'],
    labelColumns: ['price'],
    shuffle: true,
    splitTest: 10000,
    converters: {
      price: value => {
        return value > 500000 ? 1 : 0;
      }
    }
  }
);

const regression = new LogisticRegression(features, labels, {
  learningRate: 0.5,
  iterations: 100,
  batchSize: 1000
});

regression.train();

console.log('Testing accuracy is:', regression.test(testFeatures, testLabels));
