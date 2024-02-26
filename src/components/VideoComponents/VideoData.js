// Purpose: This file contains the VideoData component which is used to display the video data in a table format.
// The table contains the following columns: Play, Type, result.    
// The table is populated with the data from the videosData prop.
// The table is displayed in the VideoData component which is used in the Video.js file.
// The VideoData component is used to display the video data in a table format.

function VideoData({ videosData }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Play</th>
          <th>Type</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {videosData.map((data, index) => (
          <tr key={index}>
            <td>{data.play}</td>
            <td>{data.playtype}</td>
            <td>{data.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default VideoData;
