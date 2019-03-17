var fs = require('fs');

const result = ['day,humidity,voltage,quality'];

const dataPointsOranges = [
  [1,25,50,1],
  [2,33,90,1],
  [3,40,125,1],
  [4,50,170,1],
  [5,57,200,1],
  [6,64,250,2],
  [7,70,275,2],
  [8,74,300,2],
  [9,77,350,3],
  [10,80,400,3],
];

const dataPointsApples = [
  [1,25,450,1],
  [2,28,475,1],
  [3,30,500,1],
  [4,33,525,1],
  [5,39,580,1],
  [6,42,620,2],
  [7,46,650,2],
  [8,50,680,2],
  [9,55,710,3],
  [10,60,750,3],
];

const deviationPercent = 20;

dataPointsApples.forEach(([day, humidity, voltage, quality]) => {
  for (let i=0; i<20000; i++) {
    const factor1 = 1 + (Math.round(Math.random()*(2*deviationPercent)-deviationPercent) / 100);
    const factor2 = 1 + (Math.round(Math.random()*(2*deviationPercent)-deviationPercent) / 100);
    const factor3 = 1 + (Math.round(Math.random()*(2*deviationPercent)-deviationPercent) / 100);
    const factor4 = 1 + (Math.round(Math.random()*(2*deviationPercent)-deviationPercent) / 100);

    const newDay = Math.round(day * factor1);
    const newHumidity = Math.round(humidity * factor2);
    const newVoltage = Math.round(voltage * factor3);
    const newQuality = Math.round(quality * factor4);
  
    result.push(`\n${newDay},${newHumidity},${newVoltage},${newQuality}`);
  }
});

fs.writeFile('./data_new.csv', result, 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It is saved!');
  }
});
