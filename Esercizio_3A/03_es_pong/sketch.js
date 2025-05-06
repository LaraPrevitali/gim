let posX
//devo alterare la x e la y per poter fare un'animazione 
//uso una variabile per poter definire i movimenti
let velX
let posY, velY

function setup() {
	createCanvas(800, 500)
	posX = 100
	velX = 3

	posY = 100
	velY = 3
}

function windowResized() {
	//resizeCanvas(windowWidth, windowHeight)
}

function draw() {
	//+1 va a destra, -1 va a sinistra
	//+2 va più veloce
	//= assegna a un elemento 
	//== uguale 

	//console.log(posX)

	posX = posX + velX
	posY = posY + velY

	if(posX >= width || posX < 0) {
		velX = -velX
	}
	if(posY >= height || posY < 0) {
		velY = -velY
	}
	
	background(0,0,0,10)
	fill (random(250), random(10), random(300))
	ellipse(posX, posY, 25, 25)
	


}