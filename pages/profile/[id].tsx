import { CameraFilled, DislikeTwoTone, LikeTwoTone, NotificationTwoTone } from '@ant-design/icons';
import { Button, Card, Col, Row, Tag } from 'antd';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Overlay from '../../components/Overlay';
import { UserContext } from '../../context/UserContext';
import styles from './index.module.css';

const Content = () => {
  // const router = useRouter();
  // const { id } = router.query;
  const userCtx = React.useContext(UserContext);

  const [x, setX] = useState();
  const [y, setY] = useState();
  const squareRef = React.useRef();
  const cutImageRef = React.useRef();
  const [isHovered, setHovered] = useState(false);
  useEffect(() => {
    const update = (e) => {
      if (cutImageRef.current) {
        const border = cutImageRef.current;
        // get the borders of the image
        const { top, height } = border.getBoundingClientRect();
        const bottom = top + height;
        // set hover false if the cursor is outside the image
        if (e.clientY < top || e.clientY > bottom) {
          setHovered(false);
        }
      }
      setX(e.x);
      setY(e.y);
    };
    window.addEventListener('mousemove', update);
    window.addEventListener('touchmove', update);
    return () => {
      window.removeEventListener('mousemove', update);
      window.removeEventListener('touchmove', update);
    };
  }, [setX, setY]);

  useEffect(() => {
    if (isHovered) {
      const height = squareRef.current.clientHeight;
      squareRef.current.style.top = y - height - height / 2 + 'px';
    }
  }, [x, y]);

  const handleOnClick = (e) => {
    const border = cutImageRef.current;
    // get the borders of the image
    const b = border.getBoundingClientRect();
    // get y
    const height = squareRef.current.clientHeight;
    const top = e.clientY - height / 2;
    const bottom = e.clientY + height / 2;
    // create a square
    const square = document.createElement('div');
    square.className = styles.square2;
    square.style.top = y - height - height / 2 + 'px';
    square.style.left = 0;
    square.style.width = '100%';
    square.style.height = height + 'px';
    square.style.position = 'absolute';
    square.style.backgroundColor = '#fff';
    // add the square to the image
    cutImageRef.current.appendChild(square);
  };
  return (
    <>
      <div className={styles.cover}>
        <div className={styles.coverWrapperImage}>
          <div
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={cutImageRef}
            className={styles.cutImage}></div>
          <div
            ref={squareRef}
            onMouseOver={() => setHovered(true)}
            onClick={(e) => handleOnClick(e)}
            className={styles.square}></div>

          <img
            className={styles.coverImg}
            src="https://images.unsplash.com/photo-1560931296-2dccce3dcf2d"
          />
          <Button
            className={styles.addCoverPhoto}
            type="primary"
            icon={<CameraFilled />}
            size="small">
            Add Cover Photo
          </Button>
        </div>
        <div className={styles['profile-section']}>
          <div className={styles['profile-img']}>
            <img src={userCtx.user.profilePic} style={{ objectFit: 'none' }} />
          </div>
          <div className={styles['profile-infos']}>
            <h1 className={styles['profile-fullname']}>{userCtx?.user?.username}</h1>
            <div className={styles['profile-info']}>
              <span>
                Just one guy who are thrilled for the idea of being an secret keeper for everyone
              </span>
            </div>
          </div>
        </div>
      </div>

      <Row align="middle" justify="center" style={{ marginTop: '10px', marginLeft: '190px' }}>
        <Col span={18}>
          <div>
            <Tag color="magenta">day dreamer</Tag>
            <Tag color="volcano">guitarist</Tag>
            <Tag color="gold">cat lover</Tag>
            <Tag color="geekblue">fascinated by stars</Tag>
          </div>
          <Row className={styles.feed} align="middle">
            <Col span={24} className={styles.stats}>
              <Row align="middle">
                <Col span={18}>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Card size="small" className={[styles.card, styles.likeCard].join(' ')}>
                        <div>
                          <LikeTwoTone twoToneColor={'#52c41a'} style={{ fontSize: '32px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h3 style={{ margin: ' 0 0 0 15px' }}>
                            <b>3</b> likes
                          </h3>
                        </div>
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card size="small" className={[styles.card, styles.dislikeCard].join(' ')}>
                        <div>
                          <DislikeTwoTone twoToneColor={'#ff4d4f'} style={{ fontSize: '32px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h3 style={{ margin: ' 0 0 0 15px' }}>
                            <b>13</b> dislikes
                          </h3>
                        </div>
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card
                        size="small"
                        className={[styles.card, styles.lastActivityCard].join(' ')}>
                        <div>
                          <NotificationTwoTone
                            twoToneColor={'#ffb84d'}
                            style={{ fontSize: '32px' }}
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h3 style={{ margin: ' 0 0 0 15px' }}>
                            <b>7</b> day ago
                          </h3>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

function Index() {
  return <Overlay Content={Content}></Overlay>;
}

export default Index;
