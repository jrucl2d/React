import React, { useState } from "react";

const ContactCreate = ({ onCreate }) => {
  const [newInfo, setNewInfo] = useState({ name: "", phone: "" });

  const onChange = (e) => {
    setNewInfo({
      ...newInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onClick = () => {
    onCreate({ name: newInfo.name, phone: newInfo.phone });
    setNewInfo({ name: "", phone: "" });
  };
  return (
    <div>
      <h2>Create Contact</h2>
      <p>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={newInfo.name}
          onChange={onChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          value={newInfo.phone}
          onChange={onChange}
        />
      </p>
      <button onClick={onClick}>Create</button>
    </div>
  );
};
export default ContactCreate;
