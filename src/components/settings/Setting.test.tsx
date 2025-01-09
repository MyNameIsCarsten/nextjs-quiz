import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { SettingsDispatchContext } from "@/context/SettingsContext";
import Setting from "@/components/settings/Setting";

describe("Setting Component", () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the checkbox and tooltip", () => {
        const mockSettings = { testSetting: true };
        const mockSettingsFunction = jest.fn();

        render(
            <SettingsDispatchContext.Provider value={mockDispatch}>
                <Setting
                    setting="testSetting"
                    settings={mockSettings}
                    settingsFunction={mockSettingsFunction}
                    dispatchType="UPDATE_SETTING"
                    anchor="test-anchor"
                    tip="Test Tooltip"
                />
            </SettingsDispatchContext.Provider>
        );

        expect(screen.getByRole("checkbox")).toBeInTheDocument();
        expect(screen.getByText("test-anchor")).toBeInTheDocument();
    });

    it("updates the setting and dispatches an action when the checkbox is changed", () => {
        const mockSettings = { testSetting: false };
        const mockSettingsFunction = jest.fn();

        render(
            <SettingsDispatchContext.Provider value={mockDispatch}>
                <Setting
                    setting="testSetting"
                    settings={mockSettings}
                    settingsFunction={mockSettingsFunction}
                    dispatchType="UPDATE_SETTING"
                    anchor="test-anchor"
                    tip="Test Tooltip"
                />
            </SettingsDispatchContext.Provider>
        );

        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);

        expect(mockSettingsFunction).toHaveBeenCalledWith(true);
        expect(mockDispatch).toHaveBeenCalledWith({ type: "UPDATE_SETTING", payload: true });
    });

    it("handles a null settings object and defaults to false", () => {
        const mockSettingsFunction = jest.fn();

        render(
            <SettingsDispatchContext.Provider value={mockDispatch}>
                <Setting
                    setting="testSetting"
                    settings={null}
                    settingsFunction={mockSettingsFunction}
                    dispatchType="UPDATE_SETTING"
                    anchor="test-anchor"
                    tip="Test Tooltip"
                />
            </SettingsDispatchContext.Provider>
        );

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();

        fireEvent.click(checkbox);

        expect(mockSettingsFunction).toHaveBeenCalledWith(true);
        expect(mockDispatch).toHaveBeenCalledWith({ type: "UPDATE_SETTING", payload: true });
    });

    it("does not dispatch if dispatch context is undefined", () => {
        const mockSettings = { testSetting: false };
        const mockSettingsFunction = jest.fn();

        render(
            <Setting
                setting="testSetting"
                settings={mockSettings}
                settingsFunction={mockSettingsFunction}
                dispatchType="UPDATE_SETTING"
                anchor="test-anchor"
                tip="Test Tooltip"
            />
        );

        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);

        expect(mockSettingsFunction).toHaveBeenCalledWith(true);
        expect(mockDispatch).not.toHaveBeenCalled();
    });
});
