import React from 'react';
//import backgroundImage from '../../assets/loginhr.jpg'; 
import LoginForm from '../../components/loginForm';
import './login.css'; // Import custom CSS file

const Login: React.FC = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background */}
      <div className="login-background" />
      
      {/* Login Form */}
      <div className="login-container">
        <div className="login-form-wrapper">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
