import { Injectable } from '@angular/core';
import { generalSourceText, letterDominantSourceTexts } from '../shared/source-texts';
import { forbiddenWords, fullAlphabet } from '../shared/utils';

@Injectable({
    providedIn: 'root'
})
export class WordsService {

    constructor() { }

    /**
     * Takes an array of allowed alphabets and a number for maximum word length, and returns an array of words created using markov text generation. 
     * Takes a hard coded text as source text. Can be found in `utils.ts` 
     * @param allowedAlphabets an array of characters that are allowed (['b', 'e', 'r'])
     * @param maxLength the maximum possible length of single word
     * @param weakAlphabet the weakest alphabet of the user. If provided, the source text will be generated using the general source text + the source text of the weakest alphabet
     * @returns array of words
     */
    public generateWords(allowedAlphabets: string[], maxLength = 6, weakAlphabet?: string) {
        let alphabets: string[] = [];
        if (weakAlphabet && fullAlphabet.includes(weakAlphabet)) {
            alphabets = (generalSourceText + letterDominantSourceTexts[weakAlphabet]).split('');
        } else {
            alphabets = generalSourceText.split('');
        }
        const markovChain: any = {};
        const words: string[] = [];
        let totalLength: number = 0;

        for (let i = 0; i < alphabets.length; i++) {
            let currentLetter = alphabets[i];
            let nextLetter = alphabets[i + 1] || '';
            if (!markovChain[currentLetter]) markovChain[currentLetter] = [];
            markovChain[currentLetter].push(nextLetter);
        }

        do {
            let word = '';
            let currentLetter =
                allowedAlphabets[Math.floor(Math.random() * allowedAlphabets.length)];
            while (
                currentLetter !== '' &&
                word.length < maxLength &&
                allowedAlphabets.includes(currentLetter)
            ) {
                word += currentLetter;
                currentLetter =
                    markovChain[currentLetter][
                    Math.floor(Math.random() * markovChain[currentLetter].length)
                    ];
            }
            if (word.length >= 3 && word !== words?.[words.length - 1] && forbiddenWords?.[word] !== true && !this.hasThreeConsecutiveLettersFromSameAlphabet(word)) {
                words.push(word);
                totalLength += word.length + 1;
            }
        } while ((totalLength <= 36));

        return words;
    }

    /**
     *  Returns true if word has three or more consecutive letters from the same alphabet 
    */
    public hasThreeConsecutiveLettersFromSameAlphabet(word: string): boolean {
        const alphabets = word.split('').reduce((acc: any, letter: string) => {
            if (!acc[letter]) acc[letter] = 0;
            acc[letter]++;
            return acc;
        }, {});

        return (Object.values(alphabets) as any[]).some((count: number) => (count >= 3) ? true : false);
    }
}
