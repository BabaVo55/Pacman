const canvas = document.querySelector('canvas');
let scoreL = document.getElementById('scoreL');
let result = document.getElementById('Result');

const c = canvas.getContext('2d');
canvas.width = 442;
canvas.height = 566; 
document.addEventListener('mousemove', (data) => {
  // console.log(data.x)
  // console.log(data.y)
  
})

class Boundary {
    static width  = 40
    static height  = 40
    constructor({position, image}){
        this.position = position
        this.width = 40;
        this.height = 40;
        this.velocity = {
            x : 1.5,
            y : 11
        }
        this.image = image;

    }
    
    draw(){  
      c.drawImage(this.image, this.position.x, this.position.y)
    }

}

class Player {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow';
        c.fill()
        c.closePath();
    }
    update(){
 
        this.draw()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

    }
    
}

class Ghost {
  static speed = 2
    constructor({position, velocity, color = 'red'}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.color = color;
        this.prevCollisions = [];
        this.speed = 2
        this.scared = false;
    }
    


    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.scared ? 'blue' : this.color;
        c.fill()
        c.closePath();
    }
    update(){
        // if (this.scared){
        //     this.color = 'blue';
        // }
 
        this.draw()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

    }
    
}
// lets add these changes for testing purposes
// lets add these changes for testing purposes
// lets add these changes for testing purposes
// lets add these changes for testing purposes

class Pellet {
    constructor({ position }) {
      this.position = position
      this.radius = 3
    }

    draw(){
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = 'white';
      c.fill();
      c.closePath()
    }
}    
class PowerUp {
    constructor({ position }) {
      this.position = position
      this.radius = 8
    }

    draw(){
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = 'white';
      c.fill();
      c.closePath()
    }
}    


let player = new Player({
    position : {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity : {
        x: 0,
        y: 0
    }
})



const boundaries = [];
const pellets = [];
const powerUps = [];


const ghosts = [
  new Ghost({
    position : {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2
    },
    velocity : {
      x: Ghost.speed,
      y: 0
    }
  }),
  new Ghost({
    position : {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2
    },
    velocity : {
      x: Ghost.speed,
      y: 0
    },
    color: 'pink'
  }),
  new Ghost({
    position : {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2
    },
    velocity : {
      x: Ghost.speed,
      y: 0
    },
    color: 'green'
  }),
];

let score = 0;
// THIS IS KEY RIGHT HERE
function createImage(src){
    const image = new Image();
    image.src = src;
    return image;
}
// THIS IS KEY RIGHT HERE

const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]

// Additional cases (does not include the power up pellet that's inserted later in the vid)
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeHorizontal.png')
          })
        )
        break
      case '|':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeVertical.png')
          })
        )
        break
      case '1':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner1.png')
          })
        )
        break
      case '2':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner2.png')
          })
        )
        break
      case '3':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner3.png')
          })
        )
        break
      case '4':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner4.png')
          })
        )
        break
      case 'b':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/block.png')
          })
        )
        break
      case '[':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capLeft.png')
          })
        )
        break
      case ']':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capRight.png')
          })
        )
        break
      case '_':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capBottom.png')
          })
        )
        break
      case '^':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capTop.png')
          })
        )
        break
      case '+':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/pipeCross.png')
          })
        )
        break
      case '5':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorTop.png')
          })
        )
        break
      case '6':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorRight.png')
          })
        )
        break
      case '7':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorBottom.png')
          })
        )
        break
      case '8':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/pipeConnectorLeft.png')
          })
        )
        break
      case '.':
        pellets.push(
          new Pellet({
            position: {
              x: j * Boundary.width + Boundary.width / 2,
              y: i * Boundary.height + Boundary.height / 2
            }
          })
        )
        break
    case 'p':
        powerUps.push(
            new PowerUp({
                position: {
                    x: j * Boundary.width + Boundary.width / 2,
                    y: i * Boundary.height + Boundary.height / 2
                }
            })
        )
        break;
    }
  })
})


// let keyHistory = [];

// let lastKey = keyHistory[keyHistory.length - 1];
console.log(powerUps)

function cirlceCollidesWithRectangle({circle, rectangle}) {
  const padding = (Boundary.width / 2) - circle.radius - 1
    return circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding // circle top  && rectangle bottom
            && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding // circle right && rectangle left
            && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding // circle bottom && rectangle top
            && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding // circle left && rectangle right
}

let animationId;
function animate() {
  // console.log(keyHistory)
    animationId = requestAnimationFrame(animate);
    // console.log(animationId)    
    // console.log(powerUps)
    
    c.clearRect(0, 0, canvas.width, canvas.height)
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                cirlceCollidesWithRectangle({
                    circle: {...player, velocity:{
                        x: 0,
                        y: -5
                    }}, 
                    rectangle: boundary
                })
            ){
                player.velocity.y = 0;
                break;

            } else {
                player.velocity.y = -5;
            }
        }
    }

    else if (keys.s.pressed && lastKey === 's'){
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                cirlceCollidesWithRectangle({
                    circle: {...player, velocity:{
                        x: 0,
                        y: 5
                    }}, 
                    rectangle: boundary
                })
            ){
                player.velocity.y = 0;
                break;;

            } else {
                player.velocity.y = 5;
            }
        }
    }
     
    else if (keys.a.pressed && lastKey === 'a'){
        for (let i = 0; i < boundaries.length; i++) {

        const boundary = boundaries[i];

        if (
            cirlceCollidesWithRectangle({
            circle: {...player, velocity:{
                x: -5,
                y: 0
            }},
            rectangle: boundary
        })
        ) {
            player.velocity.x = 0;
            break;
        }else {
            player.velocity.x = -5;
        }
        }}

    else if (keys.d.pressed && lastKey === 'd'){
        for (let i = 0; i < boundaries.length; i++) {

            const boundary = boundaries[i];

            if (
                cirlceCollidesWithRectangle({
                    circle: {...player, velocity:{
                        x: 5,
                        y: 0
                    }}, 
                    rectangle: boundary
                })
            ) {
                player.velocity.x = 0;
                break;
            } else {
                player.velocity.x = 5;
            }
        }
    }

    else {
        player.velocity.x = 0;
        player.velocity.y = 0;
    }
    
    for (let j = powerUps.length - 1; j >= 0; j--){
        const powerUp = powerUps[j];
        console.log()
        
        powerUp.draw()
        if (Math.hypot(
            player.position.x - powerUp.position.x,
            player.position.y - powerUp.position.y) < player.radius - powerUp.radius
        ){
            powerUps.splice(j, 1);
            ghosts.forEach(ghost => {
                ghost.scared = true
                setTimeout(() => {
                    ghost.scared = false

                }, 5000)
            })
        }
    }
    // Second way of Fixing FLASHING
    for (let i = pellets.length - 1; i >= 0; i--){
      const pellet = pellets[i]
      
      pellet.draw()
      
      if (Math.hypot(pellet.position.x - player.position.x, 
        pellet.position.y - player.position.y) < pellet.radius + player.radius){
          // console.log('touching')
          pellets.splice(i, 1)
          score += 1
          scoreL.innerHTML = score
      }
      
    }
    boundaries.forEach(boundary =>{ 
        boundary.draw()
        // ONE WAY OF STOPPING FLASHING
        // pellets.forEach((pellet, i) => {
        //   pellet.draw()
          
        //   if (Math.hypot(pellet.position.x - player.position.x, 
        //     pellet.position.y - player.position.y) < pellet.radius + player.radius){
        //       console.log('touching')
        //       pellets.splice(i, 1)
        //     }
        // })
        if (
            cirlceCollidesWithRectangle({
                circle: player, rectangle: boundary
            })
        )   {
            player.velocity.x = 0;
            player.velocity.y = 0;
        }
    })
    player.update()

    ghosts.map(ghost => {
      ghost.update()
      if (Math.hypot(
        ghost.position.x - player.position.x, 
        ghost.position.y - player.position.y
      ) < 
        ghost.radius + player.radius && !ghost.scared){
          cancelAnimationFrame(animationId)
          result.innerHTML = 'You Loose Bruh'
      }
      //WRONG VERSION
      // if (ghost.position.x + ghost.position.y + ghost.radius === player.position.x + player.position.y + player.radius){
      //   console.log('game over')
      // }

      const collisions = []
      boundaries.forEach(boundary => {
        if (
                cirlceCollidesWithRectangle({
                    circle: {...ghost, velocity:{
                        x: ghost.speed,
                        y: 0
                    }}, 
                    rectangle: boundary
                }) && !collisions.includes('right')
            ){
              collisions.push('right')
            }
        if (
                cirlceCollidesWithRectangle({
                    circle: {...ghost, velocity:{
                        x: -ghost.speed,
                        y: 0
                    }}, 
                    rectangle: boundary
                }) && !collisions.includes('left')
            ){
              collisions.push('left')
            }
        if (
                cirlceCollidesWithRectangle({
                    circle: {...ghost, velocity:{
                        x: 0,
                        y: ghost.speed
                    }}, 
                    rectangle: boundary
                }) && !collisions.includes('down')
            ){
              collisions.push('down')
            }
        if (
                cirlceCollidesWithRectangle({
                    circle: {...ghost, velocity:{
                        x: 0,
                        y: -ghost.speed
                    }}, 
                    rectangle: boundary
                }) && !collisions.includes('up')
            ){
              collisions.push('up')
            }
      })
      // A.I 
      if (collisions.length > ghost.prevCollisions.length){
        ghost.prevCollisions = collisions;
      }
      if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)){
        
        if (ghost.velocity.x > 0 ) ghost.prevCollisions.push('right')
        else if (ghost.velocity.x < 0 ) ghost.prevCollisions.push('left')
        else if (ghost.velocity.y > 0 ) ghost.prevCollisions.push('up')
        else if (ghost.velocity.y < 0 ) ghost.prevCollisions.push('down')

        // console.log(collisions)
        // console.log(ghost.prevCollisions)

        const pathways = ghost.prevCollisions.filter((collision) => {
          return !collisions.includes(collision)
        })

        // console.log({pathways})

        const direction = pathways[Math.floor(Math.random() * pathways.length)]
        // console.log({direction})

        switch (direction){
          case 'down':
            ghost.velocity.y = ghost.speed;
            ghost.velocity.x = 0;
          break
          case 'up':
            ghost.velocity.y = -ghost.speed;
            ghost.velocity.x = 0;
          break
          case 'left':
            ghost.velocity.y = 0;
            ghost.velocity.x = -ghost.speed
          break
          case 'right':
            ghost.velocity.y = 0;
            ghost.velocity.x = ghost.speed;
          break
        }

        ghost.prevCollisions = []
      }
      // console.log(collisions)
    })
}

const keys = {
    w : {
        pressed: false
    },
    a : {
        pressed: false
    },
    s : {
        pressed: false
    },
    d : {
        pressed: false
    },
}



animate()
window.addEventListener('keydown', ({key}) => {
 
    switch(key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break;
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break;
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break;
        }

                        
})
window.addEventListener('keyup', ({key}) => {
     
        switch(key){
        case 'w':
            keys.w.pressed = false;
            lastKey = ''
            break;
        case 'a':
            keys.a.pressed = false;
            lastKey = ''
            break;
        case 's':
            keys.s.pressed = false;
            lastKey = ''
            break;
        case 'd':
            keys.d.pressed = false;
            lastKey = ''
            break;
        
    }

    lastKey = keys.w.pressed ? 'w' : keys.a.pressed ? 'a' : keys.s.pressed ? 's' : keys.d.pressed ? 'd' : '';  


})
