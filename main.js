class Snake {
 constructor() {
  this.id = 19;
  this.turnid = 19;
  this.lengthlastid = 19;
  this.turn = 'right';
  this.data = [];
  this.wholeWidth = 90;
  this.wholeHeight = 80;
  this.singleWidth = 5;
  this.Cmax = this.wholeWidth / this.singleWidth;
  this.Rmax = this.wholeHeight / this.singleWidth;
  this.time = 100;
  this.score = 0;
  this.domscore;
  this.reeaten = 0;
  this.getsnake();
 }

 getsnake() {
  this.snakeHead = document.getElementById('snake-part');
  this.snakeHead.style.left = '0vw';
  this.snakeHead.style.bottom = '5vw';
  this.rightMove();
  this.button();
 }

 calculateId(bottom, left) {
  const id = ((bottom / this.singleWidth) * this.Cmax + (left / this.singleWidth) + 1);
  return id;
 }

 calculateBottomLeft(id) {
  let left;
  if (id % 18 == 0)
   left = 5;
  else
   left = ((id % 18) - 1) * this.singleWidth;
  const bottom = parseInt(id / 18) * this.singleWidth;
  return [left, bottom];
 }

 foodRender() {
  this.food = document.getElementById('snake-food');
  this.domscore = document.getElementById('score');
  setInterval(() => {
   this.food.style.visibility = 'visible';
   const rand = Math.floor((Math.random() * 288) + 1);
   this.foodid = rand;
   const value = this.calculateBottomLeft(rand);
   this.food.style.left = `${value[0]}vw`;
   this.food.style.bottom = `${value[1]}vw`;
   this.food.textContent = '•';
  }, 2500);
 }

 button() {
  this.foodRender();
  const buttons = document.querySelectorAll('#buttons button');
  for (const button of buttons) {
   button.addEventListener('click', () => {
    this.turn = button.value;
    let newid = this.calculateId(parseInt(this.snakeHead.style.bottom), parseInt(this.snakeHead.style.left));
    this.turnid = newid;
    this.data.push({ turn: `${button.value}`, id: `${newid}` });
    this.turncheck();
   });
  }
 }

 leftMove() {
  clearInterval(this.interval);
  this.interval = setInterval(() => {
   this.snakeHead.style.visibility = 'visible';
   this.id = this.id - 1;
   this.snakeHead.style.left = `${parseInt(this.snakeHead.style.left) - 5}vw`;
   this.endReached();
  }, this.time);
 }

 rightMove() {
  clearInterval(this.interval);
  this.interval = setInterval(() => {
   this.snakeHead.style.visibility = 'visible';
   this.id = this.id + 1;
   this.snakeHead.style.left = `${parseInt(this.snakeHead.style.left) + 5}vw`;
   this.endReached();
  }, this.time);
 }

 upMove() {
  clearInterval(this.interval);
  this.interval = setInterval(() => {
   this.snakeHead.style.visibility = 'visible';
   this.id = this.id + this.Cmax;
   this.snakeHead.style.bottom = `${parseInt(this.snakeHead.style.bottom) + 5}vw`;
   this.endReached();
  }, this.time);
 }

 downMove() {
  clearInterval(this.interval);
  this.interval = setInterval(() => {
   this.snakeHead.style.visibility = 'visible';
   this.id = this.id - this.Cmax;
   this.snakeHead.style.bottom = `${parseInt(this.snakeHead.style.bottom) - 5}vw`;
   this.endReached();
  }, this.time);
 }

 foodEaten() {
  if (this.id == this.foodid && this.id != this.reeaten) {
   console.log('eaten');
   this.score += 1;
   this.reeaten = this.id;
   this.domscore.textContent = `${this.score}`;
   this.food.style.visibility = 'hidden';
  }
 }

 endReached() {
  if (this.id % 18 == 0 && this.id > 10 && this.turn == 'right') {
   clearInterval(this.interval);
   this.snakeHead.style.visibility = 'hidden';
   setTimeout(() => {
    this.id -= this.Cmax - 1;
    this.snakeHead.style.left = `0vw`;
    this.turncheck();
   }, this.time);
  } else if (this.id % 18 == 1 && this.turn == 'left') {
   clearInterval(this.interval);
   this.snakeHead.style.visibility = 'hidden';
   setTimeout(() => {
    this.id += this.Cmax - 1;
    this.snakeHead.style.left = `${this.wholeWidth-this.singleWidth}vw`;
    this.turncheck();
   }, this.time);
  } else if (this.id >= ((this.Cmax * (this.Rmax - 1)) + 1) && this.id <= (this.Cmax * this.Rmax) && this.turn == 'up') {
   clearInterval(this.interval);
   this.snakeHead.style.visibility = 'hidden';
   setTimeout(() => {
    this.id = this.id - (this.Cmax * (this.Rmax - 1));
    this.snakeHead.style.bottom = `0vw`;
    this.turncheck();
   }, this.time);
  } else if (this.id >= 1 && this.id <= this.Cmax && this.turn == 'down') {
   clearInterval(this.interval);
   this.snakeHead.style.visibility = 'hidden';
   setTimeout(() => {
    this.id = this.id + (this.Cmax * (this.Rmax - 1));
    this.snakeHead.style.bottom = `75vw`;
    this.turncheck();
   }, this.time);
  }
  this.foodEaten();
 }

 turncheck() {
  if (this.turn == 'left')
   this.leftMove();
  else if (this.turn == 'right')
   this.rightMove();
  else if (this.turn == 'up')
   this.upMove();
  else if (this.turn == 'down')
   this.downMove();
 }

}

class App {
 static snake() {
  new Snake();
 }
}

App.snake();