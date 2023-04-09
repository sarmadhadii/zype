import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { IUser } from '../interfaces/user';
import { UserService } from './user.service';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { FirebaseApp } from '@angular/fire/app';



@Injectable({
    providedIn: 'root',
})
export class AuthService {

    public loggedInUser$ = new BehaviorSubject<any>(null);

    constructor(
        public userService: UserService,
        public dataService: DataService,
        public loaderService: LoaderService,
        public router: Router,
        public firebaseApp: FirebaseApp,
        public firebaseAuth: Auth
    ) {
    }
    
    public initUserChecking(): void {
        user(getAuth()).subscribe(value => {
            if (!value) {
                this.router.navigateByUrl('/login')
            } else {
                this.loggedInUser$.next(value);
                if (value.uid) {
                    this.dataService.getUserFromUid(value.uid).then(user => {
                        if (user) {
                            this.userService.user = user;
                            this.router.navigateByUrl('/')
                        }
                    }).catch(err => console.error(err));
                }
            }
        });
    }

    public signUp(email: string, password: string, username: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.dataService.getUserFromUsername(username).then((userExists) => {
                if (userExists) {
                    reject(new Error("Username is taken"));
                } else {
                    this.createAndReturnNewUser(email, password, username).then(user => {
                        this.userService.user = user;
                        resolve();
                    }).catch(err => {
                        deleteUser(getAuth().currentUser!).finally(() => reject(err))
                    });
                }
            }).catch(err => reject(err));
        })

    }

    public signIn(email: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(getAuth(), email, password).then((user) => {
                this.dataService.getUserFromUid(user.user.uid).then((user) => {
                    if (user) {
                        this.userService.user = user;
                    }
                    resolve();
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        });
    }

    public createAndReturnNewUser(email: string, password: string, username: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(getAuth(), email, password).then(user => {
                this.dataService.createUserDoc(email, username, user.user.uid).then(user => {
                    resolve(user);
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        })
    }

    public isLoggedInForRoutes(): boolean {
        return this.loggedInUser$.getValue() ? true : false;
    }
}
