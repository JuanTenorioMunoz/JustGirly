
int trgPin = 8;
int echoPin = 7;
int pingTravelTime;
void setup() {
  // put your setup code here, to run once:
  pinMode(trgPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trgPin, HIGH);
  delayMicroseconds(1);
  pingTravelTime = pulseIn(echoPin, HIGH);
  delay(10);
  digitalWrite(trgPin, LOW);
  Serial.println(pingTravelTime);


  // put your main code here, to run repeatedly:
}