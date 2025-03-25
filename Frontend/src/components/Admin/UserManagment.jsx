import React, { useEffect, useState } from 'react'
import { useDispatch,  useSelector } from "react-redux"
import { addUser, deleteUser, fetchAdminUsers, updateUser } from '../../redux/slices/adminSlice';
import {useNavigate} from 'react-router-dom'
const UserManagment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { user } = useSelector(store => store.auth);
    const { users, loading, error } = useSelector(store => store.admin);
   
    useEffect(() => {
        if (user && user.role !== "admin") {
            navigate("/");
        }
    }, [dispatch, navigate, user])

    useEffect(()=>{

         if(user && user.role ==="admin"){
            dispatch(fetchAdminUsers())
         }
    },[dispatch, user, navigate])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer" //Default role

    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e?.target?.name]: e?.target?.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData))
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer"
        })
    }
    const handleDeleteUser = (userID) => {
        if (window?.confirm("Are you sure want to delete this user?")) {
    
            dispatch(deleteUser(userID));
        }
    }
    const handleRoleChange = (userID, newRole) => {
        // Find the user to get name and email
        const user = users.find(u => u._id === userID);
        if (user) {
            dispatch(updateUser({ id: userID, name: user.name, email: user.email, role: newRole }));
         
        }
    };
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-4'>
                User Management
            </h2>


            {loading && <p className='text-green-500 text-center'>Loading........</p>}
            {error && <p className='text-red-500 text-center'>Error {error}</p>}

            {/* Add new user */}
            <div className='p-6 rounded-lg mb-6'>
                <h3 className='text-lg font-bold mb-4'>Add New Users</h3>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-900'>Name</label>
                        <input type="text" name="name" value={formData?.name} onChange={handleChange} className='w-full p-2 border rounded' required />


                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-900'>Email</label>
                        <input type="text" name="email" value={formData?.email} onChange={handleChange} className='w-full p-2 border rounded' required />


                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-900'>Password</label>
                        <input type="password" name="password" value={formData?.password} onChange={handleChange} className='w-full p-2 border rounded' required />


                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-900'>Role</label>
                        <select type="text" name="role" value={formData?.role} onChange={handleChange} className='w-full p-2 border rounded' >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>


                    </div>
                    <button type="submit " className='bg-gray-800 px-3 py-2   text-white rounded hover:bg-green-700'>
                        ADD USER
                    </button>
                </form>
            </div>

            {/* User List Managment */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg ">
                <table className='min-w-full text-left text-gray-800'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-800'>
                        <tr>
                            <th className='py-3 px-4'>Name</th>
                            <th className='py-3 px-4'>Email</th>
                            <th className='py-3 px-4'>Role</th>
                            <th className='py-3 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user) => {
                                     return  <tr key={user?._id} className='border-b hover:bg-gray-50'>
                                    <td className='p-4 font-medium text-gray white-spaces-nowrap'>
                                        {user?.name}
                                    </td>
                                    <td className='p-4'>
                                        {user?.email}
                                    </td>
                                    <td className='p-4'>
                                        <select value={user?.role} onChange={(e) => handleRoleChange(user?._id, e?.target?.value)} className='p-2 border-2 rounded'>
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className='p-4'>
                                        {user?.email}
                                    </td>
                                    <td className="p-4">
                                        <button className='bg-red-900 text-white rounded-md px-2 py-1' onClick={() => handleDeleteUser(user._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserManagment