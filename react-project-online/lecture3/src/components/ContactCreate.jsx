import React, { useState, useRef } from "react";

const ContactCreate = ({ onCreate }) => {
  const [newInfo, setNewInfo] = useState({ name: "", phone: "" });
  const ref = useRef(null);

  const onChange = (e) => {
    setNewInfo({
      ...newInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    onCreate({ name: newInfo.name, phone: newInfo.phone });
    setNewInfo({ name: "", phone: "" });
    ref.current.focus();
  };
  return (
    <div>
      <h2>Create Contact</h2>
      <form onSubmit={onClick}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={newInfo.name}
          onChange={onChange}
          ref={ref}
        />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          value={newInfo.phone}
          onChange={onChange}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
export default ContactCreate;
