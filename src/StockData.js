import React, { useEffect, useState } from 'react';

const StockData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://172.233.35.175')
    //http://stock-backend.stock-analysis.svc.cluster.local/stocks // Uppdatera URL:en till din backend-tjänst
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Stock Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default StockData;