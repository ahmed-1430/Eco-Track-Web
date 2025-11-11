import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-8 min-h-screen">
      <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
