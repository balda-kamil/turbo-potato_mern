import axios from 'axios'

let baseURL = "http://localhost:5000/api/v1/restaurants"
let baseURL2 = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurant-reviews-evuay/service/restaurants/incoming_webhook/"


export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json"
  }
});