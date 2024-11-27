import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";
import '../index.css';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from '../api/contacts';


function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  // Load contacts from localStorage on initial load

  // const savedContacts = localStorage.getItem('contacts');
  // if (savedContacts) {
  //   setContacts(JSON.parse(savedContacts));
  // }

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) {
        setContacts(allContacts);
      }
    };
    getAllContacts();
  }, []);

  // Function to add a contact
  const addContact = async (newContact) => {

    const request = {
      id: uuidv4(),
      ...newContact,
    };

    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data]);

    //const updatedContacts = [...contacts, newContact];
    //localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // Save to localStorage
  };

  const updateContact = async (updatedContact) => {
    try {
      const response = await api.put(`/contacts/${updatedContact.id}`, updatedContact);
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === updatedContact.id ? response.data : contact
        )
      );
      //navigate("/"); // Redirect to the contact list 
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  // Function to delete a contact
  const deleteContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    //localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // Save to localStorage
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContatList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });
      setSearchResults(newContatList);
    } else {
      setSearchResults(contacts);
    }
  };

  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<ContactList
            contacts={searchTerm.length < 1 ? contacts : searchResults}
            deleteContact={deleteContact}
            term={searchTerm}
            searchKeyWord={searchHandler}
          />} />
          <Route path="/add" element={<AddContact addContact={addContact} />} />
          <Route path="/contact/:id" element={<ContactDetails contacts={contacts} />} />
          <Route path="/edit/:id" element={<EditContact contacts={contacts} updateContact={updateContact} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
