import React, { useState } from 'react';

const ButtonComponent = () => {
  const [welcomeMessage, setWelcomeMessage] = useState(null);
  const [stocks, setStocks] = useState(null);
  const [postResponse, setPostResponse] = useState(null);

  const handleGetWelcomeMessage = async () => {
    console.log('Fetching welcome message...');
    try {
      const data = await fetchData('/');
      setWelcomeMessage(data);
    } catch (error) {
      console.error('Error fetching welcome message:', error);
    }
  };

  const handleGetStocks = async () => {
    console.log('Fetching stocks...');
    try {
      const data = await fetchData('/stocks');
      setStocks(data);
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
      setPostResponse(data);
    } catch (error) {
      console.error('Error posting stock:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGetWelcomeMessage}>Fetch Welcome Message</button>
      <button onClick={handleGetStocks}>Fetch Stocks</button>
      <button onClick={handlePostStock}>Post Stock</button>

      {welcomeMessage && (
        <div>
          <h2>Welcome Message</h2>
          <pre>{JSON.stringify(welcomeMessage, null, 2)}</pre>
        </div>
      )}

      {stocks && (
        <div>
          <h2>Stocks</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Symbol</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.price}</td>
                  <td>{stock.symbol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {postResponse && (
        <div>
          <h2>Post Stock Response</h2>
          <pre>{JSON.stringify(postResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ButtonComponent;