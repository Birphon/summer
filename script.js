const STORAGE_KEY = 'stickerChartData';
const NAME_KEY = 'childName';
const GRID_SIZE = 20;

let stars = [];
let childName = 'Summers Stars';

function saveData() {
    const data = {
        stars: stars,
        name: childName
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const data = JSON.parse(saved);
        stars = data.stars || [];
        childName = 'Summers Stars';
    }
}

function createGrid() {
    const grid = document.getElementById('stickerGrid');
    grid.innerHTML = '';
    
    for (let i = 0; i < GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        grid.appendChild(cell);
    }
    
    renderStars();
}

function renderStars() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const starElements = cell.querySelectorAll('.star');
        starElements.forEach(star => star.remove());
    });
    
    stars.forEach(star => {
        const cell = document.querySelector(`[data-index="${star.position}"]`);
        if (cell) {
            const starEl = document.createElement('div');
            starEl.className = 'star';
            starEl.textContent = '⭐';
            starEl.style.transform = `rotate(${star.rotation}deg)`;
            cell.appendChild(starEl);
        }
    });
}

function addStar() {
    let nextPosition = -1;
    
    for (let i = 0; i < GRID_SIZE; i++) {
        if (!stars.find(s => s.position === i)) {
            nextPosition = i;
            break;
        }
    }
    
    if (nextPosition === -1) {
        return;
    }
    
    const randomRotation = Math.floor(Math.random() * 360);
    
    stars.push({
        position: nextPosition,
        rotation: randomRotation
    });
    
    saveData();
    renderStars();
}

function removeStar() {
    if (stars.length > 0) {
        const randomIndex = Math.floor(Math.random() * stars.length);
        stars.splice(randomIndex, 1);
        saveData();
        renderStars();
    }
}

function updateName() {
    const nameEl = document.getElementById('childName');
    if (nameEl) {
        nameEl.textContent = childName;
    }
}

function initAdmin() {
    const addBtn = document.getElementById('addBtn');
    const removeBtn = document.getElementById('removeBtn');
    
    if (addBtn) {
        addBtn.addEventListener('click', addStar);
    }
    
    if (removeBtn) {
        removeBtn.addEventListener('click', removeStar);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateName();
    createGrid();
    initAdmin();
});