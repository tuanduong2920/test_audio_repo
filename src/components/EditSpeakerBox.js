import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DataContext from "../context/DataContext";
import ModalEdit from "./ModalEdit";

const useClickOutSide = (ref, optionRef, setEditName) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (optionRef.current && optionRef.current.contains(event.target)) {
          return document.removeEventListener("mousedown", handleClickOutside);
        }
        setEditName(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const EditSpeakerBox = ({ currentName, setEditName, node }) => {
  const [text, setText] = useState(currentName || "");
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [editNameModal, setEditNameModal] = useState("");
  const { getDataSpeakerNameOption, changeSpeakerName } =
    useContext(DataContext);
  const inputRef = useRef();
  const optionListRef = useRef();

  useClickOutSide(inputRef, optionListRef, setEditName);

  const onPressEnter = (e) => {
    if (e.key === "Enter") {
      console.log(text);
      changeSpeakerName(currentName, text, node);

      setEditName(false);
    } else {
      setText(e.target.value);
    }
  };

  const clickOpenModalEdit = (edittext) => {
    setEditNameModal(edittext);
    setOpenEdit(true);
  };

  return (
    <div ref={inputRef}>
      <Autocomplete
        freeSolo
        disableClearable
        value={text}
        options={getDataSpeakerNameOption()}
        onKeyUp={onPressEnter}
        onChange={(e, val) => setText(val)}
        renderInput={(params) => (
          <TextField {...params} label="Enter name .." />
        )}
        ListboxProps={{
          ref: optionListRef,
        }}
        renderOption={(props, option) => (
          <div className="option-item" key={option}>
            <div
              className="item-edit"
              onClick={() => clickOpenModalEdit(option)}
            >
              Edit
            </div>
            <div className="col-10" {...props}>
              {option}
            </div>
          </div>
        )}
      />
      <ModalEdit
        currentName={editNameModal}
        isOpenEdit={isOpenEdit}
        setOpenEdit={setOpenEdit}
        setEditName={setEditName}
      />
    </div>
  );
};
export default React.memo(EditSpeakerBox);
