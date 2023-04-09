import { IUser } from '../interfaces/user';
import { dummyUser, generateConfidences } from '../shared/utils';

export const userServiceStub = {
  user: dummyUser,
  alphabets: 'etaoinsrhldcwypgvkbmzfuxjq',
  init() {
    this.user.analytics.letterConfidences = generateConfidences();
  },
  getAllowedAlphabets() {
    const allowedAlphabets: string[] = [];
    for (let i = 0; i < this.alphabets.length; i++) {
      if (this.user?.analytics?.letterConfidences?.[this?.alphabets?.[i]]?.allowed) {
        allowedAlphabets.push(this.alphabets[i]);
      }
    }
    return allowedAlphabets;
  },
};
