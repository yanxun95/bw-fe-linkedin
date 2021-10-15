import { Card, Dropdown } from "react-bootstrap";
import { BsThreeDots, BsFillTrashFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import {
  RiShareForwardFill,
  RiGlobalFill,
  RiSendPlaneFill,
} from "react-icons/ri";
import formatDistance from "date-fns/formatDistance";
import ModalItem from "./Modal";
import { useState, useEffect } from "react";
import AddComment from "./AddComment"
import EditComment from "./EditComment";
import "../experience.css"

const SingleFeed = ({
  post,
  onDeletePostFunction,
  onUpdatePostFunction,
  fetchPosts,
  MyProfileID,
  // userId
}) => {
  // const url = "https://striveschool-api.herokuapp.com/api/posts/";
  // const token = process.env.REACT_APP_TOKENACCESS;

  useEffect(() => {
        fetchComments();
  }, []);

  const [comments, setComments] = useState([])
console.log("Comments STATE SINGLE FEED", comments)
// console.log("THIS IS MATCH PARAMS USER ID IN SINGLE FEED", userId)
const postId = post._id


  const url = process.env.REACT_APP_FETCH_BE_URL;
  // const profileId = MyProfile.data._id;
  const profileId = MyProfileID;
  // console.log(MyProfile)
  const deletePost = async () => {
    try {
      const response = await fetch(url + post._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        console.log("Comment Deleted", post._id);
        onDeletePostFunction(post._id);
      }
    } catch (err) {
      console.log(err);
    }
  };


//---Fetch Comments---
const fetchComments = async () => {
  try {
    const resp = await fetch(`${process.env.REACT_APP_BE_URL}/posts/` + post._id + "/comment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (resp.ok) {
      console.log("COMMENT COMMING");
      let data = await resp.json();
      setComments(data)
      console.log("COMMENT DATA USER", data)
    }
  } catch (error) {
    console.log("COMMENT ERROR", error)
  }
}

  const result = formatDistance(new Date(), new Date(post.createdAt));
  const profileImg = post.user.image
    ? post.user.image
    : "https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png";
  return (
    <Card className="feed mt-2" key={post._id}>
      <Card.Body>
        <Card.Title className="d-flex">
          <div className="user-info-side d-flex">
            <div className="user-img mr-3">
              <img src={profileImg} />
            </div>
            <div className="user-info">
              <h4>
                <b>
                  {post.user.name} {post.user.surname}
                </b>{" "}
                - 1st
              </h4>
              <p>{post.user.title}</p>
              <p>
                {result} ago - <RiGlobalFill />
              </p>
            </div>
          </div>
          {profileId === post.user._id && (
            <div className="ml-auto">
              <button id="three-dots" onClick={deletePost}>
                <BsFillTrashFill variant="danger" />
              </button>

              <ModalItem
                title="update"
                postToUpdate={post}
                onUpdatePost={onUpdatePostFunction}
                fetchPosts={fetchPosts}
              />
            </div>
          )}
        </Card.Title>
        <Card.Text>{post.text}</Card.Text>
        {post.image && <Card.Img src={post.image} />}
        <Card.Body className="footer-icons d-flex">
          <div>
            <AiOutlineLike size={20} />
            {post.likes === 0 ? (
              <span>Like</span>
            ) : (
              <span> {post.likes} Like</span>
            )}
          </div>
          <div>
            <AddComment postId={post._id} userId={MyProfileID} fetchComments={fetchComments} />         
            
            <span> Comment</span>
            </div>
          <div>
            <RiShareForwardFill size={20} /> <span>Share</span>
          </div>
          <div>
            <RiSendPlaneFill size={20} /> <span>Send</span>
          </div>
        </Card.Body>
            {/* <div>
             { comments.map((c) => c.userId._id)}
            </div> */}


       {comments.map((com) => (
         <Card.Body>
         <div>
           <Row>
             <Col xs="1">
         
                    <img className="commentImage" src={com.userId.image} style={{borderRadius:50}} alt="" />
                 
             </Col>
             <Col xs="11">
               <div className="ml-2 commentBox d-flex">
                <div className="">
               <div className="ml-2 py-0 commentName" > {com.userId.name}{com.userId.surname} </div>
               <div className="ml-2 py-0 commentTitle" > {com.userId.title} </div>
               <div className="ml-2 py-0 commentText">{com.comment}</div>
               </div>
               <div className="d-flex ml-auto">
                        <EditComment
                          userId={MyProfileID}
                          commentId={com._id}
                          postId={postId}
                          fetchComments={fetchComments}
                        />
                </div>
               </div>
             </Col>

           </Row>
         </div>
         </Card.Body>
       ))}
      </Card.Body>
    </Card>
  );
};

export default SingleFeed;
