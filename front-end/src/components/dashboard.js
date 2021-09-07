import React from "react";
import { useAuthDispatch, logout, useAuthState } from "../Context";

const Dashboard = (props) => {
  console.log('dashboard...')

  const dispatch = useAuthDispatch(); // read dispatch method from context
  const user =  useAuthState(); //read user details from context

  const handleLogout = () => {
    logout(dispatch); //call the logout action
    props.history.push('/login')
  };

  let content;
  
  if(user.userDetails){
    content = <div>
    <h1>Welcome my friend!</h1>
      <button onClick={handleLogout}>LOG OUT</button>
  </div>
  } else {
    content = <p>please log in!</p>
  }

  return (
    <div>
      { content }
    </div>
  );
};

export default Dashboard;
