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
  const [keyword, setKeyword] = useState("");
  const mapToComponent = (data) => {
    data.sort();
    data = data.filter((contact) => {
      return contact.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
    return data.map((contact, i) => <ContactInfo contact={contact} key={i} />);
  };

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <h1>Contacts</h1>
      <input
        type="text"
        name="keyword"
        placeholder="search"
        value={keyword}
        onChange={onChange}
      />
      <div>{mapToComponent(contactData)}</div>
    </div>
  );
};

export default Contact;
