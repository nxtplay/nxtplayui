// Purpose: Component to display list of videos.
function VideoList({ videos, onVideoSelect }) {
  return (
    <div id="videoListWrapper">
      <h2>Video Clips</h2>
      <ul>
        {videos.length > 0 ? (
          videos.map((video) => (
            <li key={video.video_uid}>
              <a href="#" onClick={() => onVideoSelect(video.video_uid)}>
                {video.title}
              </a>
            </li>
          ))
        ) : (
          <li>No videos found.</li>
        )}
      </ul>
    </div>
  );
}
export default VideoList;
