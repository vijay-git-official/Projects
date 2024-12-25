import { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        fetchData();
    }, []);


    // Fetching Data
    const fetchData = async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
    };


    //Filter Logic
    const handleClick = () => {
        const filtered = users.filter(user => (
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        ));
        setFilteredUsers(filtered);
    };

    return (
        <div className='p-4 bg-violet-400'>
            {/* Search Section */}
            <div className='mt-5 flex flex-col sm:flex-row sm:items-center sm:space-x-2'>
                <input
                    type="text"
                    placeholder='Search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='p-2 rounded-lg bg-black text-white w-full sm:w-64'
                />
                <button
                    onClick={handleClick}
                    className='p-2 bg-red-500 rounded-lg mt-2 sm:mt-0 w-full sm:w-auto'>
                    Search
                </button>
            </div>

          
            <h2 className='text-2xl sm:text-3xl font-bold mt-5 text-center sm:text-left'>User List</h2>

            {/* User List */}
            <ul className='mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredUsers.map((user) => (
                    <li className='p-4 mt-6 border border-b-gray-900 rounded-sm' key={user.id}>
                        <p className='font-bold text-lg sm:text-xl'>Name: {user.name}</p>
                        <p className='text-sm sm:text-base'>Email: {user.email}</p>
                        <p className='text-sm sm:text-base'>Company Name: {user.company.name}</p>
                        <p className='text-sm sm:text-base'>Website: {user.website}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default User;
