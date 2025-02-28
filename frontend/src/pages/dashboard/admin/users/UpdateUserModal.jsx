import React, { useState } from 'react';
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi';
import Swal from 'sweetalert2';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user.role);
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateRole = async () => {
        setIsLoading(true);  
        try {
            await updateUserRole({ userId: user?._id, role }).unwrap();
            Swal.fire('Success', 'Updated role successfully!', 'success');
            onRoleUpdate();  // Refetch the users after updating role
            onClose();
        } catch (error) {
            console.error("Failed to update user role", error);
            Swal.fire('Error', 'Failed to update the role, please try again.', 'error');
        } finally {
            setIsLoading(false);  
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
            <div className='bg-white p-4 rounded shadow-lg w-1/3'>
                <h2 className='text-xl mb-4'>Edit User Role</h2>
                <div className='mb-4 space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className='mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-5 focus:outline-none'
                    />
                </div>
                <div className='mb-4 space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='block w-full shadow-sm sm:text-sm bg-gray-100 border-gray-300 rounded-md py-2.5 px-5 focus:outline-none'
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className='flex justify-end pt-5'>
                    <button 
                        onClick={onClose}
                        className="bg-primary text-white px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleUpdateRole}
                        className={`bg-indigo-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading} 
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
