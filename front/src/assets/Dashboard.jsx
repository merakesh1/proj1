import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../App';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const response = await api.get('/user/getPosts');
      setMessages(response.data.messages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }

  async function handlePost(e) {
    e.preventDefault();
    try {
      await api.post('/user/setPost', { message: newMessage });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout() {
    try {
      await api.post('/user/logout');
      setUser(null); // Clear user context
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className='vh-100'>
      <div className='mask d-flex align-items-center h-100 gradient-custom-3'>
        <div className='container-sm h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-12 col-md-9 col-lg-7 col-xl-6'>
              <div className='card' style={{ borderRadius: '15px' }}>
                <div className='card-body p-5'>
                  <h2 className='text-uppercase text-center mb-5'>Dashboard</h2>
                  <button
                    onClick={handleLogout}
                    className='btn btn-danger mb-4'
                  >
                    Logout
                  </button>
                  <form onSubmit={handlePost} className='mb-4'>
                    <div className='form-group'>
                      <textarea
                        className='form-control'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        required
                        rows='3'
                        placeholder='Write your message here'
                      ></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary mt-2'>
                      Post
                    </button>
                  </form>
                  <ul className='list-group'>
                    {messages.map((message, index) => (
                      <li key={index} className='list-group-item'>
                        <strong>{message.user}:</strong> {message.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
