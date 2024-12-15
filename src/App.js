import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState([]);
  const [newCaption, setNewCaption] = useState({ text: '', start: '', end: '' });
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const handleAddCaption = () => {
    if (!newCaption.text || !newCaption.start || !newCaption.end) {
      alert('Please provide valid caption text and timestamps!');
      return;
    }
    setCaptions([...captions, { ...newCaption }]);
    setNewCaption({ text: '', start: '', end: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCaption({ ...newCaption, [name]: value });
  };

  const currentCaption = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      return captions.find(
        (caption) =>
          currentTime >= parseFloat(caption.start) &&
          currentTime <= parseFloat(caption.end)
      );
    }
    return null;
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>Video Captioning App</h1>

      {/* Video Input Section */}
      <div className="video-input">
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>

      {/* Video Player Section */}
      <div className="video-player">
        {videoUrl && (
          <div className="player-wrapper">
            <ReactPlayer
              url={videoUrl}
              playing={isPlaying}
              controls={false}
              ref={playerRef}
              width="100%"
              height="100%"
            />
            <div className="caption-overlay">
              {currentCaption() && <p>{currentCaption().text}</p>}
            </div>
            <button className="play-pause-btn" onClick={togglePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        )}
      </div>

      {/* Caption Input Section */}
      <div className="caption-input">
        <input
          type="text"
          name="text"
          placeholder="Enter caption text"
          value={newCaption.text}
          onChange={handleChange}
        />
        <input
          type="number"
          name="start"
          placeholder="Start time (seconds)"
          value={newCaption.start}
          onChange={handleChange}
        />
        <input
          type="number"
          name="end"
          placeholder="End time (seconds)"
          value={newCaption.end}
          onChange={handleChange}
        />
        <button onClick={handleAddCaption}>Add Caption</button>
      </div>

      {/* Caption List Section */}
      <div className="caption-list">
        <h3>Captions:</h3>
        <ul>
          {captions.map((caption, index) => (
            <li key={index}>
              <strong>[{caption.start}s - {caption.end}s]:</strong> {caption.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;