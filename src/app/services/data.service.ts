import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { CollectionReference, getFirestore } from 'firebase/firestore';
import { IUser } from '../interfaces/user';
import { generateNewUser } from '../shared/utils';
import * as firebase from 'firebase/compat';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    constructor() {}

    public getUserFromUsername(username: string): Promise<boolean> {
        return new Promise(async(resolve, reject) => {
            const userQuery = query(collection(getFirestore(), 'users'), where('username', '==', username));
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
            getDoc(doc(collection(getFirestore(), 'users'), `u-${uid}`)).then(userData => {
                resolve(userData ? userData.data() as IUser : null);
            }).catch(err => reject(err));
        })
    }

    public updateUser(user: IUser): Promise<boolean> {
        const docRef = doc(collection(getFirestore(), 'users'), `u-${user.id}`);
        return new Promise((resolve, reject) => {
            updateDoc(docRef, { analytics: user.analytics }).then(() => {
                resolve(true);
            }).catch(err => reject(err));
        })
    }

    public updateUserAnalytics(user: IUser): Promise<boolean> {
        const docRef = doc(collection(getFirestore(), 'users'), `u-${user.id}`);
        return new Promise((resolve, reject) => {
            updateDoc(docRef, { analytics: user.analytics }).then(() => {
                resolve(true);
            }).catch(err => reject(err));
        })
    }

    public createUserDoc(email: string, username: string, uid: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            const newUser: IUser = generateNewUser(email, username, uid);
            setDoc(doc(collection(getFirestore(), 'users'), `u-${uid}`), newUser).then(() => {
                resolve(newUser);
            }).catch(err => reject(err));
        })
    }
}
