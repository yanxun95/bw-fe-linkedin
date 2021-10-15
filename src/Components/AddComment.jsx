import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../css/editModal.css";
import { FaRegCommentDots } from "react-icons/fa";

export default function AddComment({ fetchComments, postId, userId }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, []);

  const [Comment, setComment] = useState({
    comment: "",
    userId: "6166fec751575eba24d693f5",
    postId: postId,
  });

  // console.log("THIS IS COMMENT STATE", Comment.comment)

  const sendData = (e) => {
    e.preventDefault();
    addComment();
    handleClose();
  };
  const dataSet = (valname, valdata) => {
    setComment({ ...Comment, [valname]: valdata });
  };
  const addComment = async () => {
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_FETCH_BE_URL}/posts/` + postId + "/comment",
        {
          method: "POST",
          body: JSON.stringify(Comment),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.ok) {
        console.log("COMMENT GOING");
        let data = await resp.json();
        fetchComments();
      }
    } catch (error) {
      console.log("COMMENT ERROR", error);
    }
  };

  return (
    <>
      <FaRegCommentDots size={20} onClick={handleShow} />

      <Modal className="modalEditInfo" show={show} onHide={handleClose}>
        <Modal.Header className="font-weight-light" closeButton>
          <Modal.Title className="font-weight-light">Add Comment</Modal.Title>
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
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
