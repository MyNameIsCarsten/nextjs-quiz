import styles from "@/styles/settings.module.css";
import React from "react";

interface Props {
    anchor: string,
    tip: string
}

function Tooltip({anchor, tip}: Props) {
    return (
        <div className={styles.tooltip}>
            {anchor}
            <span className={styles.tooltiptext}>{tip}</span>
        </div>
    );
}

export default Tooltip;
