import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { EditorContext } from '../context/EditorState';

import { Text } from 'slate';
import styles from '../styles/Post.module.css';
import { CodeElement } from './JsonToHtml';

const Post = ({ user, post }) => {
  const router = useRouter();
  const editorContext = useContext(EditorContext);
  const { setPostToEdit } = editorContext;

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${process.env.API_URL}/posts/${post.id}`);
      if (res.status === 200) {
        router.push('/blog');
        return;
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setPostToEdit(post);
    router.push(`/blog/edit/`);
  };

  const serialize = (node) => {
    if (Text.isText(node)) {
      let string = node.text;
      if (node.bold) {
        string = `<strong>${string}</strong>`;
      }
      if (node.italic) {
        string = `<em>${string}</em>`;
      }
      return string;
    }

    const children = node.children.map((n) => serialize(n)).join('');

    switch (node.type) {
      case 'p':
        return <p dangerouslySetInnerHTML={{ __html: children }}></p>;
      case 'h1':
        return <h1>{children}</h1>;
      case 'h2':
        return <h2>{children}</h2>;
      case 'h3':
        return <h3>{children}</h3>;
      case 'h4':
        return <h4>{children}</h4>;
      case 'h5':
        return <h5>{children}</h5>;
      case 'h6':
        return <h6>{children}</h6>;
      case 'code':
        return <CodeElement {...children} />;
      case 'quote':
        return (
          <blockquote
            dangerouslySetInnerHTML={{ __html: children }}
          ></blockquote>
        );
      case 'ordered-list':
        return <ol dangerouslySetInnerHTML={{ __html: children }}></ol>;
      case 'bullet-list':
        return <ul dangerouslySetInnerHTML={{ __html: children }}></ul>;
      case 'list-item':
        return `<li>${children}</li>`;
      default:
        return children;
    }
  };

  return (
    <div className={`center-children ${styles.center}`}>
      <div className='container'>
        <div className={styles.postContent}>
          <h1>{post.title}</h1>
          <div>
            {post.content.map((post, index) => {
              return <div key={index}>{serialize(post)}</div>;
            })}
          </div>
        </div>
      </div>
      {user.id === post.user_id && (
        <div className={styles.actionButtonContainer}>
          <input
            type='button'
            value='Edit'
            className='btn btn-info'
            onClick={handleEdit}
          />
          <input
            type='button'
            value='Remove'
            className='btn btn-danger'
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
