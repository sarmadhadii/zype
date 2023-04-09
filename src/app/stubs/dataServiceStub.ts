import { of } from 'rxjs';

export const dataServiceStub = {
    getUserFromUsername: (username: string) => {
      return of(false);
    },
  
    getUserFromUid: (uid: string) => {
      return of(null);
    },
  
    createUserDoc: (email: string, username: string, uid: string) => {
      return of({
        email: email,
        username: username,
        uid: uid
      });
    }
  };
  