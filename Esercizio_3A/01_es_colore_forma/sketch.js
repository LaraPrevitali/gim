//questa funzione viene chiamata all'inizio.
//l'ordine delle coordinate è (x, y)
function setup() {
	createCanvas(400, 400)
}

//questa è un ciclo e verrà eseguita fino alla fine dei giorni
//esegue un'istruzione dopo l'altra (contrariamente dalle funzioni)
function draw() {
	background(200, 200, 200)

//definisce il colore dei filetti
	stroke (255, 120, 0)

	//è possibile disegnare delle linee attraverso i punti (pixel)
	point(20, 30)
	point(21, 30)
	point(22, 30)

	//i segmenti e i rettangoli vengono fatti con 4 coordinate (elementi)
	line(100, 100, 150, 300)

	//per cambiare il peso dei filetti
	strokeWeight (2)

	//per cambiare il colore dei filetti da qui in poi
	stroke (0, 200, 100)

	//per riempire le forme (il quarto valore è la trasparenza/canale aplha)
	fill (200, 0, 200, 100)

	//due valori uguali alla fine (o solo uno) per fare un quadrato
	rect(120, 130, 60, 60)

	//stessa cosa per le ellissi (o cerchi)
	ellipse (160, 150, 30)

	//togliere il riempimento
	noFill ()
	ellipse(140, 180, 70, 40)
	
	//fare delle forme attraverso dei punti
	fill(200, 200, 0)
	beginShape
	vertex(200, 240)
	vertex(300, 210)
	vertex(360, 110)
	endShape(close)

}