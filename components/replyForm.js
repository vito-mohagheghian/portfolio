import React, { useRef } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import styles from "../styles/form.module.css";

const ReplyForm = ({
  comments,
  id,
  setComments,
  forceUpdate,
  CommentIndex,
  setReplyForm,
}) => {
  const form = useRef();

  const replyHandler = () => {
    const date = new Date();

    function Comment(name, email, body, time) {
      this.name = name;
      this.email = email;
      this.time = time;
      this.body = body;
    }

    const newReply = new Comment(
      form.current[1].value,
      form.current[2].value,
      form.current[0].value,
      date.getTime()
    );

    const parentComment = comments[CommentIndex];
    parentComment.replies.push(newReply);
    setComments(parentComment.replies);

    fetch("/api/updateCommentsBlog", {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        comments: comments,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    forceUpdate();

    form.current[0].value = "";
    form.current[1].value = "";
    form.current[2].value = "";

    setReplyForm(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h5 className={styles.heading}>Leave your Comment</h5>
        <button
          className={styles.close_button}
          onClick={() => {
            setReplyForm(false);
          }}
        >
          <CloseRoundedIcon />
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={styles.form}
        ref={form}
      >
        <textarea className={styles.textarea} placeholder="Comment"></textarea>
        <span className={styles.input_container}>
          <input type="text" className={styles.input} placeholder="Name" />
          <input type="email" className={styles.input} placeholder="Email" />
          <button
            className={styles.button}
            onClick={() => {
              replyHandler();
            }}
          >
            Done
          </button>
        </span>
      </form>
    </div>
  );
};

export default ReplyForm;