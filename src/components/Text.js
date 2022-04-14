import React, { useEffect } from "react";

const Text = ({ textObject, currentTime, setCurrentTime, hasDecoration }) => {
  useEffect(() => console.log("text rerender"));

  return (
    <span
      onClick={() => setCurrentTime(textObject.data.dataStart)}
      className={`text ${currentTime !== 0 ? "text-blue" : " "} ${
        hasDecoration ? "decoreation" : ""
      }`}
    >
      {textObject.text}
    </span>
  );
};

export default React.memo(Text);
