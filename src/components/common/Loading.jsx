import React, { useState } from 'react';
import { Button, Flex } from 'antd';
const Loading = () => {
  const [loadings, setLoadings] = useState([]);
  const enterLoading = index => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };
  return (
    <Flex gap="small" vertical>
      <Flex gap="small" wrap>
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
         Delete
        </Button>
      </Flex>
    </Flex>
  );
};
export default Loading;