#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <dht.h>

LiquidCrystal_I2C lcd(0x27, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE);
dht DHT;

// Button pins and states
const int changeModeButtonPin = 2;
const int changeValButtonPin = 3;
int prevModeButtonState = LOW;
int prevValButtonState = LOW;

int analogInputVoltmeter = A1;
int dhtInputPin = A0;
float Vout = 0.00;
float Vin = 0.00;
float R1 = 10000.00; // resistance of R1 (10K)
float R2 = 1000.00; // resistance of R2 (1K)


const short READ_PRODUCT_TYPE = 0;
const short READ_PRODUCT_AGE = 1;
const short FEED_DATA = 2;
// 0 - Read Product Type
// 1 - Read Decay Days
// 2 - Feed data
short mode = READ_PRODUCT_TYPE;

short productTypeIndex = 0;
String productTypes[] = {"Orange", "Apple"};
const short PRODUCT_TYPES_COUNT = 2;

short productAgeIndex = 0;
String productAges[] = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"};
const short PRODUCT_AGES_COUNT = 15;

void setup() {
  Serial.begin(9600);
  
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(analogInputVoltmeter, INPUT);
  pinMode(dhtInputPin, INPUT);

  // Setup button pins
  pinMode(changeModeButtonPin, INPUT);
  pinMode(changeValButtonPin, INPUT);

  // Setup LCD
  lcd.begin(16,2);
  lcd.clear();
}

void loop() {
  // Serial.print("Mode = ");
  // Serial.println(mode);
  if (mode == FEED_DATA) {
    feedData();
  } else if (mode == READ_PRODUCT_TYPE) {
    readProductType();
  } else if (mode == READ_PRODUCT_AGE) {
    readProductAge();
  }
  
  checkMode();
}

void checkMode() {
  int changeModeButtonState = digitalRead(changeModeButtonPin);
  if (changeModeButtonState == HIGH && prevModeButtonState == LOW) {
    mode++;
    lcd.clear();
    lcd.home();
  }
  prevModeButtonState = changeModeButtonState;
}

void readProductAge() {
  //Print Enter days of decay on LCD
  lcd.home();  
  lcd.print("Enter prod. age:");  
  // go to the next line
  lcd.setCursor(0, 1);
  lcd.print(productAges[productAgeIndex] + " ");
  checkVal(PRODUCT_AGES_COUNT, productAgeIndex); 
}

void readProductType() {
  //Print Choose product on LCD
  lcd.home();
  lcd.print("Choose product :");  
  // go to the next line
  lcd.setCursor(0, 1);
  lcd.print(productTypes[productTypeIndex]);
  checkVal(PRODUCT_TYPES_COUNT, productTypeIndex);  
}

void checkVal(int arrayLength, short& index) {
  Serial.println(arrayLength);
  int changeValButtonState = digitalRead(changeValButtonPin);
  if (changeValButtonState == HIGH && prevValButtonState == LOW) {
    if (index == arrayLength - 1) {
      index = 0;
    } else {
      index++;
    }    
  }
  prevValButtonState = changeValButtonState;
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

  lcd.print("Live data :");

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
