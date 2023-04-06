import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { CollectionReference, getFirestore } from 'firebase/firestore';
import { IUser } from '../interfaces/user';
import { generateNewUser } from '../shared/utils';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private database: Firestore;
    private usersCollection: CollectionReference;

    constructor(
        public firestore: Firestore,
    ) { 
        this.database = getFirestore();
        this.usersCollection = collection(this.firestore, 'users');
    }

    public getUserFromUsername(username: string): Promise<boolean> {
        return new Promise(async(resolve, reject) => {
            const userQuery = query(collection(this.database, 'users'), where('username', '==', username));
            try {
                const userExists = await getDocs(userQuery);
                resolve(userExists.empty ? false : true);
            } catch(err) {
                reject(err);
            }
        })
    }

    public getUserFromUid(uid: string): Promise<IUser | null> {
        return new Promise((resolve, reject) => {
            getDoc(doc(this.usersCollection, `u-${uid}`)).then(userData => {
                resolve(userData ? userData.data() as IUser : null);
            }).catch(err => reject(err));
        })
    }

    public createUserDoc(email: string, username: string, uid: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            const newUser: IUser = generateNewUser(email, username, uid);
            setDoc(doc(collection(this.database, 'users'), `u-${uid}`), newUser).then(() => {
                resolve(newUser);
            }).catch(err => reject(err));
        })
    }
}
