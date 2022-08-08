function genGrid (size) {
    const grid = document.querySelector('#grid');
    removeGrid();
    for (let i = 0; i < size*size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }

    grid.style.cssText = `grid-template-columns: repeat(${size},1fr);`;
}

function removeGrid () {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(div => {
        div.remove();
    });
}

function paint(e) {
    if (mouseDown === true)
    this.style.cssText = 'background-color: black;';
}

genGrid(64);

let mouseDown = false;
const cls = document.querySelectorAll('.cell');
cls.forEach(div => div.addEventListener('mousedown', () => {
    mouseDown = true;
}));
cls.forEach(div => div.addEventListener('mousemove', paint));
cls.forEach(div => div.addEventListener('mouseup', () => {
    mouseDown = false;
}));