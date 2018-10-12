import React from "react";
import Swipe from "react-swipe-component";
import Observer from "react-intersection-observer";
import connect from "./utils/connect";
import ScheduleIcon from "./components/ScheduleIcon.jsx";
import TitlePage from "./components/TitlePage.jsx";
import logo from "./assets/colored-logo.svg";
import styles from "./presentation.scss";
import root from "window-or-global";

// TODO: Lazy load as in https://www.npmjs.com/package/react-intersection-observer#polyfill
if (root.location) {
  require("intersection-observer");
}

class PresentationContainer extends React.Component {
  state = {
    slide: getSlide()
  };
  componentDidMount() {
    document.addEventListener("keydown", this.onKeydown, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown, false);
  }
  onKeydown = event => {
    const { key } = event;

    if (key === "ArrowUp") {
      event.preventDefault();
      this.moveToPreviousSlide();
    }
    if (key === "ArrowDown") {
      event.preventDefault();
      this.moveToNextSlide();
    }
  };

  moveToPreviousSlide = () => {
    this.goToSlide(Math.max(parseInt(root.location.hash.slice(1)) - 1, 0));
  };

  moveToNextSlide = () => {
    this.goToSlide(
      Math.min(
        parseInt(root.location.hash.slice(1)) + 1,
        this.props.schedule.intervals.length
      )
    );
  };

  goToSlide = slide => {
    this.setUrlHash(slide);
    this.setState({ slide });
    this.scrollToSlide(slide);
  };

  scrollToSlide(slide) {
    root.document
      .getElementsByClassName(`slide-${slide}`)[0]
      .scrollIntoView({ behavior: "smooth" });
  }

  setUrlHash(slide) {
    root.location = `${root.location.origin}${root.location.pathname}#${slide}`;
  }

  render() {
    const { schedule } = this.props;

    return (
      <Swipe
        mouseSwipe
        onSwipedUp={this.moveToNextSlide}
        onSwipedDown={this.moveToPreviousSlide}
      >
        <Slides schedule={schedule} onSlideVisible={this.setUrlHash} />
      </Swipe>
    );
  }
}

function Slides({ schedule, onSlideVisible }) {
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
          <TitlePage />
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
                <footer className={styles.presentationFooter}>
                  footer content
                </footer>
              </div>
            </Observer>
          ))
      ) : (
        <React.Fragment />
      )}
    </>
  );
}

function getSlide() {
  if (!root.location) {
    return 0;
  }

  return root.location.hash ? parseInt(root.location.hash.slice(1)) : 0;
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

export default connect(
  `
query PageQuery($conferenceId: ID!, $day: String!) {
  schedule(conferenceId: $conferenceId, day: $day) {
    intervals {
      sessions {
        type
        interval {
          begin
          end
        }
        title

        ... on Talk {
          speakers {
            name
            image {
              url
            }
            type
          }
        }
      }
    }
  }
}
`,
  {
    apiUrl: "https://api.react-finland.fi/graphql",
    propsToVars: () => ({ day: "2018-10-19" })
  }
)(PresentationContainer);
