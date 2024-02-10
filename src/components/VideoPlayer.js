import { Stream } from "@cloudflare/stream-react";
// Usage: <VideoPlayer videoUID="<VIDEO_UID>" />
// videoUID: The unique identifier of the video to be played. If not provided, a default video will be played.
// The videoUID can be obtained from the Cloudflare Stream dashboard.   
    //
function VideoPlayer({ videoUID }) {

 // const videoSrc = `https://customer-mcs4oh9p1cp0fw64.cloudflarestream.com/${videoUID || '0b036033ce13de4167c04c15d21b7c65'}/iframe`;
 // const videoSrc="https://customer-mcs4oh9p1cp0fw64.cloudflarestream.com/dcfdfb3cf9198f53f6db3780ce14d669/iframe?poster=https%3A%2F%2Fcustomer-mcs4oh9p1cp0fw64.cloudflarestream.com%2Fdcfdfb3cf9198f53f6db3780ce14d669%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
  const videosrc = "dcfdfb3cf9198f53f6db3780ce14d669"
  return (
    <div style={{ width: "100%", height: "auto" }}>
      <Stream controls src={videoUID} />
    </div>
  );
}
export default VideoPlayer;
