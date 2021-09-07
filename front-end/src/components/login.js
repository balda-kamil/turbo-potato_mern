import React, { useState } from "react";
import { loginUser, useAuthDispatch } from '../Context' 
import { useHistory } from "react-router-dom";

const Login = props => {

  const dispatch = useAuthDispatch() //get the dispatch method from the useDispatch custom hook

  const [user, setUser] = useState("");
  const [error, setError] = useState();

  const handleInputChange = event => {
    setError(null)
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const history = useHistory()

  const handleLogin = async (e) => {
    e.preventDefault()
    let payload = user
    try {
        let response = await loginUser(dispatch, payload)
        console.log('response from loginUser()', response)     

        if( response.code !== 200){
          throw new Error()
        }
        history.push({pathname: "/"});
    } catch (error) {
      setError('Invalid credentials, please try again')
      console.log("error during login", error)
    }
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
        <button onClick={handleLogin} className="btn btn-success">
          Login
        </button>
      </div>

    </div>
  );
};

export default Login;