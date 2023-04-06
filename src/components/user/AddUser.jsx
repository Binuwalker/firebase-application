import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { firebaseData } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const AddUser = (props) => {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [age, setAge] = useState();
  const [country, setCountry] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username || email || phonenumber || age || country) {
      addDoc(collection(firebaseData, 'users'), {
        username,
        email,
        phonenumber,
        age,
        country
      })
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input className='user-input' placeholder='UserName...' onChange={e => setUsername(e.target.value)} />
          <input className='user-input' placeholder='Email...' onChange={e => setEmail(e.target.value)} />
          <input className='user-input' placeholder='PhoneNumber...' onChange={e => setPhonenumber(e.target.value)} />
          <input className='user-input' placeholder='Age...' onChange={e => setAge(e.target.value)} />
          <input className='user-input' placeholder='Country...' onChange={e => setCountry(e.target.value)} />
          <button className='submit-btn' type='submit' onClick={props.onHide}>SUBMIT</button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AddUser;