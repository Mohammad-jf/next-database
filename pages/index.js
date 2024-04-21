import { useEffect, useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const sendHandler = async () => {
    const res = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setName('');
    console.log(data);
  };


  const getUsers = async () => {
    const res = await fetch('/api/data');
    const data = await res.json();
    setUsers(data)
  };

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <h1>connecting DataBase to Next js project</h1>

      <br />
      <br />
      <br />
      <br />

      <div>
        <input
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <button onClick={sendHandler}>Send Data</button>
      </div>


      <br />
      <br />

      <div>
        <ul>
          {users.map((user) => <li key={user._id}>{user.name}</li>)}
        </ul>
      </div>
    </>
  );
}
