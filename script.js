 // Obtenemos el elemento canvas y su contexto
 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');
 
 // Variables de configuración
 const WIDTH = canvas.width;
 const HEIGHT = canvas.height;
 const CENTER_X = WIDTH / 2;
 const CENTER_Y = HEIGHT / 2;
 const RADIUS = 200;
 const COLORS = {
   background: '#494949',
   wheel: '#000',
   number: '#fff',
   green: '#00ff00',
   needle: '#f00'
 };
 
 // Distribución de los números en la ruleta
 const numeros = [
   [0, 'green'], [32, 'red'], [15, 'black'], [19, 'red'], [4, 'black'], [21, 'red'], [2, 'black'], [25, 'red'],
   [17, 'black'], [34, 'red'], [6, 'black'], [27, 'red'], [13, 'black'], [36, 'red'], [11, 'black'], [30, 'red'],
   [8, 'black'], [23, 'red'], [10, 'black'], [5, 'red'], [24, 'black'], [16, 'red'], [33, 'black'], [1, 'red'],
   [20, 'black'], [14, 'red'], [31, 'black'], [9, 'red'], [22, 'black'], [18, 'red'], [29, 'black'], [7, 'red'],
   [28, 'black'], [12, 'red'], [35, 'black'], [3, 'red'], [26, 'black']
 ];
 
 // Clase para representar la ruleta
 class Ruleta {
   constructor() {
     this.numero = null;
     this.girando = false;
     this.anguloVarilla = 0;
     this.velocidadVarilla = 0.1; // Ajusta la velocidad de rotación de la varilla
   }
 
   girar() {
     if (!this.girando) {
       this.girando = true;
 
       // Girar la varilla durante 10 segundos
       setTimeout(() => {
         this.seleccionarNumero();
         this.girando = false;
       }, 2000);
     }
   }
   seleccionarNumero() {
 this.numero = numeros[Math.floor(Math.random() * numeros.length)][0];
 }
 
 dibujar() {
 // Fondo de la ruleta
 ctx.fillStyle = COLORS.background;
 ctx.fillRect(0, 0, WIDTH, HEIGHT);
 
 // Dibujar el número seleccionado a la izquierda de la ruleta
 if (this.numero !== null) {
 ctx.save();
 ctx.fillStyle = COLORS.background;
 ctx.font = 'bold 16px Arial';
 ctx.fillText('Número Ganador', 50, CENTER_Y - RADIUS + 20);
 
 // Encontrar la casilla ganadora y obtener su información
 let casillaGanadora = null;
 for (let i = 0; i < numeros.length; i++) {
   if (numeros[i][0] === this.numero) {
     casillaGanadora = numeros[i];
     break;
   }
 }
 
 // Dibujar la casilla ganadora a la izquierda de la ruleta con su color de fondo y número
 if (casillaGanadora !== null) {
 ctx.fillStyle = casillaGanadora[1] === 'green' ? COLORS.green : casillaGanadora[1];
 ctx.beginPath();
 ctx.arc(120, CENTER_Y - RADIUS + 90, 18, 0, Math.PI * 2);
 ctx.fill();
 
 // Dibujar el número de la casilla ganadora
 ctx.fillStyle = COLORS.number;
 ctx.fillText(casillaGanadora[0].toString(), 120, CENTER_Y - RADIUS + 90);
 
 // Dibujar el texto "El número ganador es" en letras doradas
 ctx.fillStyle = 'gold';
 ctx.font = 'bold 16px Arial';
 ctx.fillText('El número ganador es', 120, CENTER_Y - RADIUS + 120);
 }
 ctx.restore();
 }
 // Ruleta
 ctx.fillStyle = COLORS.wheel;
 ctx.beginPath();
 ctx.arc(CENTER_X, CENTER_Y, RADIUS, 0, Math.PI * 2);
 ctx.fill();
 
 // Dibujar las casillas y los números en la ruleta
 ctx.textAlign = 'center';
 ctx.textBaseline = 'middle';
 for (let i = 0; i < numeros.length; i++) {
 const angulo = (i / numeros.length) * Math.PI * 2;
 const x = CENTER_X + (RADIUS - 30) * Math.cos(angulo);
 const y = CENTER_Y + (RADIUS - 30) * Math.sin(angulo);
 
 // Dibujar casilla
 const casillaColor = numeros[i][1];
 ctx.fillStyle = casillaColor === 'green' ? COLORS.green : casillaColor;
 ctx.beginPath();
 ctx.arc(x, y, 18, 0, Math.PI * 2);
 ctx.fill();
 
 // Dibujar número
 ctx.fillStyle = COLORS.number;
 ctx.fillText(numeros[i][0].toString(), x, y);
 }
 
 
 
 // Dibujar la varilla
 if (this.girando) {
 ctx.save();
 ctx.translate(CENTER_X, CENTER_Y);
 ctx.rotate(this.anguloVarilla);
 ctx.fillStyle = COLORS.needle;
 ctx.fillRect(-2, -2, 4, -RADIUS + 20);
 ctx.restore();
 }
 }
 
 mostrarResultado() {
 if (this.numero !== null) {
 console.log('El número ganador es:', this.numero);
 }
 }
 }
 
 // Función principal
 function main() {
 const ruleta = new Ruleta();
 const spinButton = document.getElementById('spin-button');
 
 spinButton.addEventListener('click', function() {
 ruleta.girar();
 });
 
 function loop() {
 ruleta.dibujar();
 ruleta.mostrarResultado();
 
 if (ruleta.girando) {
 ruleta.anguloVarilla += ruleta.velocidadVarilla;
 }
 
 requestAnimationFrame(loop);
 }
 
 loop();
 }
 
 // Ejecutar función principal
 main();