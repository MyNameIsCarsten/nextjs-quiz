import { render, screen, fireEvent } from "@testing-library/react";
import MyApp from "@/pages/_app";
import { QuizContext, QuizDispatchContext } from "@/context/QuizContext";
import React from "react";
import { act } from "react";

describe("MyApp", () => {
    it("should provide QuizContext and QuizDispatchContext", async () => {
        const TestComponent = () => {
            const quiz = React.useContext(QuizContext);
            const dispatch = React.useContext(QuizDispatchContext);
            return (
                <div>
                    <p data-testid="quiz-chosenCorrectly">{quiz!.chosenCorrectly}</p>
                    <button
                        data-testid="increment-button"
                        onClick={() => (dispatch ? dispatch({ type: "hasSelected" }) : null)}
                    >
                        Increment
                    </button>
                </div>
            );
        };

        render(
            <MyApp
                Component={TestComponent}
                pageProps={{}}
            />
        );

        const chosenCorrectly = screen.getByTestId("quiz-chosenCorrectly");
        const incrementButton = screen.getByTestId("increment-button");

        // Initial state
        expect(chosenCorrectly.textContent).toBe("0");

        // Simulate button click and wait for state update
        await act(async () => {
            fireEvent.click(incrementButton);
        });

        // Assert updated state
        expect(chosenCorrectly.textContent).toBe("1");
    });

    it("should render the App component", () => {
        const TestComponent = () => <div data-testid="test-component">Test Component</div>;

        render(
            <MyApp
                Component={TestComponent}
                pageProps={{}}
            />
        );

        expect(screen.getByTestId("app")).toBeInTheDocument();
        expect(screen.getByTestId("test-component")).toBeInTheDocument();
    });
});
