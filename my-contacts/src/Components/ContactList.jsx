import React, { useRef } from 'react'
import '../css/ContactList.css';
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";

const ContactList = ({ contacts, deleteContact, term, searchKeyWord }) => {

  const inputEl = useRef("");

  const getSearchTerm = () => {
      searchKeyWord(inputEl.current.value);
  }

  return (
    <div className='contact-list-container'>
      <div className='contact-list-header'>
        <h3 className='contact-list-heading' >Contact List</h3>
        <Link to="/add" >
          <button className='add-contact-btn'>Add New Contacts</button>
        </Link>
      </div>
      <div className="input-container">
        <input
          ref={inputEl}
          type="text"
          placeholder="Search Contacts"
          className="input-with-right-icon"
          value={term}
          onChange={getSearchTerm}
        />
        <i className="icon fa fa-user"> <FiSearch /> </i>
      </div>

      {contacts.length === 0 ? (
        <p className='empty-message'>No contacts available. Add some!</p>
      ) : (
        contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))
      )}
    </div>
  )
}

export default ContactList;