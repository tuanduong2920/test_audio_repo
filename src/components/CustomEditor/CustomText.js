import React from "react";

const CustomText = (props) => {
  const { currentTime, setCurrentTime, hasDecoration, leaf } = props;
  return (
    <span
      {...props.attributes}
      onDoubleClick={() => setCurrentTime(leaf.data.dataStart)}
      className={` ${currentTime !== 0 ? "text-blue" : " "} ${
        hasDecoration ? "decoreation" : ""
      }`}
    >
      {props.children}
    </span>
  );
};

export default React.memo(CustomText);
