import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');

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
    console.log(data);
  };

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

      <div>
        <button onClick={getUsers}>get useers</button>
      </div>
    </>
  );
}
