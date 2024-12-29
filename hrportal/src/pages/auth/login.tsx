import React from 'react';
import backgroundImage from '../../assets/loginhr.jpg';
import LoginForm from '../../components/loginForm';

const Login: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden', // Prevents scrolling
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1, // Ensures background is behind other elements
        }}
      />

      {/* Login Form */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', // Aligns the form to the left
          height: '100%',
          paddingLeft: '5vw', // Adjust spacing from the left edge
          width: '100%', // Ensures the container spans the full width
        }}
      >
        <div style={{ maxWidth: '500px', width: '100%' }}>
          {/* Ensures the form has a defined width */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
