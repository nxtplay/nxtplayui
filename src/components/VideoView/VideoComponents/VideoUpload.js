

import React, { useState, useEffect } from 'react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

function FileUploader() {
    const [uppy] = useState(new Uppy({
        debug: true,
        autoProceed: false,
    }));

    useEffect(() => {
        uppy.use(Tus, { endpoint: 'http://13.56.224.252:8080/api/get-upload-url', chunkSize: 150 * 1024 * 1024 });

        uppy.on("complete", (result) => {
            console.log("Upload complete! We’ve uploaded these files:", result.successful);
        });

        return () => uppy.close(); // Cleanup on unmount
    }, []);

    const handleUploadButtonClick = () => {
        if (uppy.getFiles().length === 0) {
            alert("Please select a file to upload.");
            return;
        }
        uppy.upload();
    };

    return (
        <div>
            <Dashboard 
                uppy={uppy} 
                height={480} 
                width={590} 
                proudlyDisplayPoweredBy={false}
                note="Drop files here or click browse files"
            />
            <button id="uploadButton" onClick={handleUploadButtonClick} style={{ marginTop: '10px' }}>Upload</button>
        </div>
    );
}

export default FileUploader;

