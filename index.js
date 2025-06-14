const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight; 
console.log(c)
console.log(canvas)

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

    // update(){
    //     this.draw()
    //     this.position.y += this.velocity.y;

    //     if (this.position.y + this.height >= 730) {
    //         this.velocity.y = 0 
    //         this.position.x += this.velocity.x
    //     }
    // }
}



// let block = new Boundary(
//     {
//         position : {
//             x: 0, 
//             y: 0
//         }
//     }
// )

// function animate(){
    //     requestAnimationFrame(animate);
    //     block.update();
    // }
    
    // animate()
    
const map = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-'],
,
]

// for (let grid of map){
//     if (map[grid] === '-'){
//         new Boundary({position: {x: 20, y:30}})
//     }
// }
const boundaries = []

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
// const boundaries = [
//     new Boundary(
//         {
//             position : {
//                 x: 0, 
//                 y: 0
//             }
//         }
//     ),
//     new Boundary(
//         {
//             position : {
//                 x: 41, 
//                 y: 0
//             }
//         }
//     ),
//     new Boundary(
//         {
//             position : {
//                 x: 82, 
//                 y: 0
//             }
//         }
//     ),
// ];


boundaries.forEach(boundary => boundary.draw())