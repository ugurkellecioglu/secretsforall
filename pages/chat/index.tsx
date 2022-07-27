import { SendOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row } from 'antd';
import Link from 'next/link';
const { TextArea } = Input;
import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import Overlay from '../../components/Overlay';
import { UserContext } from '../../context/UserContext';
import axios from '../../helpers/axios';
import dayjs from '../../helpers/dayjs';
import styles from './styles.module.scss';
interface IMsg {
  user: string;
  msg: string;
  createdAt: string;
}

// component
const Index: React.FC = () => {
  const inputRef = useRef(null);
  const soundRef = useRef(null);
  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>('');
  const { user } = useContext(UserContext);
  useEffect((): any => {
    // connect to socket server
    const socket = io(process.env.API_URL, {
      path: '/api/socketio'
    });

    // log socket connection
    socket.on('connect', () => {
      console.log('SOCKET CONNECTED!', socket.id);
      setConnected(true);
      axios.get('/api/chat').then((res) => {
        setChat(res.data);
        // scroll to the bottom
        console.log('inputref', inputRef.current);
        inputRef?.current?.focus();
      });
    });

    // update chat on new message dispatched
    socket.on('message', (message: IMsg) => {
      setChat((prevChat) => [...prevChat, message]);
      // play sound
      soundRef.current.play();
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      // build message obj
      const message: IMsg = {
        user: user.username,
        msg,
        createdAt: new Date().toString()
      };

      const resp = await axios.post('/api/chat', message);
      // reset field if OK
      if (resp.status === 201) {
        setMsg('');
      }
    }

    // focus after click
    inputRef?.current?.focus();
  };

  return (
    <Overlay>
      <div className={styles.wrapper}>
        <Row justify="center">
          <Col xl={16} sm={24} xs={24}>
            <Card title="Chat" bordered={false}>
              <Row justify="center" className={styles.msgRow}>
                <Col xl={22} lg={20} md={18} span={24}>
                  {!connected ? (
                    <div>
                      <p>Connecting...</p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        Connected,{' '}
                        <span>
                          <b>{user.username}</b>
                        </span>{' '}
                      </p>
                    </div>
                  )}
                  {chat.length ? (
                    chat.map((chat, i) => (
                      <div key={'msg_' + i}>
                        <p style={chat.user === user.username ? { textAlign: 'end' } : {}}>
                          <span>
                            <span style={{ fontWeight: 'bold' }}>
                              {chat.user === user.username ? (
                                'Me'
                              ) : (
                                <Link href={`/profile/${chat.user}`}>{chat.user}</Link>
                              )}
                            </span>
                            : {chat.msg}
                          </span>
                          <div style={{ fontWeight: 'lighter', fontSize: '10px' }}>
                            {dayjs(new Date(chat.createdAt)).fromNow()}
                          </div>
                        </p>
                      </div>
                    ))
                  ) : (
                    <div>No chat messages</div>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={16} sm={24} xs={24} className={styles.msgRow}>
            <TextArea
              ref={inputRef}
              type="text"
              disabled={!connected}
              placeholder="Type your message here"
              className={styles.textArea}
              value={msg}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <Button
              type="primary"
              className={styles.sendBtn}
              disabled={!connected}
              onClick={sendMessage}
              icon={<SendOutlined />}
            />
          </Col>
        </Row>
        <audio ref={soundRef}>
          <source src="notification.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </Overlay>
  );
};

export default Index;
