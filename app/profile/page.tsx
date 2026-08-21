import {requireUser } from '@/lib/auth';
import {Button} from '@/components/ui/button'
import { logoutUser } from '@/actions/auth';
 
async function ProfilePage() {

    const user = await requireUser();

    if(!user) return <div>وارد نشدید</div>


    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold'>
                سلام {user.name}
            </h1>
            <p>{user.email}</p>

            <p>Role : {user.role}</p>

            <form action={logoutUser}>
                <Button type='submit'>
                    خروج
                </Button>
                
            </form>
        </div>
    );
}

export default ProfilePage;