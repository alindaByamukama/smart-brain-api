import { Model } from "clarifai-nodejs";
import dotenv from 'dotenv';
dotenv.config();

const modelUrl = process.env.CLARIFAI_MODEL_URL;
const detectorModel = new Model({
  url: modelUrl,
  authConfig: {
    pat: process.env.CLARIFAI_PAT,
  },
});

// Talks to Clarifai. It sends the image URL to the Clarifai model and returns the prediction (face detection boxes, etc.) to your frontend.
const handleApiCall = async (req, res) => {
  try {
    const { input } = req.body; // Image URL from frontend
    const prediction = await detectorModel.predictByUrl({
      url: input,
      inputType: "image",
    });
    res.json(prediction);
  } catch (error) {
    console.error("Clarifai API error:", error);
    res.status(400).json("Unable to work with API");
  }
};

// Updates your PostgreSQL users table to increment the entries count each time a user submits an image.
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

export { 
    handleImage, 
    handleApiCall
}