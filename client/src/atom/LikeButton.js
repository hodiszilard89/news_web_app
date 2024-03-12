import React, { useState } from "react";
import { Icon, FaThumbsUp } from "react-icons/fa";

export default function LikeButton() {
  const [color, setColor] = useState("red");

  const handleClick = () => {
    color === "blue" && setColor("red");
    color === "red" && setColor("blue");
  };

  return (
    <div>
      <FaThumbsUp onClick={handleClick} color={color} />
    </div>
  );
}
