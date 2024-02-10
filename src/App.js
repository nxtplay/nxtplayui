
import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';
import FileUploader from './components/VideoUpload';
//import UploadArea from './components/UploadArea';
import VideoData from './components/VideoData';// Assuming you have some API service setup to fetch videos or video data
// import apiService from './apiService';
import './App.css';
function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideoUID, setSelectedVideoUID] = useState('1fe60bde3b7ca7a5cd2fa383f648c2f0');
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    // Fetch videos list and videos data from your API
    // This is a placeholder. Replace it with your actual API call
    // e.g., apiService.getVideos().then(data => setVideos(data));
    // For demonstration, using static data
    setVideos([
      { title: 'First Video', video_uid: 'dcfdfb3cf9198f53f6db3780ce14d669' },
      { title: 'Second Video', video_uid: '0b036033ce13de4167c04c15d21b7c65' },
    ]);
    setVideosData([
      { play: 'Play 1', playtype: 'Type 1', result: 'Result 1' },
      { play: 'Play 2', playtype: 'Type 2', result: 'Result 2' },
    ]);
  }, []);

useEffect(() => {
  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/videos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

/*  const fetchVideosData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/videos/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVideosData(data);
    } catch (error) {
      console.error("Failed to fetch video data:", error);
    }
  };*/

  fetchVideos();
//  fetchVideosData();
}, []);

  const handleVideoSelect = (videoUID) => {
    setSelectedVideoUID(videoUID);
    console.log('Selected Video UID:', videoUID);
  };

    return (
        <div className="App">
        <header className="App-header">
        {/* Your header content, if any */}
        </header>
        <div className="App-main">
        <VideoPlayer videoUID={selectedVideoUID} />
        <div className="video-list-wrapper">
        <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
        </div>
        <div>

        <h1>Upload your files</h1>
        <FileUploader />
        </div>
        </div>
        <div className="video-data-section">
        <VideoData videosData={videosData} />
      </div>
    </div>
  );
}
export default App;

