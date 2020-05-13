const gameConstants = {};

const game = {
  fieldElement: null,
  boyElement: null,
  boxElement: null,

  init() {
    this.initGameField();
    this.initGameElements();
    this.addEventListeners();
  },

  initGameField() {
    this.fieldElement = tools.addGameElement('game');
  },

  initGameElements() {
    this.boyElement = boy.init(this.fieldElement, 120, 10);
    this.boxElement = box.init(this.fieldElement,10,30);
  },

  addEventListeners() {
    document.addEventListener('keydown', (event) => {
      //console.log('keydown', event.keyCode);
      if(event.keyCode === 37) {
        boy.checkMoving(37);
      }
      if(event.keyCode === 39) {
        boy.checkMoving(39);
      }
      if(event.keyCode === 38) {
        boy.checkMoving(38);
      }
      if(event.keyCode === 40) {
        boy.checkMoving(40);
      }
    });

    document.addEventListener('keyup', (event) => {
      //console.log('keyup', event.keyCode);
    });
  },

  getField() {
    return this.fieldElement;
  },

  update() {}
};

const boy = {
  step: 10,
  health: 100,

  speed: 1,
  isMovingLeft: false,
  isMovingRight: false,
  isMovingUp: false,
  isMovingDown: false,

  boyElement: null,
  position: {
    x: 0,
    y: 0
  },

  init(parent, x, y) {
    this.boyElement = tools.addGameElement('boy', parent);
    this.boyElement.innerText = '^_^';

    console.log('init boy check')
    this.setPosition(x, y);

    return this.boyElement;
  },

  setPosition(x, y) {
    if (!this.isValidNewPosition(x, y)) { return; }

    this.position.x = x;
    this.position.y = y;

    this.drawPlayer(x, y);
  },

  drawPlayer(x, y) {
    this.boyElement.style.left = x+'px';
    this.boyElement.style.top = y+'px';
  },

  moveRight() {
    this.setPosition(this.position.x + this.step, this.position.y)
  },
  moveLeft() {
    this.setPosition(this.position.x - this.step, this.position.y)
  },
  moveUp() {
    this.setPosition(this.position.x, this.position.y -this.step)
  },
  moveDown() {
    this.setPosition(this.position.x, this.position.y + this.step)
  },
  isValidNewPosition(x, y) {
    let isVaid = true;
    const fieldElement = game.getField();


    const fieldWidth = fieldElement.offsetWidth;
    const fieldHeight = fieldElement.offsetHeight;

    const boyWidth = this.boyElement.offsetWidth;
    const boyHeight = this.boyElement.offsetHeight;

    if (
      (x + boyWidth > fieldWidth)
        || (y + boyHeight > fieldHeight)
          || (x < 0)
            || (y < 0)
    ) {
      isVaid = false;
    }

    return isVaid;
  },

  checkMoving(eventKeyCode) {
    this.isMovingLeft = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.isMovingRight = false;

    if(eventKeyCode === 37){
      this.isMovingLeft = true;
    }
    if (eventKeyCode === 39){
      this.isMovingRight = true;
    }
    if (eventKeyCode === 38){
      this.isMovingUp = true;
    }
    if(eventKeyCode === 40){
      this.isMovingDown = true;
    }
  },

  updatePosition() {
    if(this.isMovingLeft) {
       this.moveLeft();
    }
    if(this.isMovingRight){
      this.moveRight();
    }
    if(this.isMovingDown){
      this.moveDown();
    }
    if(this.isMovingUp){
      this.moveUp();
    }
  },

  update() {
    this.updatePosition();
  }
};

const box = {
  position: {
    x: 10,
    y: 30
  },

  boxElement: null,

  init(parent, x, y) {
    this.boxElement = tools.addGameElement('box', parent);
    // this.boxElement.innerText = '^_^';
    //
    // console.log('init boy check')
    // this.setPosition(x, y);
    this.drawBox(this.position.x, this.position.y);
    return this.boxElement;
  },

  // setPosition(x, y) {
  //   if (!this.isValidNewPosition(x, y)) { return; }
  //
  //   this.position.x = x;
  //   this.position.y = y;
  //
  //   this.drawPlayer(x, y);
  // },
  //
  drawBox(x, y) {
    this.boxElement.style.left = x+'px';
    this.boxElement.style.top = y+'px';
  },
};

const process = {
  run() {
    setInterval(() => {
      this.update();
    }, 30);
  },

  update() {
    game.update();
    boy.update();
  }
};


const tools = {
  addGameElement(id, parent) {
    const element = document.createElement('div');
    element.id = id;

    if (!parent) {
      parent = document.querySelector('body')
    }

    parent.appendChild(element);

    return element;
  }
}







game.init();
process.run();
