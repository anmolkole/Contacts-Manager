import React from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useParams, useNavigate } from 'react-router';
import '../css/ContactDetails.css'


const ContactDetails = ({ contacts }) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const contact = contacts.find((contact) => contact.id === id);

    if (!contact) {
        return <div>Contact not Found.</div>;
    }

    return (
        <div className='contact-details-container' >
            <h2>Contact Details</h2>
            <FaRegCircleUser className='FaregCircleUser' />
            <div className='Contact-info' >
                <p><strong>Name :</strong> {contact.name}</p>
                <p><strong>Email :</strong> {contact.email}</p>
            </div>
            <button onClick={() => navigate("/")} >Back to Contacts List</button>
        </div>
    )
}

export default ContactDetails;