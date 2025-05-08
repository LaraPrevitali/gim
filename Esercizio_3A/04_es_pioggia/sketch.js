//in questo caso al posto dei soliti parametri ci sono delle variabili
function setup() {
	createCanvas(windowWidth, windowHeight)
}
//quando ridimensiono la finestra:
function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function draw() {
	background(0)
//la x del punto di partenza e quello di arrivo devono essere uguali
//gx = punto di partenza; gy = punto di arrivo; gl = lunghezza

for (let i=0; i<60; i++)
{	
	let gx = random(0, width)
	let gy = random(-150, height)
//lunghezza variabile da 50 a 150:
	let gl = random(50, 150)

	strokeWeight(random(1, 3))
	stroke (255, 200)
	line(gx, gy, gx, gy + gl)
}
	
}