/**
 * Runs Cloud Vision label detection
 * triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload and metadata.
 * @param {!Function} callback Callback function to signal completion.
 */
exports.analyzeImage = (event, callback) => {
    const vision = require('@google-cloud/vision');
    const file = event.data.name;
    console.log(`Processing file: ${event.data.name}`);
    const visionApiClient = new vision.ImageAnnotatorClient();
    visionApiClient
        .labelDetection(file)
        .then(results => {
            results[0].labelAnnotations.forEach(console.log);
        })
        .catch(err => { console.error('ERROR:', err); });
    callback();
};
