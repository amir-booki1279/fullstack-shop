import { requireAdmin } from '@/lib/auth';
import React from 'react';

async function AdminPage() {

    const user = await requireAdmin();

    if(!user) return <div>وارد نشدید</div>


    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold'>
               بنل مدیریت
            </h1>
            <p> خوش امدی{user.email}</p>

           
        </div>
    );
}

export default AdminPage;