import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

const NavBar = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <a className='navbar-brand mx-3' href='/'>
          Cotton Application <span>{auth.user ? '- ' + auth.user : ''}</span>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarNav'
          style={{ position: 'absolute', right: 20 }}
        >
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>
                Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/dashboard'>
                Dashboard
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/login'>
                Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/register'>
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
