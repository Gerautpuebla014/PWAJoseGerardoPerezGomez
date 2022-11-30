let canvas = 
    document.getElementById("canvas");
var anchura = canvas.width;
var altura = canvas.height;
var cd = canvas.getContext("2d");

Cuadricula(20, 20, 1);

document.getElementById("btnCalcular").addEventListener("click", calcular);
var arrxy= new Array(2);
function calcular(){
	var a = document.getElementById("txta").value;
	var b = document.getElementById("txtb").value;
	var c = document.getElementById("txtc").value;
	var d = document.getElementById("txtd").value;
	var e = document.getElementById("txte").value;
	var f = document.getElementById("txtf").value;
	var x1 = document.getElementById("txtx1").value;
	var x2 = document.getElementById("txtx2").value;
	var x3 = document.getElementById("txtx3").value;
	var x4 = document.getElementById("txtx4").value;
	var arr = new Array(2);
	var arr2 = new Array(2);
	CalExtremos(a,b,c,x1,x2,arr);
	CalExtremos(d,e,f,x3,x4,arr2);
    DibujarUno(a,b,c,x1,x2,arr);
    DibujarDos(d,e,f,x3,x4,arr2);
    s2e1(a,b,c,d,e,f,arrxy);
    Cruzar(arrxy);
    document.getElementById("ecua1").innerHTML = "Ecuacion uno: "+ a+"x + "+b+"y = "+c;
    document.getElementById("ecua2").innerHTML = "Ecuacion dos: "+d+"x + "+e+"y = "+f;
    document.getElementById("resultadodex").innerHTML = "x: "+ arrxy[0];
    document.getElementById("resultadodey").innerHTML = "y: "+ arrxy[1];
	}

function CalExtremos(a, b, c, x1, x2, arr){
	arr[0] = (c-a*x1)/b;
	arr[1] = (c-a*x2)/b; 
}

function Cuadricula(numX, numY, ancho){
	cd.beginPath();
	cd.strokeStyle = "#00FFFF";
	cd.lineWidth = ancho;
	for(i=0; i<anchura; i++){
		cd.moveTo(0,0+i*numX);
		cd.lineTo(anchura, 0+i*numX);
	}
	for(i=0; i<altura; i++){
		cd.moveTo(0+i*numY,0);
		cd.lineTo(0+i*numY,altura);
	}
	cd.stroke();

    cd.beginPath();
    cd.strokeStyle="#000000";
    cd.moveTo(canvas.width/2,0);
    cd.lineTo(canvas.width/2,canvas.height);
    cd.stroke();

    cd.beginPath();
    for(i=0; i<altura; i++){
		cd.moveTo(0+i*numY,altura/2);
		cd.lineTo(0+i*numY,altura/2-5);
	}
    cd.stroke();
    

    cd.beginPath();
    cd.moveTo(0,canvas.height/2);
    cd.lineTo(canvas.width,canvas.height/2);
    cd.stroke();

    cd.beginPath();
    for(i=0; i<anchura; i++){
		cd.moveTo(anchura/2,0+i*numX);
		cd.lineTo(anchura/2+5, 0+i*numX);
	}
    cd.stroke();

    cd.font = "20px serif";
    cd.strokeStyle = "#000000"; //red
    cd.strokeText("0", anchura/2-5, altura/2+5);

    cd.font = "10px serif";
    for(i=anchura/numX/2+1; i<anchura; i++){
		cd.strokeText("-"+(i-10),anchura/2-10, 0+i*numX);
	}

    for(i=anchura/numX/2+1; i<anchura; i++){
		cd.strokeText(i-10,anchura/2-10, altura-i*numX);
	}

    for(i=altura/numX/2+1; i<altura; i++){
		cd.strokeText(i-10,0+i*numX,altura/2-10);
	}

    for(i=altura/numX/2+1; i<altura; i++){
		cd.strokeText("-"+(i-10), altura-i*numX,altura/2-10);
	}
}

function s2e1(a, b, c, d, e, f, arrxy){
	arrxy[1] = (a*f-d*c)/(a*e-d*b); 
	arrxy[0] = (c-b*arrxy[1])/a 
    if( arrxy[1].toString() == "NaN" || arrxy[0].toString() == "NaN")
    {
        document.getElementById("excepcion").innerHTML = "No hay solucion las ecuaciones son equivalentes (NaN)";
    }
    else if (arrxy[1].toString() == "Infinity" || arrxy[0].toString() == "Infinity")
    {
        document.getElementById("excepcion").innerHTML = "No hay solucion, las rectas son paralelas (Infinity)";
    }
}

function DibujarUno(a,b,c,x1, x2, arrpunto)
{
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000000"; //black

    const circle1 = new Path2D();
    ctx.strokeStyle = "blue";
    circle1.arc(x1*20+canvas.width/2, -1*(arrpunto[0]*20-canvas.height/2),2,0,360*Math.PI);
    ctx.fill(circle1);

    const circle2 = new Path2D();
    circle2.arc(x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2),2,0,360*Math.PI);
    ctx.fill(circle2);
    
    ctx.beginPath();
    ctx.moveTo(x1*20+canvas.width/2, -1*(arrpunto[0]*20-canvas.height/2));
    ctx.lineTo(x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2));
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "#000000"; 
    ctx.strokeText("("+a+"x + "+b+"y = "+c+")", x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2));

}

function DibujarDos(d,e,f,x1, x2, arrpunto)
{
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000000"; 

    const circle1 = new Path2D();
    ctx.strokeStyle = "green";
    circle1.arc(x1*20+canvas.width/2, -1*(arrpunto[0]*20-canvas.height/2),2,0,360*Math.PI);
    ctx.fill(circle1);

    const circle2 = new Path2D();
    circle2.arc(x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2),2,0,360*Math.PI);
    ctx.fill(circle2);

    ctx.beginPath();
    ctx.moveTo(x1*20+canvas.width/2, -1*(arrpunto[0]*20-canvas.height/2));
    ctx.lineTo(x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2));
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "#000000"; 
    ctx.strokeText("("+d+"x + "+e+"y = "+f+")", x2*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2));

}

function Cruzar(arrpunto){
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#c82124";
    const circle1 = new Path2D();
    circle1.arc(arrpunto[0]*20+canvas.width/2, -1*(arrpunto[1]*20-canvas.height/2),3,0,360*Math.PI);
    ctx.font = "12px serif";
    ctx.strokeStyle = "#c82124";
    ctx.strokeText("("+arrpunto[0]+", "+arrpunto[1]+")", arrpunto[0]*20+canvas.width/2+10, -1*(arrpunto[1]*20-canvas.height/2));
    ctx.fill(circle1);
}