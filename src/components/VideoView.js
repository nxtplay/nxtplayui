// components/VideoView.js
import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoComponents/VideoPlayer';
import VideoList from './VideoComponents/VideoList';
import VideoUploader from './VideoComponents/VideoUpload';
import VideoData from './VideoComponents/VideoData';
import './VideoComponents/VideoView.css';
import { getAuth, signOut } from "firebase/auth"; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection
import { useSearchParams } from 'react-router-dom';
import NestedDropdown from './NestedDropdown';
import VideoDataTable from './VideoDataTable';

function VideoView() {

    const noSelectedVideo = 'bf427813552a53bcc8748dac67c362d4'
    const [jsonSeasonData, setJsonSeasonData] = useState(
    [
        {
          "season_name": "Season 1",
          "opponents": [
            {
              "opponent_name": "Opponent 1A",
              "film_group": ["FG1A 1", "FG1A 2"]
            },
            {
              "opponent_name": "Opponent 1B",
              "film_group": ["FG1B 1", "FG1B 2"]
            }
          ]
        },
        {
          "season_name": "Season 2",
          "opponents": [
            {
              "opponent_name": "Opponent 2A",
              "film_group": ["FG2A 1", "FG2A 2"]
            },
            {
              "opponent_name": "Opponent 2B",
              "film_group": ["FG2B 1", "FG2B 2"]
            }
          ]
        }
      ]
    );

    const footballData = [
        {"id": 1, "Team": "Team A", "value2": "5", "value3": "2", "value4": "3", "value5": "Win", "value6": "OtherA"},
        {"id": 2, "Team": "Team B", "value2": "4", "value3": null, "value4": "1", "value5": "Loss", "value6": "OtherB"},
        {"id": 3, "Team": "Team C", "value2": "6", "value3": "2", "value4": "4", "value5": "Win", "value6": null},
      ];
    


    let [searchParams, setSearchParams] = useSearchParams();
    // console.log("param: " + searchParams.get('videoID'))
    const videoID = searchParams.get('videoID');

    // console.log(videoID)
    
    const [videos, setVideos] = useState([]);
    const [selectedVideoUID, setSelectedVideoUID] = useState("");

    console.log("START " + selectedVideoUID)
    

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
        setSelectedVideoUID(videoID || noSelectedVideo);
      }, [videoID]);

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
        // setSelectedVideoUID(videoUID);
        navigate(`/videos?videoID=${videoUID}`)
        console.log('Selected Video UID:', videoUID);
    };

    return (
        <div className="video-view-container">
            
            {selectedVideoUID === noSelectedVideo && 
                <aside className="sidebar">
                    <h1>Upload your files</h1>
                    <VideoUploader />
                    <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
                    <button onClick={handleSignOut}>Sign Out</button> {/* Sign-out button */}
                </aside>
            }

            <main className="main-content">
                
                {selectedVideoUID !== noSelectedVideo &&
                    <div>
                        <VideoPlayer videoUID={selectedVideoUID} />
                        <VideoData videosData={videosData} />
                        <br/>
                        <button onClick={()=>{navigate('/videos');}}>Back</button>
                        <p>
                            Video ID: {selectedVideoUID}
                        </p>
                    </div>
                    
                }
                <div>
                    <NestedDropdown data={jsonSeasonData} />
                </div>

                <div>
                    <h1>Football Data</h1>
                    <VideoDataTable data={footballData} />
                </div>

                

            </main>
        </div>
    );
}

export default VideoView;
