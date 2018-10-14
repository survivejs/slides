import React from "react";
import Observer from "react-intersection-observer";
import ScheduleIcon from "./ScheduleIcon.jsx";
import TitlePage from "./TitlePage.jsx";
import logo from "../assets/colored-logo.svg";

const styles = {}; // TODO

function Slides({ schedule, theme, onSlideVisible }) {
  function onSlideChange(slide) {
    return inView => {
      if (inView) {
        onSlideVisible(slide);
      }
    };
  }

  return (
    <>
      <div className={`${styles.titlePageContainer} slide-0`}>
        <Observer onChange={onSlideChange(0)}>
          <TitlePage theme={theme} />
        </Observer>
      </div>
      {schedule ? (
        schedule.intervals
          .map(interval => interval.sessions[0])
          .map((session, index) => (
            <Observer key={index} onChange={onSlideChange(index)}>
              <div
                className={`${styles.presentationContainer} slide-${index + 1}`}
              >
                <header className={styles.presentationHeader}>
                  <div className={styles.presentationLogoContainer}>
                    <img
                      src={logo}
                      alt="GraphQL Finland 2018"
                      className={styles.presentationLogo}
                    />
                  </div>
                  <div />
                  {session.speakers && (
                    <div className={styles.speakerImageContainer}>
                      <img
                        className={styles.speakerImage}
                        src={session.speakers[0].image.url}
                        alt={session.speakers[0].name}
                      />
                    </div>
                  )}
                </header>
                <main className={styles.presentationContent}>
                  <SessionTitle
                    className={styles.presentationTitle}
                    {...session}
                  />
                  {session.interval && (
                    <h4 className={styles.presentationInterval}>
                      {session.interval.begin} - {session.interval.end}
                    </h4>
                  )}
                </main>
                <footer className={styles.presentationFooter} />
              </div>
            </Observer>
          ))
      ) : (
        <React.Fragment />
      )}
    </>
  );
}

const SessionTitle = ({ className, title, type, speakers }) => (
  <h3 className={className}>
    {type === "COFFEE_BREAK" ||
    type === "PARTY" ||
    type === "LUNCH" ||
    type === "BREAKFAST" ? (
      <div className={styles.specialSession}>
        {title} <ScheduleIcon type={type} />
      </div>
    ) : (
      <>
        <div className={styles.speakerTitle}>{title}</div>
        {speakers ? (
          <span className={styles.speakerName}>
            {speakers[0].name} <ScheduleIcon type={type} />
          </span>
        ) : (
          <ScheduleIcon type={type} />
        )}
      </>
    )}
  </h3>
);

export default Slides;
