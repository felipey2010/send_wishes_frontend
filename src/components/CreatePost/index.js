import React, { useState } from "react";
import "./modal.css";
import MessageForm from "../Form";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function CreatePost({ modal, close, getCards }) {
  const [values, setValues] = useState({
    user: "",
    message: "",
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSuccessMessage = () => {
    enqueueSnackbar("Card Added");
  };

  const showFailureMessage = () => {
    enqueueSnackbar("Failed to Add Card");
  };

  const apiPost = "https://messages-cards.herokuapp.com/api/cards";

  async function AddCard() {
    const params = {
      userName: values.user,
      message: values.message,
    };
    axios
      .post(apiPost, params)
      .then(res => {
        close();
        showSuccessMessage();
        setValues({
          user: "",
          message: "",
        });
      })
      .catch(error => {
        close();
        showFailureMessage();
        console.log(error);
      });
    getCards();
  }

  function handlePost() {
    if (values.user.length > 2 && values.message.length > 5) {
      AddCard();
    }
  }

  return (
    <div className="modal-container">
      <div
        className="modal-wrapper"
        style={{
          transform: modal ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: modal ? 1 : 0,
        }}>
        <div className="modal-header">
          <p>Create a Message</p>
          <span className="close-modal-btn" onClick={close}>
            X
          </span>
        </div>
        <div className="modal-content">
          <div className="modal-body">
            <h4>Welcome, Friend</h4>
            <p>Keep your message simple and clean for the public</p>
            <MessageForm values={values} setValues={setValues} />
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
