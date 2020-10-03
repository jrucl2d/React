import React from "react";

const ContactDetails = ({ isSelected, contact }) => {
  const details = (
    <div>
      <p>{contact.name}</p>
      <p>{contact.phone}</p>
    </div>
  );
  const blank = <div>not selected</div>;
  return <div>{isSelected ? details : blank}</div>;
};
export default ContactDetails;

ContactDetails.defaultProps = {
  contact: {
    name: "",
    phone: "",
  },
};
