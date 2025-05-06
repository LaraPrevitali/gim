function setup() {
	createCanvas(400, 400)
	background (200, 0, 200)
}

function draw() {
	//background(255, 0, 0)
//disegnare solo quando clicco il mouse/controllo del flusso
//nelle parentesi va la condizioni 
//le parentesi graffe (option+8/9)
//parentesi qudre (option+5/6)
	if(mouseIsPressed) {
	//riempire che cambia colore
	fill (225, 225, 225)
	//interazione con il mouse
	ellipse(mouseX, mouseY, 20)
	//si possono invertire mouseX e Y per invertire i controlli 
	//variare la grandezza
	ellipse (width - mouseX, mouseY, 20) }

}

//se premi s salva immagine 
//se premi x cambia colore sfondo
function keyPressed() {
	
	if(key == 's') {
		save("immagine.png")}
	else if (key == 'x') {
		background(random(225), random(225), random(225))
	}

}

