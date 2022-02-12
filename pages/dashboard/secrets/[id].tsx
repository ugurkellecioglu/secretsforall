import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import reducer from '../../../reducers/reducer';
import Overlay from '../../../components/Overlay';
import { Col, Row, Spin } from 'antd';
import axios from 'axios';
import SecretPost from '../SecretPost';
function Post() {
  const router = useRouter();
  const { id } = router.query;
  const initialState = {
    loading: false,
    error: '',
    data: {}
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const getPost = async (id: string | string[]) => {
    try {
      dispatch({ type: 'SECRET_LOADING' });
      const post = await axios.get(`/api/secrets?id=${id}`);
      dispatch({ type: 'SECRET_SUCCESS', payload: post.data });
    } catch (error) {
      dispatch({ type: 'SECRET_ERROR' });
    }
  };
  useEffect(() => {
    if (!id) return;
    getPost(id);
  }, [id]);
  return (
    <Spin spinning={state.loading} delay={500} tip="Loading...">
      {state.data ? (
        <>
          <Row justify="center" align="middle">
            <Col span={12}>
              <SecretPost text={state.data.text} title={state.data.title} onClick={() => {}} />
            </Col>
          </Row>
        </>
      ) : null}
    </Spin>
  );
}

function Index() {
  return <Overlay Content={Post}></Overlay>;
}
export default Index;
