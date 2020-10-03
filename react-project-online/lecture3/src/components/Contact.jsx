import React, { useState } from "react";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  const [contactData, setContactData] = useState([
    {
      name: "Abet",
      phone: "010-0000-0001",
    },
    {
      name: "Betty",
      phone: "010-0000-0002",
    },
    {
      name: "Charlie",
      phone: "010-0000-0003",
    },
    {
      name: "Jessica",
      phone: "010-0000-0004",
    },
  ]);
  const mapToComponent = (data) => {
    return data.map((contact, i) => <ContactInfo contact={contact} key={i} />);
  };

  return (
    <div>
      <h1>Contacts</h1>
      <div>{mapToComponent(contactData)}</div>
    </div>
  );
};

export default Contact;
