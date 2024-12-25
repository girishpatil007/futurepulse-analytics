import React, { useState } from 'react';

declare global {
    interface Window {
        updateCharts: (data: any) => void;
    }
}

const UploadForm = () => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let fileName = e.target.files?.[0]?.name || 'No file selected';
        const uploadButton = document.querySelector('.upload-button');
        if (uploadButton) {
            uploadButton.innerHTML = `
                <span class="upload-icon"></span>
                ${fileName}
                <div class="button-illustration"></div>
            `;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const loadingContainer = document.getElementById('loadingContainer');
        if (loadingContainer) loadingContainer.style.display = 'block';

        try {
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]') as HTMLInputElement;
            const response = await fetch('/predict/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': csrfToken?.value || ''
                }
            });
            const data = await response.json();
            if (loadingContainer) loadingContainer.style.display = 'none';
            window.updateCharts?.(data);
        } catch (error) {
            console.error('Error:', error);
            if (loadingContainer) loadingContainer.style.display = 'none';
        }
    };

    return (
        <form id="prediction-form" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
            <input type="hidden" name="csrfmiddlewaretoken" />
            <div className="upload-section">
                <input 
                    type="file" 
                    id="file-input" 
                    className="file-input" 
                    name="data_file" 
                    accept=".csv,.xlsx"
                    onChange={handleFileChange}
                />
                <div className="button-wrapper">
                    <button 
                        type="button" 
                        className="upload-button" 
                        onClick={() => document.getElementById('file-input')?.click()}
                    >
                        <span className="upload-icon"></span>
                        Upload Data in csv/excel
                        <div className="button-illustration"></div>
                    </button>
                    <button type="submit" className="predict-button">
                        <span className="predict-icon"></span>
                        Predict Future Inventory
                        <div className="button-illustration"></div>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UploadForm;