import { firebaseAuth } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';

export default async function authSignIn(email: string, password: string) {
    let result: UserCredential | null = null,
        error = null;

    try {
        result = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
    } catch (e) {
        error = e;
    }

    return { result, error };
}