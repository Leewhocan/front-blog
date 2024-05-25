import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import styles from "./modal.module.scss";
import { useDispatch } from "react-redux";
import { setModalFirstView } from "../../redux/slices/posts";
export const AgreementModal = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
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
  const handleOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleAgreementConfirmation = () => {
    handleClose();
    dispatch(setModalFirstView(false));
    setIsChecked(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Открыть модальное окно
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Пользовательское соглашение
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              При организации социального сервиса или платформы для размещения
              пользователями различных материалов в публичном доступе необходимо
              оформлять лицензионное соглашение с каждым пользователем на
              использование его материалов в рамках такого Интернет-сервиса.
              Например разрешение пользователя на использование его фотографиии
              может понадобиться для ее публикации на страницах других
              пользователей и т.д.Кроме того, получение лицензии подтверждает
              факт использования контента с разрешения пользователя, который
              отвечает за наличие у него полномочий на выдачу такой лицензии
            </Typography>
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              inputProps={{ "aria-label": "Принять соглашение" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAgreementConfirmation}
              disabled={!isChecked}
            >
              Подтвердить соглашение
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
};
