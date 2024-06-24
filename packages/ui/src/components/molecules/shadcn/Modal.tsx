import React from 'react';

const Modal = ({ children, onClose }: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-background  p-6 rounded-lg shadow-lg relative ">
        <button
          className="absolute text-4xl top-[1px] right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;