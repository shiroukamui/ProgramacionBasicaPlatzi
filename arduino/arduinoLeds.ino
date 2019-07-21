// Pares e Impares: https://www.tinkercad.com/things/72tYwN76Tpv
int leds[6] = {0,1,2,3,4,5};
int size = sizeof(leds) / sizeof(leds[0]);
int milisegundos = 600;

void setup(){
	for(int i=0; i<size; i++){
		pinMode(i, OUTPUT);
	}
}

void loop(){
	for(int i=0; i<size; i++){
        if (i%2 == 0) {
            digitalWrite(leds[i], HIGH);
        } else {
            digitalWrite(leds[i], LOW);
        }
	}
    delay(milisegundos);
	for(int i=0; i<size; i++){
        if (i%2 != 0) {
            digitalWrite(leds[i], HIGH);
        } else {
            digitalWrite(leds[i], LOW);
        }
	}
    delay(milisegundos);
}

/**************************************/

// Secuenciales: https://www.tinkercad.com/things/juOtVMttzZz
int leds[6] = {0,1,2,3,4,5};
int size = sizeof(leds) / sizeof(leds[0]);
int milisegundos = 100;

void setup(){
	for(int i=0; i<size; i++){
		pinMode(i, OUTPUT);
	}
}

void loop(){
	for(int i=0; i<size; i++){
        digitalWrite(leds[i], HIGH);
	    delay(milisegundos);
        digitalWrite(leds[i], LOW);
	}
  	for(int i=size-1; 0<=i; i--){
        digitalWrite(leds[i], HIGH);
	    delay(milisegundos);
        digitalWrite(leds[i], LOW);
	}
}