import React, { useState } from "react";
import ContactInfo from "./ContactInfo";
import ContactDetails from "./ContactDetails";
import ContactCreate from "./ContactCreate";

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
  const [selectedKey, setSelectedKey] = useState(-1);

  const mapToComponent = (data) => {
    data.sort();
    data = data.filter((contact) => {
      return contact.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
    return data.map((contact, i) => (
      <ContactInfo contact={contact} key={i} onClick={() => onClick(i)} />
    ));
  };

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  const onClick = (key) => {
    setSelectedKey(key);
  };

  const onCreate = (Contact) => {
    setContactData(contactData.concat(Contact));
  };

  const onRemove = () => {
    setContactData([
      ...contactData.slice(0, selectedKey), // 선택된 키 이전과 이후만으로 새로운 배열 만듦
      ...contactData.slice(selectedKey + 1, contactData.length - 1),
    ]);
    setSelectedKey(-1);
  };

  const onEdit = (name, phone) => {
    const reData = [];
    contactData.forEach((v) => {
      reData.push({ ...v });
    });
    reData[selectedKey].name = name;
    reData[selectedKey].phone = phone;
    setContactData(reData);
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
      <hr />
      <h2>Details</h2>
      <ContactDetails
        isSelected={selectedKey !== -1}
        contact={contactData[selectedKey]}
      />
      <hr />
      <h2>Create</h2>
      <ContactCreate onCreate={onCreate} />
    </div>
  );
};

export default Contact;
