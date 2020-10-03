import React from "react";

const ContactInfo = ({ contact }) => {
  return (
    <div>
      {contact.name} {contact.phone}
    </div>
  );
};

export default ContactInfo;
