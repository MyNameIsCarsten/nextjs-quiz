import handler from "@/pages/api/entries/[id]"; // Update path as per your file structure
import { createMocks } from "node-mocks-http";
import prisma from "../../../lib/prisma";

jest.mock("../../../lib/prisma", () => ({
    entry: {
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        create: jest.fn(),
    },
}));

describe("API Handler [id]", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 400 if id is missing in quetry ", async () => {
        const { req, res } = createMocks({
            method: "GET",
            body: { isCorrect: true },
        });
        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toEqual({ error: "Invalid ID" });
    });

    describe("GET method", () => {
        it("should fetch an entry by ID", async () => {
            const entry = { id: 1, text: "Sample question", type: "question" };
            //@ts-ignore
            jest.spyOn(prisma.entry, "findUnique").mockResolvedValue(entry);

            const { req, res } = createMocks({ method: "GET", query: { id: "1" } });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(JSON.parse(res._getData())).toEqual(entry);
            expect(prisma.entry.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
        });

        it("should return 404 if entry not found", async () => {
            jest.spyOn(prisma.entry, "findUnique").mockResolvedValue(null);

            const { req, res } = createMocks({ method: "GET", query: { id: "1" } });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(404);
            expect(JSON.parse(res._getData())).toEqual({ error: "Question not found" });
        });

        it("should return 400 for invalid ID", async () => {
            const { req, res } = createMocks({ method: "GET", query: { id: [] } });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(400);
            expect(JSON.parse(res._getData())).toEqual({ error: "Invalid ID" });
        });
    });

    describe("PATCH method", () => {
        it("should update an entry by ID", async () => {
            const updatedEntry = { id: 1, text: "Updated question", isCorrect: true };
            //@ts-ignore
            jest.spyOn(prisma.entry, "update").mockResolvedValue(updatedEntry);

            const { req, res } = createMocks({
                method: "PATCH",
                query: { id: "1" },
                body: { text: "Updated question", isCorrect: true },
            });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(JSON.parse(res._getData())).toEqual(updatedEntry);
            expect(prisma.entry.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { text: "Updated question", isCorrect: true },
            });
        });

        it("should return 400 if text is missing", async () => {
            const { req, res } = createMocks({
                method: "PATCH",
                query: { id: "1" },
                body: { isCorrect: true },
            });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(400);
            expect(JSON.parse(res._getData())).toEqual({ error: "Text is required" });
        });
    });

    describe("DELETE method", () => {
        it("should delete an entry by ID", async () => {
            //@ts-ignore
            jest.spyOn(prisma.entry, "delete").mockResolvedValue({});

            const { req, res } = createMocks({ method: "DELETE", query: { id: "1" } });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(JSON.parse(res._getData())).toEqual({ message: "Question deleted successfully" });
            expect(prisma.entry.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });

    describe("POST method", () => {
        it("should create a new entry", async () => {
            const newEntry = { id: 1, text: "New question", type: "question", isCorrect: true, questionSet: 1 };
            jest.spyOn(prisma.entry, "create").mockResolvedValue(newEntry);

            const { req, res } = createMocks({
                method: "POST",
                body: { text: "New question", type: "question", isCorrect: true, questionSet: 1 },
                query: { id: "1" },
            });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(201);
            expect(JSON.parse(res._getData())).toEqual(newEntry);
            expect(prisma.entry.create).toHaveBeenCalledWith({
                data: { text: "New question", type: "question", isCorrect: true, questionSet: 1 },
            });
        });

        it("should return 500 if creation fails", async () => {
            jest.spyOn(prisma.entry, "create").mockRejectedValue(new Error("Database error"));

            const { req, res } = createMocks({
                method: "POST",
                body: { text: "New question", type: "question", isCorrect: true, questionSet: 1 },
                query: { id: "1" },
            });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(500);
            expect(JSON.parse(res._getData())).toEqual({ error: "Failed to create entry" });
        });
    });

    describe("Unsupported methods", () => {
        it("should return 405 for unsupported methods", async () => {
            const { req, res } = createMocks({ method: "PUT", query: { id: "1" } });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(405);
            expect(res._getHeaders().allow).toEqual(["GET", "PATCH", "DELETE", "POST"]);
        });
    });
});
