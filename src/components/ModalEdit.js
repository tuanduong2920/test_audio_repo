import { Button, Input, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { useSlate } from "slate-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalEdit = ({ currentName, isOpenEdit, setOpenEdit, setEditName }) => {
  useEffect(() => console.log("modal rerender"));
  const { editSpeakerName } = useContext(DataContext);
  const [value, setValue] = useState("");

  const onSave = () => {
    editSpeakerName(currentName, value);
    setValue("");
    setOpenEdit(false);
    setEditName(false);
  };

  return (
    <Modal open={isOpenEdit} onClose={() => setOpenEdit(false)}>
      <Box sx={style} textAlign="center">
        <Box marginBottom={3}>
          <input
            placeholder="Enter new name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="space-around">
          <Button color="primary" onClick={onSave}>
            Save
          </Button>
          <Button color="secondary" onClick={() => setOpenEdit(false)}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(ModalEdit);
