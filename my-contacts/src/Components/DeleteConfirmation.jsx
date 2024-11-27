import React from 'react';
import '../css/DeleteConfirmation.css';

const DeleteConfirmation = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn confirm-btn" onClick={onConfirm}>Yes</button>
          <button className="btn cancel-btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;