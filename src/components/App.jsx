import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { SectionWraper } from "./Section/Section";

export const App = () => {

  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const lsContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(lsContacts);

    parsedContacts ? setContacts(parsedContacts) : setContacts(contacts)
  },[])
  
  useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])
  

  const heandleAddContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

      contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : setContacts(prevContacts => [...prevContacts, newContact])
  };

  const heandleChangeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value)
  };

  const filteredContactList = () => {
    const normilizValue = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizValue))
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => prevContacts.filter(
    contact => contact.id !== contactId)
    );
  };

  return (
      <SectionWraper>
        <h1>Phonebook</h1>
        <ContactForm
        onSubmit={heandleAddContact}/>
        
        <h2>Contacts</h2>
        {contacts.length > 0 && <Filter
          value={filter}
        onChangeFilter={heandleChangeFilter} />}
      
        {contacts.length > 0 ? (<ContactList
          contacts={filteredContactList()}
          onDeleteContact={deleteContact} />)
         : alert `Contact list is empty`
          }
      </SectionWraper>
    )
}