#include <dht.h>

dht DHT;

int analogInputVoltmeter = A1;
int dhtInputPin = A0;
float Vout = 0.00;
float Vin = 0.00;
float R1 = 10000.00; // resistance of R1 (10K)
float R2 = 1000.00; // resistance of R2 (1K)

void setup() {
  Serial.begin(9600);
  
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(analogInputVoltmeter, INPUT);
  pinMode(dhtInputPin, INPUT);
}

void loop() {
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
