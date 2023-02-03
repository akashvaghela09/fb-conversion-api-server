const dotenv = require('dotenv').config();
const express = require('express')
const app = express()
const PORT = 3000
const { API_VERSION, PIXEL_ID, TOKEN } = process.env;

app.get('/', (req, res) => {
    res.send(`Node App`)
})

let resourceUrl = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${TOKEN}`;

app.post('/test', async (req, res) => {
    res.json({ message: 'ok' })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Node running at ${PORT}`)
})