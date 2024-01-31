const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "white";

class Particle {
    constructor(effect) {
        this.effect = effect;
        this.radius = Math.random() * 10 + 5;
        this.x =
            this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y =
            this.radius +
            Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 4 - 2;
    }
    draw(context) {
        context.fillStyle = `hsl(` + this.x * 0.5 + `, 100%, 50%)`;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
    update() {
        this.x += this.vx;
        if (this.x > this.effect.width - this.radius || this.x < this.radius)
            this.vx *= -1;

        // this.y += this.vy;
        this.y += this.vy;
        if (this.y > this.effect.height - this.radius || this.y < this.radius)
            this.vy *= -1;
    }
} // contains blueprint to create individual particle object

class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.particles = [];
        this.numberOfParticles = 100;
        this.createParticles();
    }
    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }
    handleParticle(context) {
        this.particles.forEach((particle) => {
            particle.draw(context);
            particle.update();
        });
    }
} // manage all particles

const effect = new Effect(canvas);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticle(ctx);

    requestAnimationFrame(animate);
}

animate();
