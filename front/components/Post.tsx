import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="center-children">
      <div className="container">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
      </div>
    </div>
  );
};

export default Post;
