import { shuffleArray } from './helpers';
import {Entry} from "@/types/Entry";

describe('shuffleArray function', () => {
    it('returns a new array with the same length as the original array', () => {
        const originalArray: Entry[] = [
            { id: 1, questionSet: 1, type: 'question', text: 'Question 1', isCorrect: false },
            { id: 2, questionSet: 1, type: 'answer', text: 'Answer 1', isCorrect: true },
            { id: 3, questionSet: 2, type: 'question', text: 'Question 2', isCorrect: false },
            { id: 4, questionSet: 2, type: 'answer', text: 'Answer 2', isCorrect: true },
        ];
        const shuffledArray = shuffleArray(originalArray);
        expect(shuffledArray.length).toBe(originalArray.length);
    });

    it('returns a new array with the same elements as the original array, but in a different order', () => {
        const originalArray: Entry[] = [
            { id: 1, questionSet: 1, type: 'question', text: 'Question 1', isCorrect: false },
            { id: 2, questionSet: 1, type: 'answer', text: 'Answer 1', isCorrect: true },
            { id: 3, questionSet: 2, type: 'question', text: 'Question 2', isCorrect: false },
            { id: 4, questionSet: 2, type: 'answer', text: 'Answer 2', isCorrect: true },
        ];
        const shuffledArray = shuffleArray(originalArray);
        expect(shuffledArray).not.toEqual(originalArray);
        expect(shuffledArray).toEqual(expect.arrayContaining(originalArray));
    });

    it('does not modify the original array', () => {
        const originalArray: Entry[] = [
            { id: 1, questionSet: 1, type: 'question', text: 'Question 1', isCorrect: false },
            { id: 2, questionSet: 1, type: 'answer', text: 'Answer 1', isCorrect: true },
            { id: 3, questionSet: 2, type: 'question', text: 'Question 2', isCorrect: false },
            { id: 4, questionSet: 2, type: 'answer', text: 'Answer 2', isCorrect: true },
        ];
        const shuffledArray = shuffleArray(originalArray);
        expect(originalArray).toEqual([
            { id: 1, questionSet: 1, type: 'question', text: 'Question 1', isCorrect: false },
            { id: 2, questionSet: 1, type: 'answer', text: 'Answer 1', isCorrect: true },
            { id: 3, questionSet: 2, type: 'question', text: 'Question 2', isCorrect: false },
            { id: 4, questionSet: 2, type: 'answer', text: 'Answer 2', isCorrect: true },
        ]);
    });

    it('works with an empty array', () => {
        const originalArray: Entry[] = [];
        const shuffledArray = shuffleArray(originalArray);
        expect(shuffledArray).toEqual([]);
    });

    it('works with an array of a single element', () => {
        const originalArray: Entry[] = [{ id: 1, questionSet: 1, type: 'question', text: 'Question 1', isCorrect: false }];
        const shuffledArray = shuffleArray(originalArray);
        expect(shuffledArray).toEqual([{ id: 1, questionSet: 1, type: 'question', text: 'Question 1', isCorrect: false }]);
    });
});