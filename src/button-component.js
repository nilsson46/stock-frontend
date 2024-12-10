import React from 'react';

const backendUrl = 'http://172.233.36.167';

const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${backendUrl}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

const ButtonComponent = () => {
  const handleGetWelcomeMessage = async () => {
    console.log('Fetching welcome message...');
    try {
      const data = await fetchData('/');
      console.log('Welcome Message:', data);
    } catch (error) {
      console.error('Error fetching welcome message:', error);
    }
  };

  const handleGetStocks = async () => {
    console.log('Fetching stocks...');
    try {
      const data = await fetchData('/stocks');
      console.log('Stocks:', data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const handlePostStock = async () => {
    console.log('Posting stock...');
    try {
      const data = await fetchData('/addstock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Apple',
          price: 150.00,
          symbol: 'AAPL',
        }),
      });
      console.log('Post Stock Response:', data);
    } catch (error) {
      console.error('Error posting stock:', error);
    }
  };

  return (
    <div>
      <h1>API Tester 2.0</h1>
      <h1>API Tester 2.0</h1>
      <h1>API Tester 2.0</h1>
      <button onClick={handleGetWelcomeMessage}>Get Welcome Message</button>
      <button onClick={handleGetStocks}>Get Stocks</button>
      <button onClick={handlePostStock}>Post Stock</button>
    </div>
  );
};

export default ButtonComponent;