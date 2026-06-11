const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

const COLORS = [
'#ffe600','#fff176','#ffee00','#ffd600','#ffe066',
'#ffe600','#fff176','#ffee00',
'#ff3cac','#ff6ad5','#f72585',
'#00d4ff','#00fff7','#7df9ff','#4cc9f0',
'#c77dff','#ffffff','#ffe0f0',
'#ffe600','#fff176','#ffe600'
];

let stars = [];

function resize() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
initStars();
}

function initStars() {
const W = canvas.width, H = canvas.height;
const COUNT = Math.floor((W * H) / 420);
stars = [];
for (let i = 0; i < COUNT; i++) {
stars.push({
x: Math.random() * W,
y: Math.random() * H,
size: Math.random() * 1.2 + 0.15,
color: COLORS[Math.floor(Math.random() * COLORS.length)],
alpha: Math.random(),
speed: Math.random() * 0.1 + 0.05,
phase: Math.random() * Math.PI * 2,
spike: Math.random() > 0.68,
spikeSize: Math.random() * 4 + 1.5
});
}
}

function drawStar(x, y, size, color, alpha, spike, spikeSize) {
ctx.save();
ctx.globalAlpha = alpha;
ctx.fillStyle = color;
ctx.beginPath();
ctx.arc(x, y, size, 0, Math.PI * 2);
ctx.fill();
if (spike && alpha > 0.4) {
ctx.strokeStyle = color;
ctx.globalAlpha = alpha * 0.6;
ctx.lineWidth = 0.5;
ctx.beginPath();
ctx.moveTo(x - spikeSize, y); ctx.lineTo(x + spikeSize, y); ctx.stroke();
ctx.beginPath();
ctx.moveTo(x, y - spikeSize); ctx.lineTo(x, y + spikeSize); ctx.stroke();
}
ctx.restore();
}

let t = 0;
function animate() {
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
for (const s of stars) {
const a = 0.1 + 0.9 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
drawStar(s.x, s.y, s.size, s.color, a, s.spike, s.spikeSize);
}
t += 2.2;
requestAnimationFrame(animate);
}

resize();
let resizeTimer;
window.addEventListener('resize', () => {
clearTimeout(resizeTimer);
resizeTimer = setTimeout(resize, 100);
});
animate();
