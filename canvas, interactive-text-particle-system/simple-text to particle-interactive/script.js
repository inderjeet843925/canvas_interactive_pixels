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
ctx.fillText("no more ", 0, 30);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);
console.log(textCoordinates);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30;
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
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = 1 - distance / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < 100) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0; x < textCoordinates.width; x++) {
            if (
                textCoordinates.data[
                    4 * y * textCoordinates.width + (4 * x + 3)
                ] > 128
            ) {
                let positionX = x;
                let positionY = y;

                particleArray.push(
                    new Particle(positionX * 10, positionY * 10)
                );
            }
        }
    }

    // for (let i = 0; i < 300; i++) {
    //     const x = Math.floor(Math.random() * canvas.width);
    //     const y = Math.floor(Math.random() * canvas.height);

    //     particleArray.push(new Particle(x, y));
    // }
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
