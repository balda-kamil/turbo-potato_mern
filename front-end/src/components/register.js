import React from "react"

const Register = props => {
  console.log(props)

  const [user, setUser] = React.useState();

  const register = () => {
    console.log('register function')
  }


  return (
    <div className="submit-form">
      <div>
        <form>
          <label>
            First Name:
            <input type="text" name="fname" />
          </label>
          <label>
            Last Name:
            <input type="text" name="lname" />
          </label>
          <label>
            Email
            <input type="email" name="email" />
          </label>
          <label>
            Password:
            <input type="password" name="fname" />
          </label>
          <input type="submit" value="Submit" />
        <button onClick={register} className="btn btn-success">
          Sign Up!
        </button>
        </form>
      </div>
    </div>
  );
};

export default Register;