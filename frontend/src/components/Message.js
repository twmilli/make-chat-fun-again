import React from "react";

const Message = ({ name, text, sentTime }) => {
  return (
    <div className="text-white m-4">
      <div>
        <div className="inline font-semibold text-gray-500">{name}</div>
        <div className="inline font-medium text-gray-300 p-4">{sentTime}</div>
      </div>
      <div>{text}</div>
    </div>
  );
};

export default Message;
