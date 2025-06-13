import React from 'react';
import { GridLoader } from 'react-spinners';

const LoadingSpinner = () => {

  return (
    <div className="w-full h-screen flex justify-center items-center">
    <GridLoader color="#FDE300"  />
    </div>
  );
};

export default LoadingSpinner;
