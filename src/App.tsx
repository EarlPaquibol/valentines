import { useState } from "react";
import styles from "./App.module.scss";
import willYou from "./assets/willyoube.gif";
import cry from "./assets/cry.gif";
import yey from "./assets/yey.gif";

function App() {
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [randomPosition, setRandomPosition] = useState<{
    top: number | undefined;
    left: number | undefined;
  }>({
    top: undefined,
    left: undefined,
  });

  const handleHover = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault(); // prevent touch click

    setHovered(true);

    const container = e.currentTarget.parentElement as HTMLDivElement;
    const rect = container.getBoundingClientRect();

    const buttonWidthPercent = 20; // approx button width %
    const buttonHeightPercent = 10; // approx button height %

    let newLeft: number, newTop: number;

    // Get pointer coordinates for mouse or touch
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    do {
      newLeft = Math.random() * (100 - buttonWidthPercent);
      newTop = Math.random() * (100 - buttonHeightPercent);
    } while (
      clientX - rect.left >= (newLeft / 100) * rect.width &&
      clientX - rect.left <=
        ((newLeft + buttonWidthPercent) / 100) * rect.width &&
      clientY - rect.top >= (newTop / 100) * rect.height &&
      clientY - rect.top <= ((newTop + buttonHeightPercent) / 100) * rect.height
    );

    setRandomPosition({ left: newLeft, top: newTop });
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {answer === null && (
          <img src={willYou} alt="bg" className={styles.gif} />
        )}
        {answer === false && <img src={cry} alt="bg" className={styles.gif} />}
        {answer && <img src={yey} alt="bg" className={styles.gif} />}

        {answer === null && <h1>Will you be my Valentine's?</h1>}
        {answer === false && <h1>WHYYYYY? 😭</h1>}
        {answer && <h1>HEHEHE I LOVE YOUUU!</h1>}

        {answer === null && (
          <div className={styles.buttons}>
            <button
              className={styles.yesButton}
              onClick={() => setAnswer(true)}
            >
              YES 😎
            </button>
            <button
              className={styles.noButton}
              onClick={() => setAnswer(false)}
            >
              NO 😭
            </button>
          </div>
        )}

        {answer === false && (
          <div className={styles.buttons}>
            <button
              className={styles.yesButton}
              onClick={() => setAnswer(true)}
            >
              OK FINE 🥰
            </button>
            <button
              className={`${styles.noButton} ${styles.disabled}`}
              onClick={handleHover}
              onMouseEnter={handleHover}
              onTouchStart={handleHover}
              style={{
                position: hovered === false ? "relative" : "absolute",
                left: `${randomPosition.left}%`,
                top: `${randomPosition.top}%`,
                transition: "all 0.2s ease",
              }}
            >
              CUS NO 😏
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
