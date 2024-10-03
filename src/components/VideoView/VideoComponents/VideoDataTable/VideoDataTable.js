
import React, { useState } from 'react';
import './VideoDataTable.css';

function VideoDataTable({ data, onRowClick }) {
    const [footballData, setFootballData] = useState(data);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [editableCell, setEditableCell] = useState({ rowId: null, key: null });

    const handleRowClick = (videoUID, rowId) => {
        setSelectedRowId(rowId); // Set the selected row
        onRowClick(videoUID); // Trigger the callback to select the video
    };

    // Handle changes to editable fields
    const handleInputChange = (e, id, key) => {
        const newValue = e.target.value;

        // Update the corresponding field in the footballData array
        setFootballData(prevData =>
            prevData.map((play) =>
                play.id === id ? { ...play, [key]: newValue } : play
            )
        );
    };

    // Handle double click to enable editing
    const handleDoubleClick = (rowId, key) => {
        setEditableCell({ rowId, key });
    };

    // Handle blur event to save changes and switch back to non-editable mode
    const handleBlur = () => {
        setEditableCell({ rowId: null, key: null });
    };

    return (
        <div className="table-container">
            <table className="video-data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Video UID</th>
                        <th>Hash Col</th>
                        <th>Off Formation</th>
                        <th>Off Strength</th>
                        <th>Backfield</th>
                        <th>Off Play</th>
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
                    {footballData.map((play) => (
                        <tr
                            key={play.id}
                            onClick={() => handleRowClick(play.video_uid, play.id)}
                            className={play.id === selectedRowId ? 'selected-row' : ''}
                        >
                            <td>{play.id}</td>
                            {Object.keys(play).map((key) => {
                                if (key === 'id') {
                                    return <td key={key}>{play[key]}</td>;
                                }
                                return (
                                    <td
                                        key={key}
                                        onDoubleClick={() => handleDoubleClick(play.id, key)}
                                    >
                                        {editableCell.rowId === play.id && editableCell.key === key ? (
                                            <input
                                                type="text"
                                                value={play[key]}
                                                onChange={(e) => handleInputChange(e, play.id, key)}
                                                onBlur={handleBlur}
                                                autoFocus
                                            />
                                        ) : (
                                            play[key] !== null ? play[key] : 'N/A'
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VideoDataTable;

