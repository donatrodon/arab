importScripts('https://cdn.jsdelivr.net/npm/tesseract.js@2');

self.onmessage = function(e) {
    const { imageDataUrl, lang } = e.data;
    Tesseract.recognize(
        imageDataUrl,
        lang,
        {
            logger: m => postMessage({status: 'progress', progress: m.progress})
        }
    ).then(result => {
        postMessage({status: 'completed', text: result.data.text});
    }).catch(error => {
        postMessage({status: 'error', error: error.message});
    });
};
