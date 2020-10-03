import React from "react";

const ContactDetails = ({ isSelected, contact, onRemove, onEdit }) => {
  const onClickEdit = () => {
    const newName = prompt("새로운 이름을 입력하시오", contact.name);
    const newPhone = prompt("새로운 전화번호를 입력하시오", contact.phone);
    if (newName && newPhone && newName !== "" && newPhone !== "") {
      onEdit(newName, newPhone);
    }
  };
  const buttons = (
    <div>
      <button onClick={onClickEdit}>Edit</button>
      <button onClick={() => onRemove()}>Remove</button>
    </div>
  );
  const details = (
    <div>
      <p>{contact.name}</p>
      <p>{contact.phone}</p>
      {buttons}
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
