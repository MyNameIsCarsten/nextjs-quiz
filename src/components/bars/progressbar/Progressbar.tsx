import styles from "../../../styles/progressbar.module.css";
import appStyles from "../../../styles/app.module.css";
import Link from "next/link";
import React from "react";
import ProgressbarButton from "@/components/bars/progressbar/ProgressbarButton";
import ProgressbarBar from "@/components/bars/progressbar/ProgressbarBar";
import ProgressbarTracker from "@/components/bars/progressbar/ProgressbarTracker";

type ProgressbarProps = {
    currentSet: number,
    setCurrentSet: React.Dispatch<React.SetStateAction<number>>,
    maxSets: number,
    setHasSelected: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    hasSelected: boolean
};

const Progressbar = ({currentSet, setCurrentSet, maxSets, hasSelected, setHasSelected,}: ProgressbarProps) => {

    return (
        <footer className={styles.progressbar} data-testid="progressbar">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem"}}>
                <ProgressbarTracker
                    currentSet={currentSet}
                    maxSets={maxSets}
                />
                <ProgressbarBar
                    currentSet={currentSet}
                    maxSets={maxSets}
                    hasSelected={hasSelected}
                />
                <ProgressbarButton
                    currentSet={currentSet}
                    setCurrentSet={setCurrentSet}
                    maxSets={maxSets}
                    hasSelected={hasSelected}
                    setHasSelected={setHasSelected}
                />
            </div>
        </footer>
    );
};

export default Progressbar;
