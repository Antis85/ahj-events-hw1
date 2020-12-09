import goblin from '../img/goblin.png';

document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('td');
  const cellsArr = [...cells];
  const icon = `<img src='${goblin}' alt='goblin icon'>`;
  const smashedCounterText = document.querySelector('.smashed');
  const missedCounterText = document.querySelector('.missed');

  const getrndCell = () => Math.floor(Math.random() * cellsArr.length);

  //  появление и удаление гоблина
  function getCellIndex(cellIndex) {
    if (cellIndex) {
      return document.querySelector(`.cell${cellIndex}`);
    }
    return null;
  }
  function addGoblin(cellIndex) {
    if (cellIndex) {
      getCellIndex(cellIndex).classList.add('goblin');
      getCellIndex(cellIndex).innerHTML = icon;
    }
  }
  function removeGoblin(cellIndex) {
    if (cellIndex) {
      getCellIndex(cellIndex).classList.remove('goblin');
      getCellIndex(cellIndex).innerHTML = '';
    }
  }
  //  стартовая позиция гоблина - рандом
  let startCell = getrndCell();
  addGoblin(startCell);
  //  клик по гоблину и промах
  let counterSmash = 0;
  let counterMiss = 0;
  let isSmash = false;
  cellsArr.forEach((cell) => {
    cell.addEventListener('mousedown', (e) => e.preventDefault());//  отключаем drag иконки гоблина
    cell.addEventListener('click', () => {
      if (cell.className.includes('goblin')) {
        counterSmash += 1;
        isSmash = true;
      }

      if (!cell.className.includes('goblin')) isSmash = false;

      smashedCounterText.textContent = counterSmash;
    });
  });
  //  смена позиции гоблина и подсчет промахов
  const goblinGenerator = setInterval(() => {
    let currentCell = getrndCell();
    if (startCell === currentCell) currentCell = getrndCell();
    removeGoblin(startCell);
    addGoblin(currentCell);
    startCell = currentCell;

    if (!isSmash) {
      counterMiss += 1;
      missedCounterText.textContent = counterMiss;
    }

    if (counterMiss === 5) {
      console.log('Game over!');
      document.querySelector('body>h1').innerHTML = 'Game over!';
      getCellIndex(currentCell).classList.remove('goblin');
      clearInterval(goblinGenerator);
    }

    isSmash = false;
  }, 1000);
});
