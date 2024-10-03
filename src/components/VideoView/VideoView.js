
import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoComponents/VideoPlayer';
import './VideoComponents/VideoView.css';
import { getAuth, signOut } from "firebase/auth"; 
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import NestedDropdown from './VideoComponents/NestedDropdown/NestedDropdown';
import VideoDataTable from './VideoComponents/VideoDataTable/VideoDataTable';

 // Updated footballData with the specified categories and random values
    const footballData = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        video_uid: index % 2 === 0
        ? 'dcfdfb3cf9198f53f6db3780ce14d669'
        : '0b036033ce13de4167c04c15d21b7c65',
        hash_col: ['L', 'M', 'R'][Math.floor(Math.random() * 3)],
        off_formation: ['Aces', 'Trips', 'I-Formation'][Math.floor(Math.random() * 3)],
        off_str: ['Left', 'Right', null][Math.floor(Math.random() * 3)],
        backfield: ['GUN WEAK', 'SINGLEBACK', 'GUN STRONG'][Math.floor(Math.random() * 3)],
        off_play: ['Slant', 'Screen Pass', 'Dive', null][Math.floor(Math.random() * 4)],
        play_type: ['Pass', 'Run'][Math.floor(Math.random() * 2)],
        play_dir: ['Left', 'Right', 'Middle', null][Math.floor(Math.random() * 4)],
        result: ['Complete', 'Incomplete', 'Touchdown'][Math.floor(Math.random() * 3)],
        gn_ls: parseFloat((Math.random() * 20 - 5).toFixed(1)), // Gain/Loss between -5 and +15 yards
        eff: ['Efficient', 'Inefficient', null][Math.floor(Math.random() * 3)],
        def_front: ['4-3', '3-4'][Math.floor(Math.random() * 2)],
        def_str: ['Left', 'Right', null][Math.floor(Math.random() * 3)],
        blitz: ['Yes', 'No', null][Math.floor(Math.random() * 3)],
        coverage: ['Man', 'Zone', 'Cover 2', null][Math.floor(Math.random() * 4)],
        qtr: Math.floor(Math.random() * 4) + 1, // Quarter between 1 and 4
        dn: Math.floor(Math.random() * 4) + 1 // Down between 1 and 4
    })); 


function VideoView() {
    const selectedRowIndex = 0;

    const [jsonSeasonData] = useState([
        {
            "season_name": "Season 1",
            "opponents": [
                {
                    "opponent_name": "Opponent 1A",
                    "film_group": ["FG1A"]
                },
                {
                    "opponent_name": "Opponent 1B",
                    "film_group": ["FG1B"]
                }
            ]
        },
        {
            "season_name": "Season 2",
            "opponents": [
                {
                    "opponent_name": "Opponent 2A",
                    "film_group": ["FG2A"]
                },
                {
                    "opponent_name": "Opponent 2B",
                    "film_group": ["FG2B"]
                }
            ]
        }
    ]);

    let [searchParams] = useSearchParams();

    const videoID = searchParams.get('videoID');

    const [videos, setVideos] = useState([]);
    const [selectedVideoUID, setSelectedVideoUID] = useState("");
    const [selectedFilmGroup, setSelectedFilmGroup] = useState("FG1A");
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const [videoData, setVideosData] = useState([]);

    const navigate = useNavigate();
    const auth = getAuth();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/login");
        }).catch((error) => {
            console.error("Sign out error:", error);
        });
    };

    // Update selectedVideoUID when videoID from URL changes
    useEffect(() => {
        if (videoID) {
            setSelectedVideoUID(videoID);
            const index = videos.findIndex(video => video.video_uid === videoID);
            if (index !== -1) {
                setCurrentVideoIndex(index);
            }
        }
    }, [videoID, videos]);

    // Load videos based on selected film group
    useEffect(() => {
        // Replace with your actual video data and valid video UIDs
        const allVideos = [
            { filmGroup: 'FG1A', videos: [
                { title: 'FG1A Clip 1', video_uid: 'dcfdfb3cf9198f53f6db3780ce14d669' },
                { title: 'FG1A Clip 2', video_uid: '0b036033ce13de4167c04c15d21b7c65' }
            ] },
            { filmGroup: 'FG1B', videos: [
                { title: 'FG1B Clip 1', video_uid: 'bf427813552a53bcc8748dac67c362d4' },
                { title: 'FG1B Clip 2', video_uid: 'a1b2c3d4e5f67890abcdef1234567890' }
            ] },
            // Add other film groups as needed
        ];

        let filteredVideos = [];

        if (selectedFilmGroup) {
            const group = allVideos.find(group => group.filmGroup === selectedFilmGroup);
            if (group) {
                filteredVideos = group.videos;
            }
        }

        setVideos(filteredVideos);

        // Reset currentVideoIndex
        setCurrentVideoIndex(0);

        // Reset selectedVideoUID
        if (filteredVideos.length > 0) {
            setSelectedVideoUID(filteredVideos[0].video_uid);
        } else {
            setSelectedVideoUID(footballData[selectedRowIndex]);
        }

        setVideosData([
            { play: 'Play 1', playtype: 'Type 1', result: 'Result 1' },
            { play: 'Play 2', playtype: 'Type 2', result: 'Result 2' }
        ]);
    }, [selectedFilmGroup]);

    // Update selectedVideoUID when currentVideoIndex changes
    useEffect(() => {
        if (videos && videos.length > 0 && videos[currentVideoIndex]) {
            setSelectedVideoUID(videos[currentVideoIndex].video_uid);
        }
    }, [currentVideoIndex, videos]);

    // Handle arrow key navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                setCurrentVideoIndex((prevIndex) => Math.min(prevIndex + 1, videos.length - 1));
            } else if (event.key === 'ArrowLeft') {
                setCurrentVideoIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [videos]);

    const handleFilmGroupSelect = (selectedGroup) => {
        setSelectedFilmGroup(selectedGroup);
    };
    const handleRowClick = (videoUID) => {
        setSelectedVideoUID(videoUID);
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                setCurrentVideoIndex((prevIndex) => {
                    const newIndex = Math.min(prevIndex + 1, videos.length - 1);
                    setSelectedVideoUID(videos[newIndex].video_uid);
                    return newIndex;
                });
            } else if (event.key === 'ArrowLeft') {
                setCurrentVideoIndex((prevIndex) => {
                    const newIndex = Math.max(prevIndex - 1, 0);
                    setSelectedVideoUID(videos[newIndex].video_uid);
                    return newIndex;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [videos]);

    return (
        <div className="video-view-container">
        <aside className="sidebar">
        <NestedDropdown data={jsonSeasonData} onSelect={handleFilmGroupSelect} />
        <div>  

        <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
        <button className="back-button" onClick={() => navigate('/Dashboard')}>Back</button>
        </div>
        </aside>

        <main className="main-content">
    <div className="video-content">
        <VideoPlayer videoUID={selectedVideoUID} />
        <div>
            <h2>Football Data</h2>
            <VideoDataTable
                data={footballData}
                onRowClick={handleRowClick}
                currentVideoUID={selectedVideoUID} // Pass the current video UID
            />
        </div>
    </div>
</main>        </div>
    );
}export default VideoView;

