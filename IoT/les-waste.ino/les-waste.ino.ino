#include <dht.h>

dht DHT;

// Button pins and states
const int changeModeButtonPin = 2;
const int changeValButtonPin = 3;
int prevButtonState = LOW;

int analogInputVoltmeter = A1;
int dhtInputPin = A0;
float Vout = 0.00;
float Vin = 0.00;
float R1 = 10000.00; // resistance of R1 (10K)
float R2 = 1000.00; // resistance of R2 (1K)


const short READ_PRODUCT_TYPE = 0;
const short READ_DECAY_DAYS = 1;
const short FEED_DATA = 2;
// 0 - Read Product Type
// 1 - Read Decay Days
// 2 - Feed data
short mode = READ_PRODUCT_TYPE;

void setup() {
  Serial.begin(9600);
  
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(analogInputVoltmeter, INPUT);
  pinMode(dhtInputPin, INPUT);

  // Setup button pins
  pinMode(changeModeButtonPin, INPUT);
  pinMode(changeValButtonPin, INPUT);
}

void loop() {
  Serial.print("Mode = ");
  Serial.println(mode);
  if (mode == FEED_DATA) {
    feedData();
  } else if (mode == READ_PRODUCT_TYPE) {
    readProductType();
  } else if (mode == READ_DECAY_DAYS) {
    readDecayDays();
  }
  
  checkMode();
}

void checkMode() {
  int changeModeButtonState = digitalRead(changeModeButtonPin);
  if (changeModeButtonState == HIGH && prevButtonState == LOW) {
    mode++;
  }
  prevButtonState = changeModeButtonState;
}

void readDecayDays() {
  
}

void readProductType() {
  //Print Choose product on LCD
  
}

void feedData() {
  float Vin = getVolts();
  DHT.read11(dhtInputPin);
  
  printResults(Vin);

  
  if (Vin > 1) {
    digitalWrite(LED_BUILTIN, HIGH);
  } else {
    digitalWrite(LED_BUILTIN, LOW);
  }

  delay(1000);
}

float getVolts() {
  int val = analogRead(analogInputVoltmeter);
  Serial.print("Val  = ");
  Serial.println(val);
  // calculating voltage out i.e. V+, here 5.00
  Vout = (val * 5.00) / 1023.00; 
  Vin = Vout / (R2/(R1+R2));
  if (Vin < 0.009) {
     Vin = 0.00;
  }
  return Vin;
}

void printResults(float Vin) {  
  Serial.print("Voltage = ");
  Serial.print(Vin * 1000);
  Serial.print("mV ");
  Serial.print("Humidity = ");
  Serial.print(DHT.humidity);
  Serial.print("%  ");
  Serial.print("Temperature = ");
  Serial.print(DHT.temperature); 
  Serial.println("C  ");
}
