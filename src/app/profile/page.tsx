'use client';

import { useAuthContext } from '@/firebase/auth/state';
import AuthButtons from '@/firebase/auth/components/authButtons';
import UserProfile from '@/components/profile/userProfile';

export default function Profile() {
    const { user } = useAuthContext();
    console.log(user?.email);

    return (
        <div>
            <AuthButtons />
            {user?.email && <UserProfile id={user.email} />}
        </div>
    );
}
