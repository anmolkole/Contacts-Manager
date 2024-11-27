import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../css/AddContact.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const AddContact = ({ addContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email) {
      const newContact = {
        id: uuidv4(),
        name: name,
        email: email,
      };

      // Pass the new contact to the parent component
      addContact(newContact);

      // Reset form
      setName('');
      setEmail('');
      navigate('/');
    } else {
      alert('All fields are mandatory');
    }
  };

  return (
    <div className='container'>
      <div className='add-contact-header'>
        <h2 className='add-contact-heading'>Add Contact</h2>
        <Link to="/">
          <button className='view-all-contacts-btn'>View All Contacts</button>
        </Link>

      </div>

      <form className='form' onSubmit={handleSubmit}>
        <div className='field'>
          <label>Name</label>
          <br />
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label><br />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className='add-btn'>Add</button>

      </form>
    </div>
  );
};

export default AddContact;
