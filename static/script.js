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
/*function startDragging(e) {
    console.log('start dragging');
    isDragging = true;

    e.currentTarget.parentElement.addEventListener('touchmove', doDrag);
    e.currentTarget.parentElement.addEventListener('touchend', stopDragging);
    

    // Store the current mouse position subtracted by the window's top and left position
    offsetX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    offsetY = e.clientY - e.currentTarget.getBoundingClientRect().top;

    // Add mouse move and mouse up event listeners
    e.currentTarget.parentElement.addEventListener('mousemove', doDrag);
    e.currentTarget.parentElement.addEventListener('mouseup', stopDragging);
}*/
function startDragging(e) {
    console.log('start dragging');
    isDragging = true;

    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.type === 'touchstart') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    offsetX = clientX - e.currentTarget.getBoundingClientRect().left;
    offsetY = clientY - e.currentTarget.getBoundingClientRect().top;

    e.currentTarget.parentElement.addEventListener('mousemove', doDrag);
    e.currentTarget.parentElement.addEventListener('mouseup', stopDragging);
    e.currentTarget.parentElement.addEventListener('touchmove', doDrag);
    e.currentTarget.parentElement.addEventListener('touchend', stopDragging);
}


// Function to drag the window
/*function doDrag(e) {
    
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
}*/
function doDrag(e) {
    if (isDragging) {
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        // Calculate the new position for the window
        const x = clientX - offsetX;
        const y = clientY - offsetY;

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
    document.removeEventListener('touchmove', doDrag);
    document.removeEventListener('touchend', stopDragging);

}

// Attach the event listener to the title bar (window-bar) of each window
document.querySelectorAll('.window .window-bar').forEach(titleBar => {
    titleBar.addEventListener('mousedown', startDragging);
    titleBar.addEventListener('touchstart', startDragging);
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

document.addEventListener('DOMContentLoaded', function() {
    const shellContent = document.querySelector('.shell-content');
    const shellInput = document.getElementById('shell-input');

    // Initialize the initial window (specific window with ID 'contact')
    const initialWindow = document.getElementById('contact');
    if (initialWindow) {
        initialWindow.style.display = 'block';
        bringToFront(initialWindow);
    }

    
    const tasks = [
        'Welcome to Bob\'s Amiga Shell</div>',
        '--',
        'Click the different icons like About Me to navigate around</div>',
        '--',
        'Go Check out my Chrome Extension: <ul><li><a href="https://chromewebstore.google.com/detail/workspace-manager/cpfchfkodgnkhfmndmmkecbihmdahpia?pli=1">Workspace Manager (Tab Manager)</a></li></ul>',
        '--',
        'My most recent post: <a href="https://thefunkstop.substack.com/p/on-ramadan-and-why-i-refuse-to-fast" target="_blank">On Ramadan and Why I refuse to fast</a>',
        'Older posts that might have current relevance: <a href="https://thefunkstop.substack.com/p/on-juneteenth" target="_blank">On Junteenth</a>',
        '--',
        'Contact me: rahim at internetplus dot com',
        'LinkedIn: <a href="http://www.linkedin.com/in/rahimadatia" target="_blank">my \'professional\' self</a>',                    
    ];

    const commands = {
        'list': () => {
            shellContent.innerHTML = '';
            //shellContent.innerHTML += '<div>Listing tasks:</div>';
            tasks.forEach(task => {
                shellContent.innerHTML += `<div>${task}</div>`;
            });
            shellContent.innerHTML += '<br>';
            scrollToBottom();
        },
        'help': () => {
            shellContent.innerHTML = '';
            shellContent.innerHTML += '<div>Available commands:</div>';
            shellContent.innerHTML += '<div>list - List all tasks</div>';
            shellContent.innerHTML += '<div>help - Show available commands</div>';
            shellContent.innerHTML += '<br>';
            scrollToBottom();
        },
        'hello': () => {
            shellContent.innerHTML = '';
            shellContent.innerHTML += '<div>Hello to you as well!</div>';
            scrollToBottom();
        },
        'wisdom': () => {
            shellContent.innerHTML = '';
            shellContent.innerHTML += '<div>The early bird catches the worm,</div>';
            shellContent.innerHTML += '<div>But good things happen to those who wait!</div>';
            scrollToBottom();
        }
    };

    shellInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = shellInput.value.trim().toLowerCase();
            shellContent.innerHTML += `<div>&gt; ${command}</div>`;
            if (commands[command]) {
                commands[command]();
            } else {
                shellContent.innerHTML ='';
                shellContent.innerHTML += `<div>I'm still very limited in what I can do.</div><br>`;
                shellContent.innerHTML += `<div>I don't understand: ${command}</div><br>`;
                shellContent.innerHTML += `<div>I will be able to do more soon</div>`;
            }
            shellInput.value = '';
            scrollToBottom();
        }
    });

    function scrollToBottom() {
        shellContent.scrollTop = shellContent.scrollHeight;
    }
});
