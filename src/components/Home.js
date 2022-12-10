import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = ({name, _id}) => {
        const agree = window.confirm(`Are you sure you want to delete ${name}`);
        console.log(agree);
        if (!!agree) {
            // console.log('deleting user with id:', _id);
            fetch(`http://localhost:5000/users/${_id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0) {
                    toast.success('User Deleted Successfully');
                    const remaining = displayUsers.filter(user => user._id !== _id);
                    setDisplayUsers(remaining);
                }
                
            })
            .catch(err => console.error(err));
        }
    }

    return (
        <div>
            <h2>Users: {displayUsers.length}</h2>
            <div>
                {
                    displayUsers.map(user => <p key={user._id}>
                        {user.name} : {user.email}  
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDelete(user)}
                        >X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Home;