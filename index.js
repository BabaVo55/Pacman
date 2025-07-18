const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight; 
// console.log(c)
// console.log(canvas)

class Boundary {
    static width  = 40
    static height  = 40
    constructor({position}){
        this.position = position
        this.width = 40;
        this.height = 40;
        this.velocity = {
            x : 1.5,
            y : 11
        }
    }

    draw(){
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
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

        // if (this.position.x + this.radius >= Boundary.width * 6 -40 ||
        //     this.position.x - this.radius <= 0 + 40 ||
        //     this.position.y + this.radius >= Boundary.height * 5 -40 ||
        //     this.position.y - this.radius <= 0 + 40) {
        //         this.position.x -= this.velocity.x;
        //         this.position.y -= this.velocity.y;
        // }

    }
    
}

    


const boundaries = []

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

let lastKey = ''

const map = [
    ['-','-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ',' ','-'],
    ['-',' ','-',' ','-',' ','-'],
    ['-',' ',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-','-'],
]

map.forEach((row, i) => {
    row.forEach((col, j) => {
        switch (col) {
            case '-':
                boundaries.push(new Boundary({
                        position: {
                            x:Boundary.width * j,
                            y:Boundary.height * i
                        }
                    })
                )
                break
        }
    
    })
})

function cirlceCollidesWithRectangle({circle, rectangle}) {
     circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height 
            && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x 
            && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y 
            && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)

    if (keys.w.pressed && lastKey === 'w'){
        player.velocity.y = -5;
    }
    else if (keys.s.pressed && lastKey === 's'){
        player.velocity.y = 5;
    }
    else if (keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -5;
        }
    else if (keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 5;
    } 

    if (keys.d.pressed && lastKey === 'w' && player.velocity.y > 0){

    }

    boundaries.forEach(boundary =>{ 
        boundary.draw()
        if (
            player.position.y - player.radius + player.velocity.y <= boundary.position.y + boundary.height 
            && player.position.x + player.radius + player.velocity.x >= boundary.position.x 
            && player.position.y + player.radius + player.velocity.y >= boundary.position.y 
            && player.position.x - player.radius + player.velocity.x <= boundary.position.x + boundary.width
        )   {
                player.velocity.x = 0;
                player.velocity.y = 0;  
            }
    })
    player.update()

    // player.velocity.x = 0;
    // player.velocity.y = 0;


}


animate()
window.addEventListener('keydown', ({key}) => {
 
    switch(key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        }

                        
})
window.addEventListener('keyup', ({key}) => {
     
        switch(key){
        case 'w':
            keys.w.pressed = false;
            lastKey = ''
            break
        case 'a':
            keys.a.pressed = false;
            lastKey = ''
            break
        case 's':
            keys.s.pressed = false;
            lastKey = ''
            break
        case 'd':
            keys.d.pressed = false;
            lastKey = ''
            break
        
    }
    lastKey = keys.w.pressed ? 'w' : keys.a.pressed ? 'a' : keys.s.pressed ? 's' : keys.d.pressed ? 'd' : '';  


})
