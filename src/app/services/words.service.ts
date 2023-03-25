import { Injectable } from '@angular/core';
import { sourceText } from '../shared/utils';

@Injectable({
    providedIn: 'root'
})
export class WordsService {

    public sourceText = sourceText;

    constructor() { }

    /**
     * Takes an array of allowed alphabets and a number for maximum word length, and returns an array of words created using markov text generation. 
     * Takes a hard coded text as source text. Can be found in `utils.ts` 
     * @param allowedAlphabets an array of characters that are allowed (['b', 'e', 'r'])
     * @param maxLength the maximum possible length of single word
     * @param numberOfWords number of words to return
     * @returns array of words
     */
    public generateWords(allowedAlphabets: string[], maxLength = 6) {
        const alphabets = this.sourceText.split('');
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
            if (word.length >= 3) {
                words.push(word);
                totalLength += word.length + 1;
            }
        } while ((totalLength <= 40));

        return words;
    }
}
