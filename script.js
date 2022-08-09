const DEFAULT_COLOR = 'rgb(0,0,0)';
const DEFAULT_SIZE = 16;
let color = DEFAULT_COLOR;

function genGrid (size) {
    for (let i = 0; i < size*size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }
    grid.style.cssText = `grid-template-columns: repeat(${size},1fr);`;
    const cls = document.querySelectorAll('.cell');
    cls.forEach(div => div.addEventListener('mousemove', paintCell));
}

function removeGrid () {
    grid.innerHTML='';
}

function paintCell(e) {
    if (mouseDown === true) {
        if (active === 'eraser') color = '#ffffff'
        this.style.cssText = `background-color: ${color}; border: none;`;
    }
}
//start grid init
const grid = document.querySelector('#grid');

document.getElementById('gridSize').value = DEFAULT_SIZE;
genGrid(DEFAULT_SIZE);
//checkMouse
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
document.body.ondragstart = () => (false);
//grid size slider
const slider = document.getElementById('gridSize');
let sliderOutput = document.getElementById('currentSize');
sliderOutput.innerHTML = `${slider.value} x ${slider.value}`;
slider.onmouseup = function() {
    removeGrid();
    genGrid(this.value);
};
slider.oninput = function() {
    sliderOutput.innerHTML = `${slider.value} x ${slider.value}`;
};
//color picker
const colorPicker = document.getElementById('colorPicker');
colorPicker.oninput = function() {
    color = this.value;
    console.log(color);
};
//clear
document.getElementById('clear').onclick = () => {
    removeGrid();
    genGrid(document.getElementById('gridSize').value);
};
//eraser
document.getElementById('eraser').onclick = () => {
    color = 'rgb(255,255,255)';
};
//rainbow
function getRainbowColor() {
    color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
}
document.getElementById('rainbow').onclick = () => {
    const cls = document.querySelectorAll('.cell');
    cls.forEach(div => div.addEventListener('mouseout', getRainbowColor));
};
//active
let active = document.getElementById('color').id;
const options = document.querySelectorAll('.options');
options.forEach(div => {
    div.onmousedown = function() {
        if (active === 'rainbow') {
            const cls = document.querySelectorAll('.cell');
            cls.forEach(div => div.removeEventListener('mouseout', getRainbowColor));
        }
        color = document.getElementById('colorPicker').value;
        document.getElementById(active).classList.remove('active');
        this.classList.add('active');
        active = this.id;
        console.log(active);
    }
});