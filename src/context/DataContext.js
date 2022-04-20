import { createContext, useState } from "react";
import Data from "../data.json";
import FileSaver from "file-saver";
import lodash from "lodash";

import { createEditor, Transforms, Editor } from "slate";

// Import the Slate components and React plugin.
import { withReact, ReactEditor } from "slate-react";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [dataArr, setDataArr] = useState(Data.content.document.children);
  const [pointerPosition, setPointerPosition] = useState({
    block: null,
    text: null,
  });

  const [editor, setEditor] = useState(() => withReact(createEditor()));

  // const addSpeaker = ()

  const setDataArrAndwriteFile = () => {
    Data.content.document.children = dataArr;
    const blob = new Blob([JSON.stringify(Data)], {
      type: "application/json;charset=utf-8",
    });
    FileSaver.saveAs(blob, "data.json");
  };

  const getDataSpeakerNameOption = () => {
    return editor.children.reduce((nameArray, currentValue) => {
      if (
        currentValue.data.speaker &&
        !nameArray.includes(currentValue.data.speaker)
      ) {
        return [...nameArray, currentValue.data.speaker];
      }
      return nameArray;
    }, []);
  };

  const changeSpeakerName = (currentName, newName, node) => {
    if (currentName === newName) {
      return;
    }

    const pos = ReactEditor.findPath(editor, node);
    Transforms.setNodes(
      editor,
      { data: { ...node.data, speaker: newName } },
      { at: pos }
    );
  };

  const editSpeakerName = (currentName, newName) => {
    if (currentName === newName) {
      return;
    }
    // console.log(editor);

    // const block = [...editor.children];

    editor.children.forEach((node) => {
      if (node.data.speaker !== "" && node.data.speaker === currentName) {
        const pos = ReactEditor.findPath(editor, node);
        Transforms.setNodes(
          editor,
          { data: { ...node.data, speaker: newName } },
          { at: pos }
        );
      }
    });

    // setEditor({ ...editor, children: block });
  };

  const editContentText = (blockPosition, textPosition, newText) => {
    // const newArr = [...dataArr];
    if (dataArr[blockPosition].children[textPosition].text === newText) {
      return;
    }
    dataArr[blockPosition].children[textPosition].text = newText;
    setDataArr(dataArr);
  };

  const makeNewBlock = () => {
    if (pointerPosition.text === 0) {
      return;
    }
    const newArr = [...dataArr];

    const topText = newArr[pointerPosition.block].children.slice(
      0,
      pointerPosition.text
    );

    const bottomText = newArr[pointerPosition.block].children.slice(
      pointerPosition.text
    );

    const topBlock = newArr[pointerPosition.block];
    topBlock.children = topText;

    const bottomBlock = {
      object: "block",
      type: "paragraph",
      data: {
        speaker: newArr[pointerPosition.block].data.speaker,
        start: bottomText[0].data.dataStart,
        end: bottomText[bottomText.length - 1].data.dataEnd,
        comments: {},
      },
      children: bottomText,
    };

    const topArr = newArr.slice(0, pointerPosition.block);
    const bottomArr = newArr.slice(pointerPosition.block + 1);

    const arr = [...topArr, topBlock, bottomBlock, ...bottomArr];
    setPointerPosition({ block: null, text: null });

    setDataArr(arr);
  };

  const groupBlock = () => {
    if (pointerPosition.text !== 0) {
      return;
    }
    const newArr = [...dataArr];
    const groupText = newArr[pointerPosition.block].children;
    const endTime = groupText[groupText.length - 1].data.dataEnd;

    const topArr = newArr.slice(0, pointerPosition.block);
    const bottomArr = newArr.slice(pointerPosition.block + 1);

    topArr[topArr.length - 1].children.push(...groupText);
    topArr[topArr.length - 1].data.end = endTime;
    const arr = [...topArr, ...bottomArr];
    setPointerPosition({ block: null, text: null });
    console.log(arr.length);
    setDataArr(arr);
  };

  return (
    <DataContext.Provider
      value={{
        dataArr,
        setDataArr,
        getDataSpeakerNameOption,
        changeSpeakerName,
        editSpeakerName,
        setDataArrAndwriteFile,
        editContentText,
        pointerPosition,
        setPointerPosition,
        makeNewBlock,
        groupBlock,
        editor,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
