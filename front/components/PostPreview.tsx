import Link from 'next/link';
import React from 'react';

import styles from '../styles/PostPreview.module.css';

const PostPreview = ({ post }) => {
  return (
    <div className={styles.previewContainer}>
      <div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div
          dangerouslySetInnerHTML={{ __html: post.body }}
          className={styles.bodyContainer}
        ></div>
        <Link href={`/blog/${post.id}`}>
          <input type='button' value='Read More' className='btn btn-info' />
        </Link>
      </div>
    </div>
  );
};

export default PostPreview;
