
import React, { useState, useEffect } from 'react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { DragDrop } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';

function FileUploader() {
    const [uppy] = useState(new Uppy({
        debug: true,
        autoProceed: false,
    }));

    useEffect(() => {
        uppy.use(Tus, { endpoint: 'http://13.56.224.252:8080/api/get-upload-url', chunkSize: 150 * 1024 * 1024 });

        uppy.on("complete", (result) => {
            console.log("Upload complete! We’ve uploaded these files:", result.successful);
            // Here you can add any post-upload actions
        });

        return () => uppy.close(); // Cleanup on unmount
    }, []); // Empty dependency array ensures this effect runs once on mount

    const handleFileInputChange = (event) => {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            uppy.addFile({
                name: file.name,
                type: file.type,
                data: file,
            });
        });
    };

    const handleUploadButtonClick = () => {
        if (uppy.getFiles().length === 0) {
            alert("Please select a file to upload.");
            return;
        }
        uppy.upload();
    };

    return (
        <div>
            <DragDrop uppy={uppy} />
            <input type="file" id="fileInput" onChange={handleFileInputChange} multiple />
            <button id="uploadButton" onClick={handleUploadButtonClick}>Upload</button>
        </div>
    );
}

export default FileUploader;

