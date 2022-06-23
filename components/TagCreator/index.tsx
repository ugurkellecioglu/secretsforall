import React from 'react';
import styles from './tagCreator.module.scss';
import { Button, Tag, Typography } from 'antd';
import PropTypes from 'prop-types';

const tags = [
  {
    color: '#f5222d',
    text: 'movie lover'
  },
  {
    color: '#faad14',
    text: 'traveler'
  },
  {
    color: '#52c41a',
    text: 'gamer'
  },
  {
    color: '#1890ff',
    text: 'photographer'
  },
  {
    color: '#2f54eb',
    text: 'writer'
  },
  {
    color: '#722ed1',
    text: 'entrepreneur'
  },
  {
    color: '#eb2f96',
    text: 'sporty'
  },
  {
    color: '#1890ff',
    text: 'sporty'
  }
];

const TagCreator = ({ userTags, setUserTags }) => {
  const handleAddTag = (tag) => {
    const date = new Date();
    setUserTags((prevState) => [...prevState, { ...tag, id: date.getTime() }]);
    console.log(userTags);
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
            <Tag color={tag.color} key={`${tag.text}-${idx}`}>
              <input
                onChange={(e) => (tag.text = e.target.value)}
                placeholder={tag.text}
                className={styles.createTag}
                type="text"
              />
              <span onClick={() => removeTag(tag)} className={styles.cancel}>
                x
              </span>
            </Tag>
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
