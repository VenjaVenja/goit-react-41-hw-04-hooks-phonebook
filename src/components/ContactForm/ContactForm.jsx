import { useState } from 'react';
import { Form, Label, Text, Input, AddContactBtn } from './ContactForm.styled';
import propTypes from 'prop-types';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const heandleInputNameChange = (event) => {
    const { value } = event.currentTarget;
    setName(value);
  };

  const heandleInputNumberChange = (event) => {
    const { value } = event.currentTarget;
    setNumber(value);
  }

  const heandleSubmit = event => {
    event.preventDefault();
    onSubmit({name, number})
    formFieldsReset()
  };

  const formFieldsReset = () => {
    setName('');
    setNumber('')
  };

  return (
    <>
      <Form onSubmit={heandleSubmit}>
        <Label>
          <Text>Name</Text>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={heandleInputNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder='Full name'
          />
        </Label>

        <Label>
          <Text>Phone</Text>
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={heandleInputNumberChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder='+XX-(XXX)-XXX-XX-XX'
          />
        </Label>
        <AddContactBtn type="submit">Add contact</AddContactBtn>
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
};