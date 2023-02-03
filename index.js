// express app setup
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 6060;
app.use(express.json());

// extract env variables
const { PIXEL_ID, ACCESS_TOKEN } = process.env;

// fb conversion api
const bizSdk = require('facebook-nodejs-business-sdk');
const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const DeliveryCategory = bizSdk.DeliveryCategory;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const api = bizSdk.FacebookAdsApi.init(ACCESS_TOKEN);

let current_timestamp = Math.floor(new Date() / 1000);

app.get('/', (req, res) => {
    res.send(`PixelTests Server`)
})

app.post('/events', async (req, res) => {
    const {
        email = "",
        phoneNumbers = [],
        productId = "",
        quantity = 0,
        currency = "",
        amount = 0,
        eventName = "",
    } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    try {

        const userData = (new UserData())
            .setEmails([email])
            .setPhones([...phoneNumbers])
            // It is recommended to send Client IP and User Agent for Conversions API Events.
            // .setClientIpAddress(ip)
            .setClientUserAgent(userAgent)
        // .setFbp('fb.1.1558571054389.1098115397')
        // .setFbc('fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890');

        const content = (new Content())
            .setId(productId)
            .setQuantity(quantity)
            .setDeliveryCategory(DeliveryCategory.HOME_DELIVERY);

        const customData = (new CustomData())
            .setContents([content])
            .setCurrency(currency)
            .setValue(amount);

        const serverEvent = (new ServerEvent())
            .setEventName(eventName)
            .setEventTime(current_timestamp)
            .setUserData(userData)
            .setCustomData(customData)
            .setEventSourceUrl('https://www.pixeltests.com')
            .setActionSource('website')


        const eventsData = [serverEvent];
        const eventRequest = (new EventRequest(ACCESS_TOKEN, PIXEL_ID))
            .setEvents(eventsData)
            .setTestEventCode("TEST49770") // test event code [only required for testing]

        eventRequest.execute().then(
            response => {
                console.log('Response: ', response);
            },
            err => {
                console.error('Failed to execute eventRequest: ', err);
            }
        );

        res.send('Event sent to Facebook');
    } catch (error) {
        console.log("Failed while sending event to Facebook: ", error);
    }
})

app.get('/test', async (req, res) => {
    res.send({ message: 'Ok' });
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running at ${PORT}`)
})