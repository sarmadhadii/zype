import { IUser } from '../interfaces/user';
import { dummyUser, generateConfidences } from '../shared/utils';

export const wordsServiceStub = {
    sourceText: 'stubbed source text',
    generateWords() {
        return [
          'apple', 'banana', 'cherry', 'dog', 'elephant', 'frank', 'grape', 'hat', 'internet', 'jazz', 'kite', 'lemon', 'mango', 'notebook', 'orange', 'peach', 'queen', 'rabbit', 'strawberry', 'tree']
    }
  }
  
