const colorPicker = document.querySelector("#colorPicker");
const rainbow = document.querySelector("#rainbow");
const eraser = document.querySelector("#eraser");
const shade = document.querySelector("#shade");
const clear = document.querySelector("#clear");
const input = document.querySelector("#gridSize");


const container = document.querySelector(".container");

function createGrid(gridSize) {

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };

    for (i = 0; i < gridSize*gridSize; i++) {
        cell = document.createElement("div");
        cell.className = "cell"
        cell.id = `${i}`;
        container.appendChild(cell);
    };
    
    container.setAttribute("style", `grid-template-columns: repeat(${gridSize}, 1fr);`);
    
    gridSelected(colorPicker.value);
    
};


function gridSelected(selectedColor) {
    
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("mouseover", function(e) {
            cell.setAttribute("style", `background-color: ${selectedColor}`);        
        });
    });
    
}

function gridRainbow() {
    
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("mouseover", function(e) {
            cell.setAttribute("style", `background-color: hsl(${randomColor()});`);        
        });
    });
    
}

function gridShade() {

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("mouseover", function(e) {
            
            if (!cell.hasAttribute("data-passes")) {
                cell.setAttribute("style", `filter: brightness(90%)`);
                cell.setAttribute("data-passes", "1");
            }
            
            else {
                cell.setAttribute("style", `filter: brightness(${100 - parseInt(cell.dataset.passes) * 10}%`);
                cell.setAttribute("data-passes", `${Math.min(parseInt(cell.dataset.passes) + 1, 10)}`);
            }

        });
    });

}

function gridErase() {
    
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("mouseover", function(e) {
            cell.setAttribute("style", `background-color: white`);         
        });
    });
    
}

function randomColor() {
    function randomHue() {
        return Math.floor(Math.random() * 360);
    }
    
    function randomSaturation() {
        return Math.floor(Math.random() * 100) + "%";
    }
    
    function randomLightness() {
        return Math.floor(Math.random() * 100) + "%";
    }
    return `${randomHue()}, ${randomSaturation()}, ${randomLightness()}`;
};

container.onload = createGrid(16);

input.value = "16";
colorPicker.value = "#000000";

input.addEventListener("input", function(e) {
    createGrid(e.target.value);
})

colorPicker.addEventListener("input", function(e) {
    gridSelected(e.target.value);
})

rainbow.addEventListener("click", function() {
    gridRainbow();
});

shade.addEventListener("click", function() {
    gridShade();
});

eraser.addEventListener("click", function() {
    gridErase();
});

clear.addEventListener("click", function() {
    createGrid(16);
});

// function gridListen() {

//     const cells = document.querySelectorAll(".cell");
//     cells.forEach(cell => {
//         cell.addEventListener("mouseover", function(e) {
            
//             if (!cell.hasAttribute("data-passes")) {
//                 cell.setAttribute("style", `background-color: hsl(${randomColor()});`);
//                 cell.setAttribute("data-passes", "1");
//             }
            
//             else {
//                 cell.setAttribute("style", `filter: brightness(${100 - parseInt(cell.dataset.passes) * 10}%`);
//                 cell.setAttribute("data-passes", `${Math.min(parseInt(cell.dataset.passes) + 1, 10)}`);
//             }
            
//         });
//     });

// };