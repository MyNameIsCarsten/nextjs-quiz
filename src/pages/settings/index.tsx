// src/pages/settings/index.tsx
import React, {useEffect, useState} from 'react';
import ProgressbarDummy from "@/components/bars/progressbar/ProgressbarDummy";
import {Settings, SettingsContext} from "@/context/SettingsContext";
import { useContext } from "react";
import appStyles from "../../styles/app.module.css";
import styles from "../../styles/settings.module.css";
import Setting from "@/components/settings/Setting";
import {useSyncSettingState} from "@/hooks/useSyncSettingState";

export default function SettingsPage() {
    const settings: Settings | null = useContext(SettingsContext);
    const { shuffleQuestions, setShuffleQuestions, shuffleAnswers, setShuffleAnswers } = useSyncSettingState(settings);

      return (
          <>
              <div className={appStyles.app}>
                  <h1>Settings</h1>
                  <div className={styles.settings}>
                      <Setting
                        setting={"questionShuffle"}
                        settings={settings}
                        settingsFunction={setShuffleQuestions}
                        dispatchType={"changeQuestionShuffle"}
                        anchor={"Shuffle questions"}
                        tip={"The questions will be displayed in a random order."}
                      />
                      <Setting
                          setting={"answerShuffle"}
                          settings={settings}
                          settingsFunction={setShuffleAnswers}
                          dispatchType={"changeAnswerShuffle"}
                          anchor={"Shuffle answers"}
                          tip={"The answers will be displayed in a random order."}
                      />
                  </div>
                  <p style={{fontSize: "12px", fontStyle: "italic"}}>(Hover over settings for tooltips.)</p>
              </div>
              <ProgressbarDummy/>
          </>
      );
}