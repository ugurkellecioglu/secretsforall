import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import reducer from '../../../reducers/reducer';
import Overlay from '../../../components/Overlay';
import { Card, Button, Col, Row, Input, Spin } from 'antd';
import axios from 'axios';

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const initialState = {
    loading: false,
    error: '',
    data: {}
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const getPost = async (id) => {
    try {
      dispatch({ type: 'loading' });
      const post = await axios.get(`/api/secrets?id=${id}`);
      const result = await post.data;
      dispatch({ type: 'success', payload: post.data });
    } catch (error) {
      dispatch({ type: 'error' });
    }
  };
  useEffect(() => {
    if (!id) return;
    getPost(id);
  }, [id]);
  return (
    <Spin spinning={state.loading} delay={500} tip="Loading...">
      {state.data ? (
        <Row justify="center" align="middle">
          <Col span={12}>
            <Card
              title={state.data.title}
              extra={<Button type="primary">Edit</Button>}
              style={{ width: '100%' }}>
              <p>{state.data.text}</p>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Spin>
  );
}

function Index() {
  return <Overlay Content={Post}></Overlay>;
}
export default Index;
