import { getCurrentUser } from '@/lib/auth';
import React from 'react';

async function ProfilePage() {

    const user = await getCurrentUser();

    if(!user) return <div>وارد نشدید</div>


    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold'>
                سلام {user.name}
            </h1>
            <p>{user.email}</p>

            <p>Role : {user.role}</p>
        </div>
    );
}

export default ProfilePage;