import { Card, Dropdown } from "react-bootstrap";
import { BsThreeDots, BsFillTrashFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import {
  RiShareForwardFill,
  RiGlobalFill,
  RiSendPlaneFill,
} from "react-icons/ri";
import formatDistance from "date-fns/formatDistance";
import ModalItem from "./Modal";
import { useState, useEffect } from "react";

const SingleFeed = ({
  post,
  onDeletePostFunction,
  onUpdatePostFunction,
  fetchPosts,
  fetchPerson,
  MyProfileID,
}) => {
  const url = process.env.REACT_APP_FETCH_BE_URL;
  const profileId = MyProfileID;
  const deletePost = async () => {
    try {
      const response = await fetch(url + "/posts/" + post._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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

  const [newpost, setPost] = useState(null);

  const likes = async () => {
    console.log("likes");
    const userId = { userId: MyProfileID };
    console.log(userId);
    try {
      const response = await fetch(url + `/posts/${post._id}/like/`, {
        method: "POST",
        body: JSON.stringify(userId),
        headers: { "Content-type": "application/json" },
      });
      if (response.ok) {
        fetchPosts();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(post._id);
  };

  useEffect(() => {}, [post]);

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
          <div style={{ cursor: "pointer" }} onClick={() => likes()}>
            <AiOutlineLike size={20} />
            {post.likes === 0 ? (
              <span> Like</span>
            ) : (
              <span> {post.likes} Like</span>
            )}
          </div>
          <div style={{ cursor: "pointer" }}>
            <FaRegCommentDots size={20} />
            <span> Comment</span>
          </div>
          <div style={{ cursor: "pointer" }}>
            <RiShareForwardFill size={20} /> <span>Share</span>
          </div>
          <div style={{ cursor: "pointer" }}>
            <RiSendPlaneFill size={20} /> <span>Send</span>
          </div>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default SingleFeed;
