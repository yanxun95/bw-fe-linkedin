import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SingleFeed from "./SingleFeed";
import { useState, useEffect } from "react";
import PostFeed from "./Post";
import FeedLeftBar from "./FeedLeftBar";
import FeedRightBar from "./FeedRightBar";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({});
  const [checkSort, markSort] = useState(false);
  const [MyProfile, setMyProfile] = useState(null);
  // const token = process.env.REACT_APP_TOKENACCESS;
  // const url = "https://striveschool-api.herokuapp.com/api/posts/";
  // const profileUrl = "https://striveschool-api.herokuapp.com/api/profile/me";
  const url = process.env.REACT_APP_FETCH_BE_URL;
  const profileUrl = url + "/profiles/6166fec751575eba24d693f5";

  const onNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const onDeletePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  const onUpdatePost = (updatedPost) => {
    const toUpdate = posts.map((x) => x._id).indexOf(updatedPost._id);

    posts[toUpdate] = updatedPost;

    setPosts([...posts]);
  };

  // FETCH POSTS
  const fetchPosts = async () => {
    try {
      let response = await fetch(url + "/posts");
      if (response.ok) {
        let data = await response.json();
        setPosts(data);
        console.log(data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH PERSON (ME)
  const fetchPerson = async () => {
    try {
      const response = await fetch(profileUrl);
      if (response.ok) {
        let data = await response.json();
        setMyProfile({ data });
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchPerson();
  }, []);

  return (
    <>
      <br />
      <Container>
        <Row>
          <Col md="3">
            {MyProfile !== null && (
              <FeedLeftBar MyProfileID={MyProfile.data._id} />
            )}
          </Col>
          <Col md="6">
            <PostFeed onNewPostFunction={onNewPost} />
            {MyProfile !== null &&
              posts
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .slice(0, 25)
                .map(
                  (post) =>
                    post.user && (
                      <SingleFeed
                        MyProfileID={MyProfile.data._id}
                        onDeletePostFunction={onDeletePost}
                        onUpdatePostFunction={onUpdatePost}
                        fetchPosts={fetchPosts}
                        post={post}
                        key={post._id}
                      />
                    )
                )}
          </Col>
          <Col md="3">
            <FeedRightBar />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Feed;
