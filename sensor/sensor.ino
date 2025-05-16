int trgPin = 8;
int echoPin = 7;
long pingTravelTime;
float distanceCm;

void setup() {
  pinMode(trgPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trgPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trgPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trgPin, LOW);

  pingTravelTime = pulseIn(echoPin, HIGH);
  distanceCm = pingTravelTime * 0.034 / 2;

  //Serial.print("Distance: ");
  Serial.println(distanceCm);
  //Serial.println(" cm");

  delay(500);
}