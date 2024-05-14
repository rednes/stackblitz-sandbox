import './style.css';

import { type JSX, useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

function App(): JSX.Element {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${API_URL}/posts`);
      const result = await response.json();
      setPosts(result);
    };
    fetchApi();
  }, []);

  return (
    <>
      <h1>Sample Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any, i: number) => (
            <tr key={i}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Original JSON</h2>
        <pre>{JSON.stringify(posts, null, 4)}</pre>
      </div>
    </>
  );
}

export default App;
