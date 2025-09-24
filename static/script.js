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
        'Go Check out this Chrome Extension from <a href="http://www.jugya.com" target="_blank">Jugya</a>: <ul><li><a href="https://chromewebstore.google.com/detail/workspace-manager/cpfchfkodgnkhfmndmmkecbihmdahpia?pli=1">Workspace Manager (Tab Manager)</a></li></ul>',
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
            shellContent.innerHTML += '<div>You could also say hello or seek some wisdom</div>';
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

function makeDraggable(windowElement) {
    const windowBar = windowElement.querySelector('.window-bar');
    let isDragging = false;
    let activeWindow = null;
    let offsetX = 0;
    let offsetY = 0;

    function startDrag(e) {
        console.log('Drag started on:', windowElement);

        isDragging = true;
        activeWindow = windowElement;
        offsetX = e.clientX - activeWindow.offsetLeft;
        offsetY = e.clientY - activeWindow.offsetTop;

        windowBar.style.cursor = 'grabbing';

        // Attach global listeners
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', fireMouseUpOnAll);
    }

    function drag(e) {
        if (!isDragging || activeWindow !== windowElement) return;

        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;

        activeWindow.style.left = `${newLeft}px`;
        activeWindow.style.top = `${newTop}px`;
    }

    function stopDrag() {
        if (!isDragging) return;

        console.log('Drag stopped on:', activeWindow);

        isDragging = false;
        activeWindow = null;

        windowBar.style.cursor = 'pointer';

        // Remove global listeners
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', fireMouseUpOnAll);
    }

    function fireMouseUpOnAll() {
        console.log('Firing mouseup on all windows');

        // Fire mouseup on all draggable windows to stop any lingering drag states
        document.querySelectorAll('.window').forEach((windowEl) => {
            const event = new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
            });
            windowEl.dispatchEvent(event); // Dispatch a mouseup event
        });

        // Stop dragging the current window
        stopDrag();
    }

    windowBar.addEventListener('mousedown', startDrag);

    // Prevent text selection during dragging
    windowBar.addEventListener('dragstart', (e) => e.preventDefault());
}

// Apply draggable functionality to all windows
document.querySelectorAll('.window').forEach((windowElement) => {
    makeDraggable(windowElement);
});

/* ========================= Maker Faire Modal + Inline Player ========================= */
// -- Show/hide --
(function () {
  function $id(id) { return document.getElementById(id); }
  function showMF() {
    const m = $id('mf-modal');
    if (m) {
        m.style.display = 'flex';
        // tell the player to (re)load if needed
        document.dispatchEvent(new CustomEvent('mf-reopen'));
    }
    }

    function hideMF() {
    const m = $id('mf-modal');
    if (m) {
        // stop all media inside the modal
        m.querySelectorAll('video, audio').forEach(el => {
        try {
            el.pause();
            el.currentTime = 0;
            // fully unload to stop audio/network
            el.removeAttribute('src');
            el.load();
        } catch {}
        });
        m.style.display = 'none';
    }
    }


  document.addEventListener('DOMContentLoaded', () => {
    const modal = $id('mf-modal');
    if (!modal) return;

    // Always show on page load
    showMF();

    // Close only via explicit actions
    const x = $id('mf-close-icon');
    if (x) x.addEventListener('click', () => { window._mfExplicitClose = true; hideMF(); });

    const ok = $id('mf-close-btn');
    if (ok) ok.addEventListener('click', () => { window._mfExplicitClose = true; hideMF(); });

    // Intentionally NOT closing on backdrop click
  });

  // -- Lock in place: block site-wide drags and style mutations that move/hide it --
  (function lockModal() {
    const MODAL_SEL = '#mf-modal';
    const WIN_SEL   = '#mf-window';

    function withinModal(target) {
      return target && target.closest && target.closest(MODAL_SEL);
    }

    // Block drag starters inside modal (capture phase beats global handlers)
    ['pointerdown','mousedown','touchstart'].forEach(evt => {
      document.addEventListener(evt, (e) => {
        if (withinModal(e.target)) {
          e.stopImmediatePropagation();
          const isControl = e.target.closest('#mf-close-btn, #mf-close-icon, a, button, video, input, select, textarea');
          if (!isControl) e.preventDefault();
        }
      }, true);
    });

    // Revert any style changes trying to reposition/hide the inner window
    document.addEventListener('DOMContentLoaded', () => {
      const mw = document.querySelector(WIN_SEL);
      if (mw) {
        const enforce = () => {
          mw.style.position = 'relative';
          mw.style.left = 'auto';
          mw.style.top  = 'auto';
          const modal = document.querySelector(MODAL_SEL);
          if (modal && getComputedStyle(modal).display !== 'none') {
            mw.style.display = 'block';
          }
        };
        enforce();
        new MutationObserver(enforce).observe(mw, { attributes: true, attributeFilter: ['style', 'class'] });
      }

      // If something hides the modal programmatically, reopen unless user explicitly closed
      const modal = document.querySelector(MODAL_SEL);
      if (modal) {
        new MutationObserver(() => {
          const hidden = getComputedStyle(modal).display === 'none';
          if (hidden && !window._mfExplicitClose) modal.style.display = 'flex';
        }).observe(modal, { attributes: true, attributeFilter: ['style', 'class'] });
      }
    });

    // Reload first story if modal is reopened and video has no src
    document.addEventListener('mf-reopen', () => {
        if (video && !video.src) load(0);
        });

  })();

  // Expose for console testing if you like
  window._mfShow = showMF;
  window._mfHide = hideMF;
})();

/* ======================= Inline "Stories" Video Player (+ diag) ====================== */
(function () {
  // TODO: add your real MP4 paths (relative to index.html)
  // Example: const MF_STORIES = ['media/makerfaire/story1.mp4', 'media/makerfaire/story2.mp4'];
  const MF_STORIES = [
    // 'media/makerfaire/story1.mp4',
    // 'media/makerfaire/story2.mp4',
    'makerFaire2023.mp4'
  ];

  function $id(id) { return document.getElementById(id); }

  document.addEventListener('DOMContentLoaded', () => {
    const video   = $id('mf-ig-video');
   // const prevBtn = $id('mf-ig-prev');
   // const nextBtn = $id('mf-ig-next');
   // const counter = $id('mf-ig-counter');
    if (!video ) return; //|| !prevBtn || !nextBtn || !counter) return;

    // small inline status
    let statusEl = document.createElement('div');
    statusEl.id = 'mf-ig-status';
    statusEl.style.marginTop = '6px';
    statusEl.style.fontSize = '12px';
    statusEl.style.color = '#ff8080';
    video.insertAdjacentElement('afterend', statusEl);
    const status = (msg) => { console.warn('[MF Player]', msg); statusEl.textContent = msg || ''; };

    let idx = 0;

    async function exists(url) {
      try {
        const res = await fetch(url, { method: 'GET', headers: { 'Range': 'bytes=0-0' } });
        return res.ok || res.status === 206;
      } catch { return false; }
    }

    async function load(i) {
      if (!MF_STORIES.length) {
        status('No videos configured. Edit MF_STORIES in script.js to add your MP4 paths.');
        video.removeAttribute('src'); video.load();
        counter.textContent = '0 / 0';
       // prevBtn.disabled = true; nextBtn.disabled = true;
        return;
      }
      idx = (i + MF_STORIES.length) % MF_STORIES.length;
      const url = MF_STORIES[idx];
      status('Loading: ' + url);

      const ok = await exists(url);
      if (!ok) {
        status('Not found or blocked: ' + url + ' — check path/case (Network tab).');
        counter.textContent = (idx+1) + ' / ' + MF_STORIES.length + ' (error)';
        return;
      }

      status('');
      video.src = url;
      video.load();
      video.play().catch(() => status('Autoplay blocked. Press play ►'));

      counter.textContent = (idx+1) + ' / ' + MF_STORIES.length;
     // prevBtn.disabled = MF_STORIES.length <= 1;
     // nextBtn.disabled = MF_STORIES.length <= 1;
    }

  //  prevBtn.addEventListener('click', () => load(idx - 1));
  //  nextBtn.addEventListener('click', () => load(idx + 1));
    video.addEventListener('ended', () => load(idx + 1));
    video.addEventListener('error', () => status('Video error for ' + (video.currentSrc || video.src || '(no src)')));
    video.addEventListener('stalled', () => status('Network stalled loading video.'));
    video.addEventListener('abort',   () => status('Video load aborted.'));

    // Defer so the modal can render first, even on cold cache
    const start = () => { try { load(0); } catch (e) { console.warn('[MF Player init]', e); } };
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1000 });
    else requestAnimationFrame(start);

  });
})();

