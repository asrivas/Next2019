/**
 * Runs Cloud Vision label detection
 * triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload and metadata.
 * @param {!Function} callback Callback function to signal completion.
 */
exports.analyzeImage = (event, callback) => {
    const vision = require('@google-cloud/vision');
    console.log('Processing file: ${event.name}');

    const file = event.name;
    const visionApiClient = new vision.ImageAnnotatorClient();
    visionApiClient
        .labelDetection('gs://${file.bucket}/${file.name}')
        .then(results => {
            results[0].labelAnnotations.forEach(console.log);
        })
        .catch(err => { console.error('ERROR:', err); });
};
