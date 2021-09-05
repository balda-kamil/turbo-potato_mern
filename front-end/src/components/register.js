import React from "react"

const Register = props => {
  console.log(props)

  const [formData, updateFormData] = React.useState();

  const handleSubmit = e => {
    console.log(e)
    e.preventDefault()
    console.log('register function')

    
  }

  const handleChange = e => {
    console.log(e)
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  }

  console.log(formData)

  return (
    <div className="submit-form">
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="fname" onChange={handleChange}/>
          </label>
          <label>
            Last Name:
            <input type="text" name="lname" onChange={handleChange}/>
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
    </div>
  );
};

export default Register;