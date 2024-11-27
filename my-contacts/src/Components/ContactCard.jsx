import React, { useState } from 'react'
import '../css/ContactCard.css';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaRegCircleUser } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';

const ContactCard = ({ contact, deleteContact }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleDelete = () => {
    setIsModalOpen(true);
  }

  const handleConfirmDelete = () => {
    deleteContact(contact.id);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = () => {
    navigate(`/contact/${contact.id}`); // Navigate to the contact details page
  };

  return (
    <>
      <div className='details-container' onClick={handleCardClick} >
        <div className='content'>
          <i className='user-icon'><FaRegCircleUser /></i>
          <div >
            <div className='content-header-name' >{contact.name}</div>
            <div className='content-header-email'>{contact.email}</div>
          </div>
        </div>
        <div>

          {/*Edit Button */}
          <Link to={`/edit/${contact.id}`}>
            <i className="edit-icon" onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the navigation
            }}>
              <FaEdit />
            </i>
          </Link>

          {/*Delete Button */}
          <i className="delete-icon" onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the navigation
          }}>
            <FaRegTrashAlt onClick={handleDelete} />
          </i>
        </div>

      </div>
      <DeleteConfirmation
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={`Are you sure you want to delete ${contact.name}?`}
      />
    </>
  )
}

export default ContactCard;