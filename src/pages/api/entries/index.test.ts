import handler from "@/pages/api/entries/index"; // Update path as per your file structure
import { createMocks } from "node-mocks-http";
import prisma from "../../../lib/prisma";


jest.mock("../../../lib/prisma", () => ({
    entry: {
        findMany: jest.fn(),
        create: jest.fn(),
        deleteMany: jest.fn(),
    },
}));

describe("API Handler", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET method", () => {
        it("should fetch all entries", async () => {
            const entries = [{ id: 1, type: "question", text: "Sample question" }];
            // @ts-ignore
            jest.spyOn(prisma.entry, 'findMany').mockResolvedValue(entries);

            const { req, res } = createMocks({ method: "GET" });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(JSON.parse(res._getData())).toEqual(entries);
            expect(prisma.entry.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe("POST method", () => {
        it("should create a new entry when valid data is provided", async () => {
            const newEntry = { type: "question", isCorrect: true, text: "Sample", questionSet: 1 };
            // @ts-ignore
            jest.spyOn(prisma.entry, 'create').mockResolvedValue(newEntry);

            const { req, res } = createMocks({
                method: "POST",
                body: newEntry,
            });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(201);
            expect(JSON.parse(res._getData())).toEqual(newEntry);
            expect(prisma.entry.create).toHaveBeenCalledWith({ data: newEntry });
        });

        it("should return 400 if type is missing", async () => {
            const { req, res } = createMocks({
                method: "POST",
                body: { isCorrect: true, text: "Sample", questionSet: 1 },
            });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(400);
            expect(JSON.parse(res._getData())).toEqual({ error: "Type is required." });
        });

        it("should return 400 if type is invalid", async () => {
            const { req, res } = createMocks({
                method: "POST",
                body: { type: "invalid", isCorrect: true, text: "Sample", questionSet: 1 },
            });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(400);
            expect(JSON.parse(res._getData())).toEqual({ error: "Type can only be \"answer\" or \"question\"" });
        });
    });

    describe("DELETE method", () => {
        it("should delete entries with the given questionSet", async () => {
            // @ts-ignore
            jest.spyOn(prisma.entry, 'deleteMany').mockResolvedValue({ count: 1 });

            const { req, res } = createMocks({
                method: "DELETE",
                body: { questionSet: 1 },
            });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(JSON.parse(res._getData())).toEqual({ message: "Question set deleted successfully" });
            expect(prisma.entry.deleteMany).toHaveBeenCalledWith({ where: { questionSet: 1 } });
        });

        it("should return 400 if questionSet is missing", async () => {
            const { req, res } = createMocks({ method: "DELETE", body: {} });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(400);
            expect(JSON.parse(res._getData())).toEqual({ error: "questionSet is required" });
        });

        it("should return 500 if deletion fails", async () => {
            // @ts-ignore
            jest.spyOn(prisma.entry, 'deleteMany').mockRejectedValue(new Error("Database error"));

            const { req, res } = createMocks({
                method: "DELETE",
                body: { questionSet: 1 },
            });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(500);
            expect(JSON.parse(res._getData())).toEqual({ error: "Failed to delete question set" });
        });
    });

    describe("PUT method (unsupported)", () => {
        it("should return 405 for unsupported methods", async () => {
            const { req, res } = createMocks({ method: "PUT" });
            await handler(req, res);

            expect(res._getStatusCode()).toBe(405);
            expect(res._getHeaders().allow).toEqual(["GET", "POST", "DELETE"]);
        });
    });
});
