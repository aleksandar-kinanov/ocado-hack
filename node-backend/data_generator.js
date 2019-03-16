var fs = require('fs');

const result = ['day,humidity,voltage,quality'];

const dataPoints = [
  [1,20,400,1],
  [2,25,430,1],
  [3,29,460,1],
  [4,33,480,2],
  [5,36,500,2],
  [6,38,520,3],
  [7,40,540,3],
];

const deviationPercent = 20;

dataPoints.forEach(([day, humidity, voltage, quality]) => {
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
