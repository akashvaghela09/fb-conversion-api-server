# FB Conversion Api Server

## How to Setup Project

### 1. Clone the repository to your local machine using the following command:

``` bash
git clone https://github.com/akashvaghela09/fb-conversion-api-server.git
```

### 2. Change directory into the cloned repository and install all necessary packages by running the following commands in the terminal:

``` bash
cd fb-conversion-api-server
npm install
```

### 3. Rename the sample.env file to .env and add your token value:
``` bash
mv sample.env .env
```
Edit the .env file and add the value of your token:
``` bash
ACCESS_TOKEN=YOUR_ACCESS_TOKEN_HERE
PIXEL_ID=YOUR_PIXEL_ID_HERE
``` 
### 4. Start the project by running the following command:
``` bash
npm start
```
### 5. Testing the Project using Postman:
1. Open Postman and create a new request.
2. Select the HTTP method `POST`.
3. Paste the endpoint URL in the address bar.
``` bash
http://localhost:6060/events
```
4. In the request body, select raw and set the type as `JSON`.
5. Paste the following test data object:
``` json
{
    "email": "test@mail.com",
    "phoneNumbers": [
        "+91-12345"
    ],
    "productId": "ai-course",
    "quantity": "20",
    "currency": "usd",
    "amount": "21.5",
    "eventName": "Lead"
}
```
6. Send the request and wait for the response.
7. If the response reads **Event sent to Facebook**, then everything is working correctly.
