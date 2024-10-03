
import React from 'react';
import './VideoDataTable.css';

function VideoDataTable({ data = [], onRowClick }) {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="table-container">
            <table className="video-data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hash Column</th>
                        <th>Offensive Formation</th>
                        <th>Offensive Strength</th>
                        <th>Backfield</th>
                        <th>Offensive Play</th>
                        <th>Play Type</th>
                        <th>Play Direction</th>
                        <th>Result</th>
                        <th>Gain/Loss</th>
                        <th>Efficiency</th>
                        <th>Defensive Front</th>
                        <th>Defensive Strength</th>
                        <th>Blitz</th>
                        <th>Coverage</th>
                        <th>Quarter</th>
                        <th>Down</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((play) => (
                        <tr key={play.id} onClick={() => onRowClick(play.video_uid)} style={{ cursor: 'pointer' }}>
                            <td>{play.id}</td>
                            <td>{play.hash_col || 'N/A'}</td>
                            <td>{play.off_formation || 'N/A'}</td>
                            <td>{play.off_str || 'N/A'}</td>
                            <td>{play.backfield || 'N/A'}</td>
                            <td>{play.off_play || 'N/A'}</td>
                            <td>{play.play_type || 'N/A'}</td>
                            <td>{play.play_dir || 'N/A'}</td>
                            <td>{play.result || 'N/A'}</td>
                            <td>{play.gn_ls !== null ? play.gn_ls : 'N/A'}</td>
                            <td>{play.eff || 'N/A'}</td>
                            <td>{play.def_front || 'N/A'}</td>
                            <td>{play.def_str || 'N/A'}</td>
                            <td>{play.blitz || 'N/A'}</td>
                            <td>{play.coverage || 'N/A'}</td>
                            <td>{play.qtr || 'N/A'}</td>
                            <td>{play.dn || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VideoDataTable;

