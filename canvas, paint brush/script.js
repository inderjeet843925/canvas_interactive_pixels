const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

ctx.fillStyle = "red";
ctx.lineWidth = 2;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 3;
// ctx.shadowColor = "black";

let hue = 0;
let angle = 0;
let drawing = false;

ctx.globalCompositeOperation = "destination-over";

function drawShape(x, y, radius, inset, n) {
    ctx.fillStyle = `hsl(` + hue + `, 100%, 50%)`;
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - radius);
    for (let i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - radius * inset);
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - radius);
    }

    ctx.restore();
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

const radius = 30;
const inset = 0.2;
const n = 7;

// drawShape(50, 50, radius, inset, n);

window.addEventListener("mousemove", (e) => {
    if (drawing) {
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(angle);

        angle += 0.1;
        hue++;
        drawShape(0, 0, radius, inset, n);
        ctx.restore();
    }
});

window.addEventListener("mouseup", () => {
    drawing = false;
});

window.addEventListener("mousedown", () => {
    drawing = true;
});
