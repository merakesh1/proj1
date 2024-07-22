import React, { useState } from 'react';
import './Assets.css';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post('/user/register', { username, password });
      if (response.data.user) {
        navigate('/login');
      }
    } catch (error) {
      alert(error.response.data.message);
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
                  <h2 className='text-uppercase text-center mb-5'>
                    Create an account
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div
                      className='form-outline mb-5 w-75'
                      style={{
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <label
                        className='form-label mx-2'
                        htmlFor='form3Example1cg'
                        style={{
                          fontSize: '19px',
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                        }}
                      >
                        Username
                      </label>
                      <input
                        type='text'
                        id='form3Example1cg'
                        className='form-control form-control-md text-center'
                        placeholder='Enter your username'
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div
                      className='form-outline mb-5 w-75'
                      style={{
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <label
                        className='form-label mx-2'
                        htmlFor='form3Example2cg'
                        style={{
                          fontSize: '19px',
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                        }}
                      >
                        Password
                      </label>
                      <input
                        type='password'
                        id='form3Example2cg'
                        className='form-control form-control-md text-center'
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className='form-check d-flex justify-content-center mb-5'>
                      <input
                        className='form-check-input me-2'
                        type='checkbox'
                        value=''
                        id='form2Example3cg'
                      />
                      <label
                        className='form-check-label'
                        htmlFor='form2Example3g'
                      >
                        I agree all statements in{' '}
                        <a href='#!' className='text-body'>
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <button
                        type='submit'
                        className='btn btn-success btn-block btn-lg gradient-custom-4 text-body'
                        style={{ width: '420px' }}
                      >
                        Register
                      </button>
                    </div>
                    <p className='text-center text-muted mt-5 mb-0'>
                      Have already an account?{' '}
                      <Link to='/login' className='fw-bold text-body'>
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
