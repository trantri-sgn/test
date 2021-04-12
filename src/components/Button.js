import React from "react";

const Button = ({ color, text, onClick }) => {
  return (
    <button onClick={onClick} style={{ background: color }} className="btn">
      {text}
    </button>
  );
};

export default Button;
