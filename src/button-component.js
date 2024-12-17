import React,{useState} from 'react';

const backendUrl = 'http://172.233.35.175';
//Senaste http://172.233.35.175
//näst senaste: http://172.233.36.167

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
    const [welcomeMessage, setWelcomeMessage] = useState(null);
    const [stocks, setStocks] = useState(null);
    const [postResponse, setPostResponse] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [symbol, setSymbol] = useState('');

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
            name,
            price: parseFloat(price),
            symbol,
          }),
        });
        setPostResponse(data);
      } catch (error) {
        console.error('Error posting stock:', error);
      }
    };
  
    return (
      <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={handleGetWelcomeMessage}>Fetch Welcome Message</button>
      <button onClick={handleGetStocks}>Fetch Stocks</button>
      <button onClick={handlePostStock}>Post Stock</button>

      {welcomeMessage && (
        <div>
          <h2>Welcome Message</h2>
          <p>{welcomeMessage.message}</p>
        </div>
      )}

      {stocks.length > 0 && (
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
          <p>{postResponse.message}</p>
        </div>
      )}
    </div>
  );
};

export default ButtonComponent;