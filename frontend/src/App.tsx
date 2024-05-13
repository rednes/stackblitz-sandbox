import './App.css';

import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${API_URL}posts`);
      const result = await response.json();
      setPosts(result);
    };
    fetchApi();
  }, []);

  return (
    <>
      <div>{JSON.stringify(posts)}</div>
    </>
  );
}

export default App;
