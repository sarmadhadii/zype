import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChildFn } from "@angular/router";
import { IConfidence } from "../interfaces/confidence";
import { IUser } from "../interfaces/user";
import { AuthService } from "../services/auth.service";

export const recursiveDeepCopy: any = (o: any) => {
    let newO: any, i: any;

    if (typeof o !== 'object') {
        return o;
    }
    if (!o) {
        return o;
    }

    if ('[object Array]' === Object.prototype.toString.apply(o)) {
        newO = [];
        for (i = 0; i < o.length; i += 1) {
            newO[i] = recursiveDeepCopy(o[i]);
        }
        return newO;
    }

    newO = {};
    for (i in o) {
        if (o.hasOwnProperty(i) && !i.startsWith('__')) {
            newO[i] = recursiveDeepCopy(o[i]);
        }
    }
    return newO;
};

export const dummyUser: IUser = {
    _id: 'dummy-id-for-now',
    email: 'sarmadhadi10@gmail.com',
    username: 'sarmadhadi',
    analytics: {
        averageSpeed: 32,
        played: 50,
        scores: [],
        letterConfidences: {}
    }
};

export const generateConfidences = (allowedAlphabets: string[]) => {
    const obj: { [key: string]: IConfidence } = {};
    const alphabets = 'etaoinsrhldcwypgvkbmzfuxjq';
    for (let i = 0; i < alphabets.length; i++) {
        obj[alphabets[i]] = {
            successfulAttempts: 0,
            allowed: allowedAlphabets.includes(alphabets[i]) ? true : false,
            attemptedAmount: 0
        }
    }
    return obj;
}

export const generateNewUser = (email: string, username: string, uid: string): IUser => {
    return <IUser>{
        email: email,
        username: username,
        _id: uid,
        analytics: {
            averageSpeed: 0,
            played: 0,
            scores: [],
            letterConfidences: generateConfidences(startingLetters)
        }
    }
}

export const canActivate: CanActivateFn = () => {
    const authService = inject(AuthService);
    return authService.isLoggedInForRoutes();
};

export const toTwoDecimalPlaces = (num: number): number => {
    return (Math.round(num * 100) / 100);
}

export const toPercentage = (num: number): number => {
    return (Math.round(num * 100));
}

export const isAuthenticated: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);

export const fullAlphabet: string = 'etaoinsrhldcwypgvkbmzfuxjq';

export const startingLetters: string[] = ['e', 't', 'a', 'o', 'i', 'n'];

export const forbiddenWords: { [key: string]: boolean } = {
    'bbbe': true,
    'ooo': true,
    'tit': true,
};