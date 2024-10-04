
import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoComponents/VideoPlayer';
import './VideoComponents/VideoView.css';
import { getAuth, signOut } from "firebase/auth"; 
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import NestedDropdown from './VideoComponents/NestedDropdown/NestedDropdown';
import VideoDataTable from './VideoComponents/VideoDataTable/VideoDataTable';

 // Updated footballData with the specified categories and random values
const footballData = Array.from({ length: 100 }, (_, index) => {
    const videoUids = [
        'a38d3482133d55d849837d7234c1ff61',
        'ad64b23d7d04c792ad12a15234645de7',
        '7704b2dc29e77f3cdb86fd933eb23b96',
        '8f01311e45c8d31a1d06672e700c2761',
        'dcfdfb3cf9198f53f6db3780ce14d669',
        '1fe60bde3b7ca7a5cd2fa383f648c2f0',
        '0b036033ce13de4167c04c15d21b7c65'
    ];

    return {
        id: index + 1,
        video_uid: videoUids[Math.floor(Math.random() * videoUids.length)],
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
    };
});
function VideoView() {
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);
    const [selectedVideoUID, setSelectedVideoUID] = useState("");

    const navigate = useNavigate();
    const auth = getAuth();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/login");
        }).catch((error) => {
            console.error("Sign out error:", error);
        });
    };
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
     

    // Update selectedVideoUID when selectedRowIndex changes
    useEffect(() => {
        if (footballData[selectedRowIndex]) {
            setSelectedVideoUID(footballData[selectedRowIndex].video_uid);
        }
    }, [selectedRowIndex]);

    // Handle arrow key navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            const tag = document.activeElement.tagName.toLowerCase();
            if (tag === 'input' || tag === 'textarea') {
                // Do not handle arrow keys when an input or textarea is focused
                return;
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault(); // Prevent default scrolling behavior
                setSelectedRowIndex((prevIndex) => Math.min(prevIndex + 1, footballData.length - 1));
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelectedRowIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Handle row click to update selectedRowIndex
    const handleRowClick = (index) => {
        setSelectedRowIndex(index);
    };

    return (
        <div className="video-view-container">
            <aside className="sidebar">
                <NestedDropdown data={jsonSeasonData}/>
                <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
                <button className="back-button" onClick={() => navigate('/Dashboard')}>Back</button>
            </aside>

            <main className="main-content">
                <div className="video-content">
                    <VideoPlayer videoUID={selectedVideoUID} />
                    <div>
                        <h2>Football Data</h2>
                        <VideoDataTable
                            data={footballData}
                            onRowClick={handleRowClick}
                            selectedRowIndex={selectedRowIndex} // Pass selectedRowIndex to the table
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default VideoView;
