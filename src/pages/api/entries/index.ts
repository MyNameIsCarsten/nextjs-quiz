import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            // Fetch todos from the database
            const entries = await prisma.entry.findMany();
            return res.status(200).json(entries);
        }

        if (req.method === 'POST') {
            // Check if the payload is valid
            const { type, isCorrect, text, questionSet } = req.body;

            // Validate the payload
            if (!type) {
                return res.status(400).json({ error: 'Type is required.' });
            }

            if (type !== 'answer' && type !== 'question') {
                return res.status(400).json({ error: 'Type can only be "answer" or "question"' });
            }

            if (typeof isCorrect !== 'boolean') {
                return res.status(400).json({ error: 'isCorrect can only be a boolean value.' });
            }

            if (typeof text !== 'string') {
                return res.status(400).json({ error: 'Text can only be a string value.' });
            }

            if (typeof questionSet !== 'number') {
                return res.status(400).json({ error: 'QuestionSet can only be a number value.' });
            }


            // Create a new entry
            const entry = await prisma.entry.create({
                data: { type, isCorrect, text, questionSet },
            });
            return res.status(201).json(entry);
        }

        if (req.method === "DELETE") {
            const { questionSet } = req.body;

            if (questionSet === undefined) {
                return res.status(400).json({ error: "questionSet is required" });
            }

            try {
                // Delete all entries with the given questionSet
                await prisma.entry.deleteMany({
                    where: { questionSet },
                });

                return res.status(200).json({ message: "Question set deleted successfully" });
            } catch (error) {
                console.error("Error deleting question set:", error);
                return res.status(500).json({ error: "Failed to delete question set" });
            }
        }

        // Handle unsupported methods
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    } catch (error) {
        // Improved error handling
        console.error('Error in API route:', error);

        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }
}