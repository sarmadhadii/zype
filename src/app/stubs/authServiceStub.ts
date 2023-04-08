import { BehaviorSubject, of } from 'rxjs';

export const authServiceStub = {
  loggedInUser$: new BehaviorSubject<any>(null),
  usersCollection: null,

  signUp: (email: string, password: string, username: string) => {
    return of();
  },

  signIn: (email: string, password: string) => {
    return of();
  },

  createAndReturnNewUser: (email: string, password: string, username: string) => {
    return of();
  },

  isLoggedInForRoutes: () => {
    return false;
  }
};
