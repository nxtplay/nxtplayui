import { Stream } from "@cloudflare/stream-react";
// Usage: <VideoPlayer videoUID="<VIDEO_UID>" />
// videoUID: The unique identifier of the video to be played. If not provided, a default video will be played.
// The videoUID can be obtained from the Cloudflare Stream dashboard.   
    //
function VideoPlayer({ videoUID }) {

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <Stream controls src={videoUID} />
    </div>
  );
}
export default VideoPlayer;
