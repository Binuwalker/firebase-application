import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { firebaseData } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = (props) => {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [age, setAge] = useState();
  const [country, setCountry] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [success, setSuccess] = useState();
  const [successMsg, setSuccessMsg] = useState();

  let getDateValue = new Date();
  let getMonth = getDateValue.getMonth() + 1
  let currentDate = getDateValue.getDate() + '/' + getMonth + '/' + getDateValue.getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username || email || phonenumber || age || country) {
      setError(false)
      addDoc(collection(firebaseData, 'users'), {
        username,
        email,
        phonenumber,
        age,
        country,
        createdAt
      })
      setSuccess(true)
      setSuccessMsg('User Added Successfully');
      setUsername(null);
      setEmail(null);
      setPhonenumber(null);
      setAge(null);
      setCountry(null);
    } else if (!username || !email || !phonenumber || !age || !country) {
      setSuccess(false);
      setError(true);
      setErrorMsg('Please enter all the Values');
    }
  }

  useEffect(() => {
    setCreatedAt(currentDate);
    if (error) {
      toast.error(errorMsg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      setTimeout(() => {
        setError(false)
      }, 1000)
    } else if (success) {
      toast.success(successMsg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        setSuccess(false)
      }, 1000)
    }
  }, [currentDate, error, errorMsg, success, successMsg])

  return (
    <>
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
      </Modal >
    </>
  )
}

export default AddUser;