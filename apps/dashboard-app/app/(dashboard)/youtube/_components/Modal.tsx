import React from 'react';

const Modal = ({ show, onClose, children }:any) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-background rounded-lg p-4 relative">
        <button className="absolute top-1 right-1" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
