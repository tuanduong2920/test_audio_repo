import React, { useContext, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DataContext from "../context/DataContext";
import ModalEdit from "./ModalEdit";
import { useSlate } from "slate-react";
import { Transforms, Editor } from "slate";

const EditSpeakerBox = ({ currentName, setEditName, node }) => {
  const [text, setText] = useState(currentName || "");
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [editNameModal, setEditNameModal] = useState("");
  const { getDataSpeakerNameOption, changeSpeakerName } =
    useContext(DataContext);
  const slate = useSlate();

  useEffect(() => console.log("autocomplete rerender"));

  const onPressEnter = (e) => {
    if (e.key === "Enter") {
      changeSpeakerName(currentName, text, node);

      setEditName(false);
      return;
    } else {
      setText(e.target.value);
    }
  };

  const clickOpenModalEdit = (edittext) => {
    setEditNameModal(edittext);
    setOpenEdit(true);
  };

  return (
    <>
      <Autocomplete
        freeSolo
        disableClearable
        value={text}
        options={getDataSpeakerNameOption()}
        onKeyUp={onPressEnter}
        onSelect={(val) => setText(val.target.value)}
        renderInput={(params) => (
          <TextField {...params} label="Enter name .." />
        )}
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
    </>
  );
};
export default React.memo(EditSpeakerBox);
