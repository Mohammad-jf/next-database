import { useEffect, useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState('');
  const [email, setEmail] = useState('');

  const getUsers = async () => {
    const res = await fetch('/api/data');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // post request
  const sendHandler = async () => {
    const res = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setName('');
    console.log(data);
    getUsers();
  };

  // get user details
  const detailsHandler = async (id) => {
    const res = await fetch(`/api/data/${id}`);
    const data = await res.json();
    console.log(data);
  };

  // patch handler
  const patchHandler = async (user) => {
    const res = await fetch(`/api/data/${user._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setEdit('');
    console.log(data);
    getUsers();
  };

  // delete request
  const deleteHandler = async (id) => {
    const res = await fetch(`/api/data/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log(data);
    getUsers();
  };

  // edit user data
  const editHandler = (user) => {
    setEdit(user._id);
    setEmail(user.email);
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

      <br />
      <br />

      <div>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <div>
                <h3>{user.name}</h3>
                <h4>{user.email}</h4>

                <button onClick={() => detailsHandler(user._id)}>
                  log user details
                </button>

                <button onClick={() => editHandler(user)}>Edit</button>
                <button onClick={() => deleteHandler(user._id)}>Delete</button>

                {edit && edit === user._id ? (
                  <div>
                    <input
                      type='email'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={() => patchHandler(user)}>Save</button>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
