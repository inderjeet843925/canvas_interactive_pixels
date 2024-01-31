const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

// handle mouse
let mouse = {
    x: null,
    y: null,
    radius: 100,
};

window.addEventListener("mousemove", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log(mouse.x, mouse.y, mouse.radius);
});

ctx.fillStyle = "white";
ctx.font = "30px verdana";
ctx.fillText("A", 0, 30);
const data = ctx.getImageData(0, 0, 100, 100);
// console.log(data);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.hypot(dy, dx);
        if (distance < 100) {
            this.size = 15;
        } else {
            this.size = 3;
        }
    }
}

function init() {
    particleArray = [];
    for (let i = 0; i < 300; i++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        particleArray.push(new Particle(x, y));
    }
    // console.log(particleArray);
}

init();
console.log(particleArray);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}

animate();
