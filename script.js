/* eslint-disable no-alert */
const all = document.querySelector('.field');
const spider = document.querySelector('.spider');
/* eslint-disable no-plusplus */

// начало игры
function start() {
  const div = document.createElement('div');
  const startText = document.createTextNode('x вперед z назад');
  div.className = 'start';
  div.appendChild(startText);
  all.appendChild(div);
  const namePlayer = prompt('Введите Ваше имя', '');
  alert(`Ну что, поиграем, ${namePlayer}?`);
}

start();

// красные линии
const one = document.querySelector('.borderOne');
const two = document.querySelector('.borderTwo');
const three = document.querySelector('.borderThree');
const four = document.querySelector('.borderFour');
const five = document.querySelector('.borderFive');
const six = document.querySelector('.borderSix');
const seven = document.querySelector('.borderSeven');
const eight = document.querySelector('.borderEight');
const nine = document.querySelector('.borderNine');
const ten = document.querySelector('.borderTen');
const eleven = document.querySelector('.borderEleven');
const twelve = document.querySelector('.borderTwelve');

// прыжки
let position = -1;
function move(event) {
  const step = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve];
  if (event.key === 'x' && position < step.length - 1) {
    position += 1;
    step[position].append(spider);
  } else if (event.key === 'z' && position < step.length - 1) {
    position -= 1;
    step[position].append(spider);
  }
}

document.addEventListener('keydown', move);

// гоблины
const gob1 = document.querySelector('.goblin1');
const gob2 = document.querySelector('.goblin2');
const gob3 = document.querySelector('.goblin3');
const gob4 = document.querySelector('.goblin4');
const gob5 = document.querySelector('.goblin5');

// очки
const numberOfPoints = document.querySelector('.score');

// при выигрыше
function win() {
  const winImg = document.createElement('img');
  const newDiv = document.createElement('div');
  winImg.src = 'img/win.png';
  newDiv.className = 'win';
  newDiv.appendChild(winImg);
  all.appendChild(newDiv);
  gob1.style.animation = 'paused';
  gob2.style.animation = 'paused';
  gob3.style.animation = 'paused';
  gob4.style.animation = 'paused';
  gob5.style.animation = 'paused';
}

// обновление страницы
function reload() {
  window.location.reload();
}

// подсчёт очков
let score = 0;
function count(event) {
  if (event.key === 'x') {
    score++;
  } else {
    score--;
  }
  numberOfPoints.innerText = `score: ${score}`;
  if (score === 12) {
    win();
    setTimeout(reload, 1500);
  }
}

document.addEventListener('keydown', count);

// функция завершения игры
function endGame() {
  const newDiv = document.createElement('div');
  const lose = document.createElement('img');
  lose.src = 'img/you lose.gif';
  newDiv.className = 'lose';
  newDiv.appendChild(lose);
  all.appendChild(newDiv);
  gob1.style.animation = 'paused';
  gob2.style.animation = 'paused';
  gob3.style.animation = 'paused';
  gob4.style.animation = 'paused';
  gob5.style.animation = 'paused';
  setTimeout(reload, 2000);
}

// столкновение с гоблинами
setInterval(() => {
  const arr = [gob1, gob2, gob3, gob4, gob5];
  for (let gob = 0; gob < arr.length; gob++) {
    const spiderCoords = spider.getBoundingClientRect();
    const gobCoords = arr[gob].getBoundingClientRect();
    if (
      gobCoords.x <= spiderCoords.x
      && gobCoords.x >= spiderCoords.x - 100
      && gobCoords.y >= spiderCoords.y
      && gobCoords.y <= spiderCoords.y + 120) {
      endGame();
    }
  }
}, 20);
