import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const AddUser = () => {
    const [user, setUser] = useState({});

    const handleAddUser = (e) => {
        e.preventDefault();
        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!!data.acknowledged) {
                    toast.success("User Successfully added");
                    e.target.reset();   // clears the form
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
            <h2>Please add a new User</h2>
            <form onSubmit={handleAddUser}>
                <input onChange={handleInputChange} type="text" name='name' placeholder='name' required />
                <br />
                <input onChange={handleInputChange} type="text" name='address' placeholder='address' required />
                <br />
                <input onChange={handleInputChange} type="email" name="email" placeholder='email' required />
                <br />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;