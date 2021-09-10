import axios from 'axios'

let baseURL = "http://localhost:5000/api/v1/restaurants"

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json"
  }
});
