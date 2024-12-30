import React from 'react';
import Container from '../../components/Container'; // Import the Container component

const Home: React.FC = () => {
  return (
    <Container >
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </Container>
  );
};

export default Home;
