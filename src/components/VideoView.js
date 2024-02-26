// components/VideoView.js
import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoComponents/VideoPlayer';
import VideoList from './VideoComponents/VideoList';
import VideoUploader from './VideoComponents/VideoUpload';
import VideoData from './VideoComponents/VideoData';
import './VideoComponents/VideoView.css';
import { getAuth, signOut } from "firebase/auth"; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection
function VideoView() {
    const [videos, setVideos] = useState([]);
    const [selectedVideoUID, setSelectedVideoUID] = useState('bf427813552a53bcc8748dac67c362d4');
    const [videosData, setVideosData] = useState([]);

    const navigate = useNavigate(); // Hook for navigation
    const auth = getAuth(); // Initialize Firebase Auth

    // Function to sign out the user
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
                navigate("/login"); // Redirect user to login page after sign out
        }).catch((error) => {
            // An error happened.
                console.error("Sign out error:", error);
        });
    };
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
        fetchVideos();
    }, []);

    const handleVideoSelect = (videoUID) => {
        setSelectedVideoUID(videoUID);
        console.log('Selected Video UID:', videoUID);
    };

    return (
        <div className="video-view-container">
        <aside className="sidebar">
        <h1>Upload your files</h1>
        <VideoUploader />
        <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
        <button onClick={handleSignOut}>Sign Out</button> {/* Sign-out button */}
        </aside>
        <main className="main-content">
        <VideoPlayer videoUID={selectedVideoUID} />

        <VideoData videosData={videosData} />
        </main>
        </div>
    );
}

export default VideoView;
