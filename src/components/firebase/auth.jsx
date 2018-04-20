import { auth } from './firebase';

//Sign Up
export const CreateUser = (email, password) => 
    auth.createUserWithEmailAndPassword(email, password);

//Sign In
export const UserSignIn = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

//Sign Out
export const SignOut = () =>
    auth.signOut();

//Password Reset
export const ResetPassword = (email) => 
    auth.sendPasswordResetEmail(email);

export const PasswordResetUpdate = (password) =>
    auth.currentUser.updatePassword(password);