import { h, render, Component } from "preact";
import { TimeOddsIcon } from "./TimeOddsIcon.js";
import { useEffect, useState } from "preact/hooks";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const defaultUserPreferences = { numOfClicks: 8 };

const giveMoreTime = async () => {
  const moreTimeDiv = document.querySelector(".moretime");

  chrome.storage.sync.get(defaultUserPreferences, async (items) => {
    const numOfClicks = items.numOfClicks;
    for (let i = 0; i < numOfClicks; i++) {
      moreTimeDiv.click();
      await sleep(500);
    }
  });
};

const TimeOddsContainer = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "70px",
        height: "100%",
      }}
    >
      <a
        onClick={() => {
          props.setPage("settings");
        }}
      >
        <span title="Adjust Time Odds" data-icon=""></span>
      </a>
      <a
        style={{
          height: "30px",
          width: "30px",
          margin: "2px",
          backgroundColor: "white",
        }}
        title="Give Time Odds"
        onClick={() => giveMoreTime()}
      >
        <TimeOddsIcon />
      </a>
    </div>
  );
};

const TimeOddsSettings = (props) => {
  const [userPreferences, setUserPreferences] = useState(
    defaultUserPreferences
  );
  useEffect(() => {
    chrome.storage.sync.get(defaultUserPreferences, async (items) => {
      setUserPreferences(items);
    });
  }, []);

  const changeNumOfClicks = (val) => {
    const newUserPreferences = {
      ...userPreferences,
      numOfClicks: Math.max(userPreferences.numOfClicks + val, 0),
    };
    chrome.storage.sync.set(newUserPreferences, () => {});
    setUserPreferences(newUserPreferences);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100px",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <a
        onClick={() => {
          changeNumOfClicks(-1);
        }}
      >
        {"➖"}
      </a>
      <div>{userPreferences.numOfClicks * 15}</div>
      <a
        onClick={() => {
          changeNumOfClicks(1);
        }}
      >
        {"➕"}
      </a>
      <a
        onClick={() => {
          props.setPage("timeodds");
        }}
      >
        {"✖"}
      </a>
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState("timeodds");

  return (
    <>
      {page === "timeodds" ? (
        <TimeOddsContainer setPage={setPage} />
      ) : (
        <TimeOddsSettings setPage={setPage} />
      )}
    </>
  );
};

export { App };
