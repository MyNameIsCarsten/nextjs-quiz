export type Entry = {
    id: number;
    questionSet: number,
    type: 'answer' | 'question';
    text: string;
    isCorrect: boolean;
}