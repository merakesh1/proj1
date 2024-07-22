import React, { useContext } from 'react';
import { AuthContext } from '../App';

const Home = () => {
  const obj = useContext(AuthContext);
  return (
    <>
      <h1>Welcome to my website</h1>
      {obj?.user ? (
        <h3>Welcome {obj.user}</h3>
      ) : (
        <h3>Please login or register to continue..</h3>
      )}
    </>
  );
};
export default Home;
