
import VideoUploader from '../VideoView/VideoComponents/VideoUpload';
import './DashBoardView.css';
import { getAuth, signOut } from "firebase/auth"; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection

function DashBoardView() {
    const navigate = useNavigate(); // Hook for navigation
    const auth = getAuth(); // Initialize Firebase Auth

    const handleWatchVideos = () => {
        navigate('/videos');
    };

    // Function to sign out the user
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login"); // Redirect user to login page after sign out
        }).catch((error) => {
            console.error("Sign out error:", error);
        });
    };

    return (
        <div className="dashboard-view-container">
            <header className="dashboard-header">
                <button className="watch-videos-button" onClick={handleWatchVideos}>
                    Watch Videos
                </button>
                <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
            </header>
            <aside className="sidebar">
                <h1 className="sidebar-title">Upload Your Files</h1>
                <VideoUploader />
            </aside>
        </div>
    );
}

export default DashBoardView;

