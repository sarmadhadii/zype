import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChildFn } from "@angular/router";
import { IConfidence } from "../interfaces/confidence";
import { IUser } from "../interfaces/user";
import { AuthService } from "../services/auth.service";

export const sourceText = `
    The sun was shining brightly in the sky. Birds were chirping and flying around. Children were playing in the park and having fun. It was a beautiful day.
    Jane walked to the store to buy some groceries. She needed milk, bread, and eggs for breakfast. The store was busy but she found everything she needed quickly. She paid for her groceries and walked back home. A zebra and extra jeeps. 
    
    Markov chains are a simple way to generate text that looks like it was written by humans. To use Markov chains, we need to have a lot of similar documents. Simple Markov chains are the building blocks of other, more advanced techniques.

    To generate text with Markov chains, we need to decide what our states will be and what probabilities we will assign to jumping from one state to another. We can use a character-based model or a word-based model. In a character-based model, we define our state as the last n characters we’ve seen and try to predict the next one. In a word-based model, we define our state as the last n words we’ve seen and try to predict the next one. We can choose which type of model to use.
    
    I live in a house near the mountains. I have two brothers and one sister, and I was born last. My father teaches mathematics, and my mother is a nurse at a big hospital. My brothers are very smart and work hard in school. My sister is a nervous girl, but she is very kind. My grandmother also lives with us. She came from Italy when I was two years old. She has grown old, but she is still very strong. She cooks the best food!

    My family is very important to me. We do lots of things together. My brothers and I like to go on long walks in the mountains. My sister likes to cook with my grandmother. On the weekends we all play board games together. We laugh and always have a good time. I love my family very much.

    I just returned from the greatest summer vacation! It was so fantastic, I never wanted it to end. I spent eight days in Paris, France. My best friends, Henry and Steve, went with me. We had a beautiful hotel room in the Latin Quarter, and it wasn’t even expensive. We had a balcony with a wonderful view.

    We visited many famous tourist places. My favorite was the Louvre, a well-known museum. I was always interested in art, so that was a special treat for me. The museum is so huge, you could spend weeks there. Henry got tired walking around the museum and said “Enough! I need to take a break and rest.”

    We took lots of breaks and sat in cafes along the river Seine. The French food we ate was delicious. The wines were tasty, too. Steve’s favorite part of the vacation was the hotel breakfast. He said he would be happy if he could eat croissants like those forever. We had so much fun that we’re already talking about our next vacation.
`;

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
    id: 'dummy-id-for-now',
    email: 'sarmadhadi10@gmail.com',
    username: 'sarmadhadi',
    analytics: {
        averageSpeed: 32,
        played: 50,
        scores: [],
        letterConfidences: {}
    }
};

export const generateConfidences = () => {
    const obj: { [key: string]: IConfidence } = {};
    const alphabets = 'etaoinsrhldcwypgvkbmzfuxjq';
    for (let i = 0; i < alphabets.length; i++) {
        obj[alphabets[i]] = {
            successfulAttempts: 0, 
            allowed: (i <= 5) ? true : false,
            attemptedAmount: 0
        }
    }
    return obj;
}

export const generateNewUser = (email: string, username: string, uid: string): IUser => {
    return <IUser>{
        email: email,
        username: username,
        id: uid,
        analytics: {
            averageSpeed: 0,
            played: 0,
            scores: [],
            letterConfidences: generateConfidences()
        }
    }
}

export const canActivate: CanActivateFn = () => {
    const authService = inject(AuthService);
    return authService.isLoggedInForRoutes();
  };
  
export const isAuthenticated: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);

export const fullAlphabet: string = 'abcdefghijklmnopqrstuvwxyz';