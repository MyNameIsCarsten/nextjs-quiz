import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    try {
        if (req.method === "GET") {
            // Fetch the entry
            const entry = await prisma.entry.findUnique({
                where: { id: parseInt(id as string, 10) },
            });

            if (!entry) {
                return res.status(404).json({ error: "Question not found" });
            }

            return res.status(200).json(entry);
        }

        if (req.method === "PATCH") {
            const { text, isCorrect } = req.body;

            if (!text) {
                return res.status(400).json({ error: "Text is required" });
            }

            const updatedEntry = await prisma.entry.update({
                where: { id: parseInt(id as string, 10) },
                data: { text, isCorrect },
            });

            return res.status(200).json(updatedEntry);
        }

        if (req.method === "DELETE") {
            // Delete the question by its ID
            await prisma.entry.delete({
                where: { id: parseInt(id as string, 10) },
            });

            return res.status(200).json({ message: "Question deleted successfully" });
        }

        if (req.method === "POST") {
            const { text, type, questionSet, isCorrect } = req.body;

            try {
                const newEntry = await prisma.entry.create({
                    data: { text, type, questionSet, isCorrect },
                });
                return res.status(201).json(newEntry);
            } catch (error) {
                console.error("Error creating entry:", error);
                return res.status(500).json({ error: "Failed to create entry" });
            }
        }

        res.setHeader("Allow", ["GET", "PATCH", "DELETE", "POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error("Error in API route:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
