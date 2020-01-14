import React from "react";

const Message = ({message}) => {
  return (
    <div className="text-white">
      {message.text}
    </div>
  );
};

export default Message;
