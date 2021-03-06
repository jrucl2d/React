import React, { useState, useEffect, useCallback } from "react";
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

  const mapToComponent = useCallback(
    (data) => {
      data.sort();
      data = data.filter((contact) => {
        return contact.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      return data.map((contact, i) => (
        <ContactInfo contact={contact} key={i} onClick={() => onClick(i)} />
      ));
    },
    [contactData]
  );

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
    let newData = [];
    newData = contactData.filter((v, i) => {
      if (i !== selectedKey) {
        return { ...v };
      }
    });
    setContactData(newData);
    setSelectedKey(-1);
  };

  const onEdit = (name, phone) => {
    let reData = [];
    contactData.forEach((v) => {
      reData.push({ ...v });
    });
    reData[selectedKey].name = name;
    reData[selectedKey].phone = phone;
    setContactData(reData);
  };

  // 최초 실행
  useEffect(() => {
    const innerData = localStorage.contactData;
    if (innerData) {
      setContactData(JSON.parse(innerData));
    }
  }, []);

  // contactData가 바뀌면 로컬 스토리지 업데이트
  useEffect(() => {
    localStorage.contactData = JSON.stringify(contactData);
  }, [contactData]);

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
        onRemove={onRemove}
        onEdit={onEdit}
      />
      <hr />
      <h2>Create</h2>
      <ContactCreate onCreate={onCreate} />
    </div>
  );
};

export default Contact;
