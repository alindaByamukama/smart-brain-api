const Clarifai = require('clarifai')

// You must add your own API key here from Clarifai
const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY
})

const handleApiCall = (req, res) =>  {
    const { input } = req.body
    app.models
        .predict({
            id: 'face-detection',
            version: '6dc7e46bc9124c5c8824be4822abe105'
        }, input)
        .then(data => {
             // Log the response data
            console.log('Clarifai response data:', data);
            res.json(data)
        })
        .catch(err => {
              // Log the error
            console.error('Error with Clarifai API:', err);
            res.status(400).json('unable to work with api')})
}

const handleImage = (req, res, db) => {
    const { id } = req.body
    // Log the received ID
    console.log('Received ID:', id);
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => {
        // Log the error
        console.error('Error updating entries:', err); 
        res.status(400).json('Unable to get entries...')})
}

module.exports = {
    handleImage, 
    handleApiCall
}