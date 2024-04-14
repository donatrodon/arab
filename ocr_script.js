document.getElementById('imageInput').addEventListener('change', function(e) {
    const imageFile = e.target.files[0];
    document.getElementById('startBtn').onclick = function() {
        if (imageFile) {
            processImage(imageFile);
        } else {
            alert('Please select an image file first!');
        }
    };
});

function showLoader(show) {
    document.getElementById('loader').style.display = show ? 'block' : 'none';
}

function processImage(imageFile) {
    const worker = new Worker('ocrWorker.js');
    
    worker.onmessage = function(e) {
        const { status, progress, text, error } = e.data;
        if (status === 'progress') {
            console.log(`Progress: ${(progress * 100).toFixed(2)}%`);
        } else if (status === 'completed') {
            document.getElementById('output').value = text;
            showLoader(false);
        } else if (status === 'error') {
            console.error('Error:', error);
            showLoader(false);
        }
    };

    worker.onerror = function(error) {
        console.error('Worker error:', error.message);
        showLoader(false);
    };

    showLoader(true);
    worker.postMessage({
        imageDataUrl: URL.createObjectURL(imageFile),
        lang: 'eng'  // or 'ara' for Arabic
    });
}
