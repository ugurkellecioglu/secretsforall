import { Spin } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import mongoDb from '../../helpers/MongoDB';
import Secrets from '../dashboard/Secrets';
import dynamic from 'next/dynamic';

const Overlay = dynamic(() => import('../../components/Overlay'));
function RandomSecret({ data }) {
  return (
    <Overlay>
      <Spin spinning={false}>{data && <Secrets data={data} />}</Spin>
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
  const db = await mongoDb.getDB(mongoDb.dbNames.SECRETSFORALL);
  const collection = db.collection(mongoDb.collections.SECRETS);
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
