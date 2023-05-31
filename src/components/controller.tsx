import React from "react";

interface Props {
  onClick: Function,
  active: boolean,
  ontransitionEnd: Function
}

const Controller: React.FC<Props> = ({ onClick, active, ontransitionEnd }) => {
  return <button disabled={active} style={{ width: active ? "180%" : "100%" }} onClick={() => onClick()} className="h-2 overflow-hidden outline-none origin-center  duration-1000 cursor-pointer rounded-full bg-gray-700">
    <div onTransitionEnd={() => ontransitionEnd()} style={{ width: active ? "100%" : "0", transition: active ? "10000ms" : "none" }} className="h-full bg-purple-300"></div>
  </button>;
};

export default Controller;
