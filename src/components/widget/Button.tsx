import React from "react";

interface Props {
  trigger: Function;
  title: string;
  isActive: Boolean
}

const Button: React.FC<Props> = ({ trigger, title, isActive }) => {
  return (
    <button
      onClick={() => {
       if(!isActive) return
       trigger();
      }}
      disabled={!isActive}
      className={`px-4 py-1 border-2 border-green-800 bg-green-800 text-white rounded mr-4
      ${!isActive ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
      `}
    >
      {title}
    </button>
  );
};

export default Button;
