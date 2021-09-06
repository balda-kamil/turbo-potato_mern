import React from "react"
import axios from 'axios'

const Register = props => {
  console.log(props)

  const [formData, updateFormData] = React.useState();
  const [error, setError] = React.useState(null);

  const handleSubmit = e => {
    e.preventDefault()
    console.log('register function') 


    axios.post('http://localhost:5000/user/register', formData)
      .then(resp => {
        if(resp.status === 200){
          console.log('User registered!')
        }
      })
      .catch(err => {
        setError(err.response.data)
        console.log(error)
      })
  }

  const handleChange = e => {
    console.log(e)
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
    setError(null)
  }

  console.log(formData)

  return (
    <div className="submit-form">
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="first_name" onChange={handleChange}/>
          </label>
          <label>
            Last Name:
            <input type="text" name="last_name" onChange={handleChange}/>
          </label>
          <label>
            Email
            <input type="email" name="email" onChange={handleChange}/>
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      { error && error.error }
    </div>
  );
};

export default Register;