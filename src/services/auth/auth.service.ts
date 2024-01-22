import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";


export const signIn = async (email: string, password: string) => {
    const auth = getAuth()

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            console.log(error);
            throw new Error('Invalid Credentials')
        });

}
export const signUp = async (email: string, password: string) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(error.message.toString())
        });
}