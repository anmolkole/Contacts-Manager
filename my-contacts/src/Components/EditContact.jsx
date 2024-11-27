import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../css/EditContact.css';

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null); // Local state for the contact

  useEffect(() => {
    // Find the contact by ID
    const foundContact = contacts.find((contact) => contact.id === id);

    if (foundContact) {
      setContact(foundContact); // Set local state if contact is found
    } 
  }, [contacts, id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (contact?.name && contact?.email) {
      updateContact(contact); // Update contact using the provided function
      navigate("/"); // Navigate back to the contact list
    } else {
      alert("All fields are mandatory.");
    }
  };

  if (!contact) {
    return <p>Loading contact details...</p>; // Show loading state if contact is null
  }

  return (
    <div className="edit-contact-container">
      <h2>Edit Contact</h2>
      <form onSubmit={handleUpdate}>
        <div className="field">
          <label>Name</label>
          <br />
          <input
            type="text"
            value={contact.name}
            onChange={(e) =>
              setContact((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="field">
          <label>Email</label>
          <br />
          <input
            type="email"
            value={contact.email}
            onChange={(e) =>
              setContact((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <button type="submit">Update Contact</button>
      </form>
    </div>
  );
};

export default EditContact;
