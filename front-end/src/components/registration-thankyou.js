import React from "react";

const RegistartionThankYou = props => {
  return (
    <div>
      <div>
        Hi {props.location.state.name && props.location.state.name},
        Thank you for the registration, now you can log in and use app!
      </div>
    </div>
  );
};

export default RegistartionThankYou;