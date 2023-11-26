let highestZIndex = 100; // Start from 100 and go up
let openOffsetX = 100;
let openOffsetY = 50;
const offsetIncrement = 30;  // Adjust this value as needed

function cascadePosition(windowElement) {
    windowElement.style.left = openOffsetX + 'px';
    windowElement.style.top = openOffsetY + 'px';

    openOffsetX += offsetIncrement;
    openOffsetY += offsetIncrement;

    // Optional: Reset the offset if it's too large
    if (openOffsetX + windowElement.offsetWidth > window.innerWidth || 
        openOffsetY + windowElement.offsetHeight > window.innerHeight) {
        openOffsetX = 0;
        openOffsetY = 0;
    }
}


// Function to open a window when an icon is clicked
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('dblclick', function() {
        // Hide all windows first
       /* document.querySelectorAll('.window').forEach(window => {
            window.style.display = 'none';
        });*/ //undelete this above section if you want only a single window at a time
        // Show the associated window
        const windowClass = this.getAttribute('data-window');
        console.log(windowClass);
        const windowElement = document.querySelector(`#${windowClass}`);

        windowElement.style.display = windowElement.style.display === 'none' ? 'block' : 'none';


        // Increment and set the z-index to ensure it's on top
        highestZIndex++;
        windowElement.style.zIndex = highestZIndex;

        cascadePosition(windowElement);
        windowElement.style.display = 'block';
    });
});

// Function to close a window when the close button is clicked
document.querySelectorAll('.close-window').forEach(button => {
    button.addEventListener('click', function() {
        this.parentElement.parentElement.style.display = 'none';
    });
});

document.querySelectorAll('.close-icon').forEach(button => {
    button.addEventListener('click', function() {
        // Find the closest window element and hide it
        const windowElement = this.closest('.window');
        if (windowElement) {
            windowElement.style.display = 'none';
        }
    });
});

document.querySelectorAll('.send-back-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        let parentWindow = this.closest('.window');
        parentWindow.style.zIndex = '1';
    });
});

// Bring window to the foreground
document.querySelectorAll('.bring-forward-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        let parentWindow = this.closest('.window');
        parentWindow.style.zIndex = '10';
    });
});


let isDragging = false;
let offsetX, offsetY;

// Function to start dragging the window
function startDragging(e) {
    console.log('start dragging');
    isDragging = true;

    // Store the current mouse position subtracted by the window's top and left position
    offsetX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    offsetY = e.clientY - e.currentTarget.getBoundingClientRect().top;

    // Add mouse move and mouse up event listeners
    e.currentTarget.parentElement.addEventListener('mousemove', doDrag);
    e.currentTarget.parentElement.addEventListener('mouseup', stopDragging);
}

// Function to drag the window
function doDrag(e) {
    if (isDragging) {
        // Calculate the new position for the window
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        console.log(`x: ${x}, y: ${y}`);
        console.log(e);
        // Set the new position for the window
        e.currentTarget.style.left = `${x}px`;
        e.currentTarget.style.top = `${y}px`;
    }
}

// Function to stop dragging the window
function stopDragging(e) {
    isDragging = false;

    // Remove the event listeners
    document.removeEventListener('mousemove', doDrag);
    document.removeEventListener('mouseup', stopDragging);
}

// Attach the event listener to the title bar (window-bar) of each window
document.querySelectorAll('.window .window-bar').forEach(titleBar => {
    titleBar.addEventListener('mousedown', startDragging);
});

// Function to bring a window to the front
function bringToFront(windowElement) {
    highestZIndex++;
    windowElement.style.zIndex = highestZIndex;
}

// Attach this logic to all windows
document.querySelectorAll('.window').forEach(window => {
    window.addEventListener('click', function() {
        bringToFront(this);
    });
});