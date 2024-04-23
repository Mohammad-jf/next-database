import User from '@/models/User';
import connectDb from '@/utils/connectDb';
import React from 'react';

const SSR = ({ users }) => {
    return <div>
        <ul>
            {users.map((user) => (
                <li key={user._id}>
                    <h3>{user.name}</h3>
                    <h4>{user.email}</h4>
                </li>
            ))}
        </ul>
    </div>;
};

export default SSR;

export async function getServerSideProps() {
    try {
        // connect to db
        await connectDb();
        const users = await User.find();
        if (users.length) {
            return {
                props: { users: JSON.parse(JSON.stringify(users)) },
            };
        } else {
            return {
                props: { users: [] },
            };
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
        return;
    }
}
