import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import reducer from '../../../reducers/reducer';
import Overlay from '../../../components/Overlay';
import { Col, Row, Spin } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';

const SecretPost = dynamic(import('../../../components/Dashboard/SecretPost'));

function Index() {
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
  console.log(state.data);

  useEffect(() => {
    if (!id) return;
    getPost(id);
  }, [id]);
  return (
    <Overlay>
      <Spin spinning={state.loading} delay={500} tip="Loading...">
        {state.data && state.data.result ? (
          <>
            <Row justify="center" align="middle">
              <Col lg={12} md={18} sm={24} xs={24} style={{ marginTop: '1rem' }}>
                <SecretPost
                  text={state.data.result.text}
                  title={state.data.result.title}
                  postId={state.data.result._id}
                  comments={state.data.result.comments}
                />
              </Col>
            </Row>
          </>
        ) : null}
      </Spin>
    </Overlay>
  );
}

export default Index;
