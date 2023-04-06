import React, { useEffect, useState } from 'react';
import { firebaseData } from '../../firebase/config';
import Loading from '../plugins/Loading';
import '../user/style.css';
import { HiTrash } from 'react-icons/hi';
import { GrEdit } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import AddUser from './AddUser';
import { onSnapshot, query, collection, deleteDoc, doc } from 'firebase/firestore';

const q = query(collection(firebaseData, 'users'))

const UserList = () => {

  const [modalShow, setModalShow] = useState(false);

  const [dataLoaded, setDataLoaded] = useState();
  const [userDatas, setUserDatas] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setDataLoaded(false)
    onSnapshot(q, (snapshot) => {
      setUserDatas(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })));
    })
  }, [userDatas])

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
                      <div className='action-icons-container'><div className='icon'></div><HiTrash className='trash-icon' onClick={() => deleteDoc(doc(firebaseData, 'users', userData.id))} /></div>
                      <div><span className='user-key'>User Name:</span><span className='user-value'> {userData.item.username}</span></div>
                      <div><span className='user-key'>Email:</span><span className='user-value'> {userData.item.email}</span></div>
                      <div><span className='user-key'>Phone Number:</span><span className='user-value'> {userData.item.phonenumber}</span></div>
                      <div><span className='user-key'>Age:</span><span className='user-value'> {userData.item.age}</span></div>
                      <div><span className='user-key'>Country:</span><span className='user-value'> {userData.item.country}</span></div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            {error}
          </div>
        </div>
      )}
    </>
  )
}

export default UserList;