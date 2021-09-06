import React, { useState } from "react";
import axios from 'axios'

const Login = props => {
  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [error, setError] = useState();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    axios.post('http://localhost:5000/user/login', user)
      .then(resp => {
        console.log("RESP",  resp)
        if(resp.status === 200){
          console.log(resp, 'User logged in!')
        }
      })
      .catch(err => {
        console.error(err.response.data)
        setError(err.response.data)
      })
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            required
            value={user.email || ""}
            onChange={handleInputChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={user.password || ""}
            onChange={handleInputChange}
            name="password"
          />
        </div>
        <p>{error && error}</p>
        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;