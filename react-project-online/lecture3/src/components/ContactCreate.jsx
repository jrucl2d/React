import React, { useState, useRef } from "react";

const ContactCreate = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const onChanageName = (e) => {
    setName(e.target.value);
  };

  const onChanagePhone = (e) => {
    setPhone(e.target.value);
  };

  const onClick = () => {
    onCreate({ name, phone });
    setName("");
    setPhone("");
  };
  return (
    <div>
      <h2>Create Contact</h2>
      <p>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={onChanageName}
        />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          value={phone}
          onChange={onChanagePhone}
        />
      </p>
      <button onClick={onClick}>Create</button>
    </div>
  );
};
export default ContactCreate;
