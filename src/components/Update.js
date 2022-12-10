import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

    const {name, address, email} = storedUser;

    const handleUpdateUser = (e) => {
        e.preventDefault();
        // console.log(user);

        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.modifiedCount > 0) {
                toast.success("User Successfully Updated");
            }
        })
        .catch(err => console.error(err));
    }

    const handleInputChange = (e) => {
        const field = e.target.name;        // key
        const value = e.target.value;       // value
        const newUser = { ...user };
        newUser[field] = value;     // key: value
        setUser(newUser);
    }

    return (
        <div>
            <h2>Please Update: {storedUser.name}</h2>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} type="text" name='name' placeholder='name' defaultValue={name} required />
                <br />
                <input onChange={handleInputChange} type="text" name='address' placeholder='address' defaultValue={address} required />
                <br />
                <input onChange={handleInputChange} type="email" name="email" placeholder='email' defaultValue={email} required />
                <br />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default Update;