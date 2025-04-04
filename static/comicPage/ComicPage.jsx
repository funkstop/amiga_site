import React from 'react';
import './ComicPage.css';

const ComicPage = () => {
  return (
    <div className="comic-page">
      <div className="comic-panel">
        <div className="panel-title">“50 Days of Making” Begins!</div>
        <img src="robot_intro.png" alt="Curious Robot" className="panel-image" />
        <div className="speech-bubble">
          Hi! I'm Robo, and I'm following Rahim as he creates something new for 50 days straight. Why? Let's find out!
        </div>
      </div>

      <div className="comic-panel">
        <div className="panel-title">Why 50 Days?</div>
        <img src="placeholder1.jpg" alt="Why 50 Days" className="panel-image" />
        <div className="speech-bubble">
          Sometimes the best ideas come from momentum. This challenge is all about consistency, curiosity, and creativity.
        </div>
      </div>

      <div className="comic-panel">
        <div className="panel-title">What’s Being Made?</div>
        <img src="placeholder2.jpg" alt="Creative Work" className="panel-image" />
        <div className="speech-bubble">
          Paintings, digital sketches, calligraphy, maybe even sound. Each day’s different—and that’s the point!
        </div>
      </div>

      <div className="comic-panel">
        <div className="panel-title">Want to See More?</div>
        <img src="ig_preview.png" alt="Instagram Preview" className="panel-image" />
        <div className="speech-bubble">
          Follow the full journey @rahimexploring on Instagram. It’s all happening there in real time!
        </div>
      </div>
    </div>
  );
};

export default ComicPage;
