import { Empty, Spin } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import mongoDb from '../../helpers/MongoDB';
import dynamic from 'next/dynamic';

const Overlay = dynamic(() => import('../../components/Overlay'));
const Secrets = dynamic(() => import('../../components/Dashboard/Secrets'));
function RandomSecret({ data }) {
  return (
    <Overlay>
      <Spin spinning={false}>
        {data && (
          <div style={{ marginTop: '1rem' }}>
            {data?.length > 0 ? <Secrets data={data} /> : <Empty />}
          </div>
        )}
      </Spin>
    </Overlay>
  );
}

RandomSecret.propTypes = {
  data: PropTypes.object.isRequired
};

RandomSecret.defaultProps = {
  data: {}
};

export async function getServerSideProps(context) {
  const collection = await mongoDb.getCollection('SECRETS');
  try {
    const result = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
    if (!result)
      return {
        props: {
          data: {}
        }
      };

    return {
      props: {
        data: JSON.parse(JSON.stringify(result))
      }
    };
  } catch (error) {
    console.log('random-secret, 42', error);
    return {
      props: {
        data: {}
      }
    };
  }
}

export default RandomSecret;
