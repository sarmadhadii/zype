import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { generateNewUser } from '../shared/utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    private readonly _apiUrl = 'https://zype-backend.onrender.com';

    constructor(private http: HttpClient) {}

    public getUserFromUsername(username: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.get<IUser>(`${this._apiUrl}/getUserByUsername/${username}`).subscribe({
                next: user => {
                    user ? resolve(true) : resolve(false);
                }, 
                error: err => reject(err)
            })
        })
    }

    public getUserFromUid(uid: string): Promise<IUser | null> {
        return new Promise((resolve, reject) => {
            this.http.get<IUser>(`${this._apiUrl}/getUserById/${uid}`).subscribe({
                next: user => resolve(user),
                error: err => reject(err)
            });
        });
    }

    public updateUser(user: IUser): Promise<void> {
        return new Promise((resolve, reject) => {
            this.http.post(`${this._apiUrl}/updateUser`, user).subscribe({
                next: () => resolve(),
                error: err => reject(err)
            });
        });
    }

    public updateUserAnalytics(user: IUser): Promise<void> {
        return new Promise((resolve, reject) => {
            this.http.post(`${this._apiUrl}/updateUserAnalytics`, user).subscribe({
                next: () => resolve(),
                error: err => reject(err)
            });
        });
    }

    public createUserDoc(email: string, username: string, uid: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            const newUser: IUser = generateNewUser(email, username, uid);
            this.http.post(`${this._apiUrl}/createUser`, newUser).subscribe({
                next: () => resolve(newUser),
                error: err => reject(err)
            });
        })
    }
}
