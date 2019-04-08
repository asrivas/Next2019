const { google } = require('googleapis');

/**
 * An HTTP function that returns inventory data.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.inventory = (req, res) => {
    handleCors(req, res);
    getInventory().then(labels => {
        res.status(200).type('text/json').end(JSON.stringify(labels));
    })
};

/**
 * Returns a map of the first 5 columns of an inventory data sheet.
 */
async function getInventory() {
    let auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });
    let api = google.sheets({ version: 'v4', auth });
    let response = await api.spreadsheets.values.get({
        spreadsheetId: '1wb8Vq2N8sExJ495BWdbBqyU9vPA0G_eeWjDl8Ai5Csw',
        range: 'Sheet1!A2:E'
    });
    return response.data.values.map(row => {
        return {
            shoe: row[0],
            price: row[1],
            status: row[2],
            image: row[3],
            url: row[4]
        }
    });
}

/**
 * Sets up CORS to access in domains.
 */
handleCors = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    if (req.method == 'OPTIONS') {
        res.status(204).send('');
    }
}