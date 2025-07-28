const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight; 


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
// class Pellet extends Player {
//     constructor({ position }) {
//         super({
//             position,
//             velocity: { x: 0, y: 0 } // pellets are static
//         })
//         this.radius = 3; // smaller than the player
//     }

//     update() {
//         this.draw(); // no movement needed
//     }
// }

    


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

function createImage(src){
    const image = new Image();
    image.src = src;
    return image;
}

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
      
    }
  })
})


let keyHistory = [];

let lastKey = keyHistory[keyHistory.length - 1];


function cirlceCollidesWithRectangle({circle, rectangle}) {
    return circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height 
            && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x 
            && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y 
            && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
}
    
// lastKey = keys.w.pressed ? 'w' : keys.a.pressed ? 'a' : keys.s.pressed ? 's' : keys.d.pressed ? 'd' : '';  

function animate() {
  // console.log(keyHistory)
    requestAnimationFrame(animate);    

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
    
    // Second way of Fixing FLASHING
    for (let i = pellets.length - 1; i >= 0; i--){
      const pellet = pellets[i]
      
      pellet.draw()
      
      if (Math.hypot(pellet.position.x - player.position.x, 
        pellet.position.y - player.position.y) < pellet.radius + player.radius){
          console.log('touching')
          pellets.splice(i, 1)
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



// window.addEventListener('keydown', ({key}) => {
//   if (key == 'a') {
//     lastKey = 'a';
//   }
//   else if (key == 's' && lastKey == 'a'){
//     lastKey2 = 's';
    
//   }
//   else if (key == 's' && lastKey == 'w'){
//     lastKey2 = 'w'
//   }

//   if (key == 'd') {
//     lastKey = 'd'
//   }
//   else if (key == 'w' && lastKey == 'd'){
//     lastKey2 = 'w';
//   }
//   else if (key == 's' && lastKey == 'd'){
//     lastKey2 = 's'
//   }
// })


// keydown
window.addEventListener('keydown', ({ key }) => {
  console.log(key)
  if (key in keys){
    if (!keyHistory.includes(key)) {
      keyHistory.push(key);
    }
    keys[key].pressed = true;
  }
});

// keyup
window.addEventListener('keyup', ({ key }) => {
  if (key in keys){

    keyHistory = keyHistory.filter(k => k !== key);
    keys[key].pressed = false;
  }
});


animate()







