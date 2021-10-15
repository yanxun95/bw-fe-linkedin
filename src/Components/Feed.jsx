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
  const [MyProfile, setMyProfile] = useState();
  const depUrl = process.env.REACT_APP_FETCH_BE_URL
  const url = `${depUrl}/posts`
  const profileUrl = `${depUrl}/profiles/6166fec751575eba24d693f5`

  const onNewPost = (newPost) => {
    setPosts([...posts, newPost]);
    fetchPosts();
  };

  const onDeletePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  const onUpdatePost = (updatedPost) => {
    const toUpdate = posts.map((x) => x._id).indexOf(updatedPost._id);

    posts[toUpdate] = updatedPost;

    setPosts([...posts]);
    fetchPosts()
  };

  const fetchPosts = async () => {
    try {
      let response = await fetch(url, {
        method: "GET",
      });
      if (response.ok) {
        let data = await response.json();

        setPosts(data);
        // console.log(`This is data`, data)
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPerson = async () => {
    try {
      const response = await fetch(profileUrl, {
        method: "GET",
      });
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
            <FeedLeftBar />
          </Col>
          <Col md="6">
            <PostFeed onNewPostFunction={onNewPost} />
            {posts &&
              posts
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .slice(0, 25)
                .map(
                  (post) =>
                    post.user && (
                      <SingleFeed
                        MyProfileID={MyProfile}
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
