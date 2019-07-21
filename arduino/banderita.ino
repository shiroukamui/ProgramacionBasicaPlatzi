
// Arduino y Servo https://www.tinkercad.com/things/9AZAi6Of2X1

#include <Servo.h>

int led = 13;
int sensor = A0;
int lightVal;
bool turn = 1;
Servo myServo;

void setup(){
    pinMode(led, OUTPUT);
    pinMode(sensor, INPUT);
    myServo.attach(9);
}

void loop(){
    lightVal = analogRead(sensor);
    if (50 < lightVal) {
        if (turn) {
            turn = 0;
            digitalWrite(led, HIGH);
            myServo.write(120);
        } else {
            turn = 1;
            digitalWrite(led, LOW);
            myServo.write(60);
        }
    } else {
        digitalWrite(led, LOW);
        myServo.write(0);
    }
    delay(1000);
}
