import { Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import React from 'react';
import Comment from './Comment';
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

class ReplyEditor extends React.Component {
  state = {
    comments: [
      {
        author: 'secretforeveryone',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully
            and efficiently.
          </p>
        ),
        datetime: moment().fromNow()
      }
    ],
    submitting: false,
    value: ''
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          ...this.state.comments,
          {
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow()
          }
        ]
      });
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}

export default ReplyEditor;
