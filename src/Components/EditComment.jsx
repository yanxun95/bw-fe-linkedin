import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRef } from "react";
import "../experience.css";
import "../css/editModal.css";
import { FaRegCommentDots } from "react-icons/fa";

export default function EditComment({
  fetchComments,
  postId,
  userId,
  commentId,
}) {
  // CONSTANT
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   REFRESH
  // useEffect(() => {
  //   // fetchComment();
  // }, []);

  //   EDITING INFO
  const [EditingComment, setEditingComment] = useState({
    comment: "Hello",
    userId: userId,
    postId: postId,
    commentId: commentId,
  });

  console.log("THIS IS EDITING COMMENT", EditingComment);

  // Data set
  const dataSet = (valname, valdata) => {
    setEditingComment({ ...EditingComment, [valname]: valdata });
  };
  // DATA SEND
  const sendData = (e) => {
    e.preventDefault();
    editData();
    handleClose();
  };
  const deleteData = (e) => {
    e.preventDefault();
    deleteFunction();
    handleClose();
    fetchComments();
  };

  //Recieving Data

  // const fetchComment = async () => {
  //   try {
  //     let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/`+postId+"/comment/" + commentId, {
  //         method: "GET"
  //       }
  //     );
  //     if (response.ok) {
  //       let data = await response.json();
  //       setEditingComment(data)
  //       console.log("EDIT COMMENT DATA", data)
  //     } else {
  //       console.log("Error");
  //     }
  //   } catch (erorr) {}
  // }

  const editData = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_FETCH_BE_URL}/posts/comment/${commentId}/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(EditingComment),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        fetchComments();
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteFunction = async (e) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_FETCH_BE_URL}/posts/comment/${commentId}`,
        {
          method: "DELETE",
          body: JSON.stringify(EditingComment),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // JSX !
  return (
    <>
      <FaRegCommentDots size={20} onClick={handleShow} />

      <Modal className="modalEditInfo" show={show} onHide={handleClose}>
        <Modal.Header className="font-weight-light" closeButton>
          <Modal.Title className="font-weight-light">Edit Comment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => sendData(e)}>
          <Modal.Body className="p-4">
            <Row>
              <Col xs="12">
                <Form.Group controlId="formHeadLine">
                  <Form.Control
                    type="text"
                    value={Comment.comment}
                    onChange={(e) => dataSet("comment", e.target.value)}
                    placeholder="Comment"
                  />
                </Form.Group>
              </Col>
              <Col xs="12"></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className="mr-auto"
              onClick={(e) => deleteData(e)}
            >
              Delete
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
