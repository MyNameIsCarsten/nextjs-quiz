import Tooltip from "@/components/settings/Tooltip";
import React, {useContext} from "react";
import {Settings, SettingsDispatchContext} from "@/context/SettingsContext";

interface Props {
    setting: string,
    settings: Settings | null,
    settingsFunction: React.Dispatch<React.SetStateAction<boolean>>,
    dispatchType: string,
    anchor: string,
    tip: string
}

function Setting({setting, settings, settingsFunction, dispatchType, anchor, tip}: Props) {
    const dispatch = useContext(SettingsDispatchContext);

    const handleSettingChange = (e: { target: { checked: boolean } }) => {
        settingsFunction(e.target.checked);
        if (dispatch) {
            dispatch({
                type: dispatchType,
                payload: e.target.checked,
            });
        }
    };

    return (
        <label>
            <input
                type="checkbox"
                checked={Boolean(settings ? settings[setting] : false)} // Ensure it's always a boolean
                onChange={handleSettingChange}
            />

            <Tooltip
                anchor={anchor}
                tip={tip}
            />
        </label>
    );
}

export default Setting;
