import React from 'react';
import styles from './tagCreator.module.scss';
import { Button, Tag, Typography } from 'antd';
import PropTypes from 'prop-types';
import tags from './tags';

const TagCreator = ({ userTags, setUserTags }) => {
  const handleAddTag = (tag) => {
    const date = new Date();
    setUserTags((prevState) => [...prevState, { ...tag, id: date.getTime() }]);
  };
  const removeTag = (tag) => {
    setUserTags((prevState) =>
      prevState.filter((t) => t.text !== tag.text && t.color !== tag.color && t.id !== tag.id)
    );
  };

  return (
    <div className={styles.tags}>
      <Typography.Title level={5}>Tag Creator</Typography.Title>
      <div className={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <Button onClick={() => handleAddTag(tag)} key={`${tag}-${index}`} type="link">
            <Tag color={tag.color}>{tag.text}</Tag>
          </Button>
        ))}
      </div>

      <div className={styles.yourTags}>
        <Typography.Title level={5}>Your Tags</Typography.Title>
        {userTags?.length > 0 &&
          userTags.map((tag, idx) => (
            <div
              key={`${tag.text}-${idx}`}
              style={{ marginTop: '0.5rem', display: 'inline-block' }}>
              <Tag color={tag.color}>
                <input
                  onChange={(e) => (tag.text = e.target.value)}
                  placeholder={tag.text}
                  className={styles.createTag}
                  type="text"
                  size={10}
                  minLength={3}
                />
                <span onClick={() => removeTag(tag)} className={styles.cancel}>
                  x
                </span>
              </Tag>
            </div>
          ))}
        {userTags?.length === 0 && <Typography.Text>No tags yet</Typography.Text>}
      </div>
    </div>
  );
};
TagCreator.propTypes = {
  userTags: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ),
  setUserTags: PropTypes.func.isRequired
};
TagCreator.defaultProps = {
  userTags: [],
  setUserTags: () => {}
};

export default TagCreator;
