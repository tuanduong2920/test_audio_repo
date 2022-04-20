import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";

const Text = ({
  textObject,
  currentTime,
  setCurrentTime,
  hasDecoration,
  textPosition,
  blockPosition,
}) => {
  // useEffect(() => console.log("text rerender"));
  const [isEditAble, setEditAble] = useState(false);
  const [value, setValue] = useState(textObject.text);
  const { editContentText, pointerPosition, setPointerPosition } =
    useContext(DataContext);

  const onEnterValue = (e) => {
    if (e.key === "Enter") {
      // console.log("textPosition", textPosition);
      // console.log("blockPosition", blockPosition);
      editContentText(blockPosition, textPosition, value);
      setEditAble(false);
    }
  };

  const isShowPointer = () => {
    if (
      pointerPosition.block === blockPosition &&
      pointerPosition.text === textPosition
    ) {
      return true;
    }
    return false;
  };

  const handleShowPointer = () => {
    if (!isShowPointer()) {
      const pos = { block: blockPosition, text: textPosition };
      setPointerPosition(pos);
    }
  };

  return isEditAble ? (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyUp={onEnterValue}
    />
  ) : (
    <>
      {/* <span onClick={() => handleShowPointer()}>
        &nbsp;&nbsp;
        {isShowPointer() ? <span style={{ color: "blue" }}>|</span> : ""}
      </span> */}

      <span
        onClick={() => setCurrentTime(textObject.data.dataStart)}
        onDoubleClick={() => setEditAble(true)}
        className={`text ${currentTime !== 0 ? "text-blue" : " "} ${
          hasDecoration ? "decoreation" : ""
        }`}
      >
        {value}
      </span>
    </>
  );
};

export default React.memo(Text);
