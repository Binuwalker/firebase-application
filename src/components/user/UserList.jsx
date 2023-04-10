import React, { useEffect, useState } from 'react';
import { firebaseData } from '../../firebase/config';
import Loading from '../plugins/Loading';
import '../user/style.css';
import AddUser from './AddUser';
import { onSnapshot, query, collection, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const q = query(collection(firebaseData, 'users'));

const UserList = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [success, setSuccess] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const [userDataValue, setUserDataValue] = useState();
  const [snap, setSnap] = useState();

  const [modalShow, setModalShow] = useState(false);
  const [updatemodalShow, setUpdateModalShow] = useState(false);
  const [viewmodalShow, setViewModalShow] = useState();
  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();

  const [dataLoaded, setDataLoaded] = useState();
  const [userDatas, setUserDatas] = useState();

  const handleDeleteReq = (id) => {
    confirmAlert({
      title: 'Deleting Confirmation',
      message: 'Are you sure to Delete this User?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id),
          style: { backgroundColor: '#f00', fontWeight: '680', border: '2px solid #000' }
        },
        {
          label: 'No',
          style: {color: '#000', backgroundColor: '#ffffff', fontWeight: '680', border: '2px solid #000' }
        },
      ]
    });
  };

  const handleDelete = (id) => {
    deleteDoc(doc(firebaseData, 'users', id));
    setAlert(true);
    setAlertMsg('User Deleted Successfully');
    if (alert) {
      toast.success(alertMsg, {
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
        setAlert(false)
      }, 1000)
    }
  }

  const handleView = async (id) => {
    setViewModalShow(true)
    const userDocRef = doc(firebaseData, "users", id);
    setSnap(await getDoc(userDocRef));
  }

  const handleUpdate = async (id) => {
    setUpdateModalShow(true);
    setUserId(id);
    const userDocRef = doc(firebaseData, "users", id);
    setSnap(await getDoc(userDocRef));
  }

  const handleUpdateForm = (e) => {
    e.preventDefault()
    const docRef = doc(firebaseData, "users", userId);
    if (username || email || phonenumber || age || country) {
      setError(false)
      const data = {
        username,
        email,
        phonenumber,
        age,
        country
      }
      updateDoc(docRef, data)
      setSuccess(true)
      setSuccessMsg('User Updated Successfully');
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
    setUserDataValue(snap)
    if (userDataValue) {
      setUserData(userDataValue.data());
    }
    setDataLoaded(false)
    onSnapshot(q, (snapshot) => {
      setUserDatas(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })));
    })

  }, [userDatas, userDataValue, snap])

  console.log(snap);
  console.log(userData);
  console.log(userDataValue);

  useEffect(() => {
    if (alert) {
      toast.info(alertMsg, {
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
        setAlert(false)
      }, 1000)
    }
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
      toast.info(successMsg, {
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
  }, [alert, alertMsg, error, errorMsg, success, successMsg])

  return (
    <>
      {dataLoaded ? (
        <Loading />
      ) : (
        <div className='userList'>
          <div className='container'>
            <button className='addUser-btn' onClick={() => setModalShow(true)}>ADD USER</button>
            <AddUser
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <div className='userList-container'>
              {userDatas &&
                userDatas.map(userData => (
                  <div className='userList-data-container' key={userData.id}>
                    <div className='container'>
                      <div><span className='user-key'>User Name:</span><span className='user-value-data'> {userData.item.username}</span></div>
                      <div><span className='user-key'>Email:</span><span className='user-value-data'> {userData.item.email}</span></div>
                      <div><span className='user-key'>Phone Number:</span><span className='user-value-data'> {userData.item.phonenumber}</span></div>
                      <div><span className='user-key'>Age:</span><span className='user-value-data'> {userData.item.age}</span></div>
                      <div><span className='user-key'>Country:</span><span className='user-value-data'> {userData.item.country}</span></div>
                      <div><span className='user-key'>Created At:</span><span className='user-value-data'> {userData.item.createdAt}</span></div>
                      <button onClick={() => handleView(userData.id)} className='userView-btn'>View</button>
                      <button onClick={() => handleUpdate(userData.id)} className='userUpdate-btn'>Update</button>
                      <button onClick={() => handleDeleteReq(userData.id)} className='userDelete-btn'>Delete</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <Modal
            show={updatemodalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setUpdateModalShow(false)}
          >
            <Modal.Body>
              <form onSubmit={handleUpdateForm}>
                <input className='user-input' placeholder='UserName...' onChange={e => setUsername(e.target.value)} />
                <input className='user-input' placeholder='Email...' onChange={e => setEmail(e.target.value)} />
                <input className='user-input' placeholder='PhoneNumber...' onChange={e => setPhonenumber(e.target.value)} />
                <input className='user-input' placeholder='Age...' onChange={e => setAge(e.target.value)} />
                <input className='user-input' placeholder='Country...' onChange={e => setCountry(e.target.value)} />
                <button className='submit-btn' type='submit' onClick={() => setUpdateModalShow(false)}>UPDATE</button>
              </form>
            </Modal.Body>
          </Modal >
          <Modal
            show={viewmodalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setViewModalShow(false)}
          >
            <Modal.Body>
              <div>
                {userData ? (
                  <div>
                    <div><span className='user-key-onView'>User Name:</span><span className='user-value'> {userData.username}</span></div>
                    <div><span className='user-key-onView'>Email:</span><span className='user-value'> {userData.email}</span></div>
                    <div><span className='user-key-onView'>Phone Number:</span><span className='user-value'> {userData.phonenumber}</span></div>
                    <div><span className='user-key-onView'>Age:</span><span className='user-value'> {userData.age}</span></div>
                    <div><span className='user-key-onView'>Country:</span><span className='user-value'> {userData.country}</span></div>
                    <div><span className='user-key-onView'>Created At:</span><span className='user-value'> {userData.createdAt}</span></div>
                  </div>
                ) :
                  <Loading />
                }
              </div>
            </Modal.Body>
          </Modal >
          <ToastContainer />
        </div>
      )}
    </>
  )
}

export default UserList;