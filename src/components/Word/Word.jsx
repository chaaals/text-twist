import { forwardRef } from "react";

import "./Word.css";

const Word = forwardRef(({ word, solved }, ref) => {
  const letters = word.split("");
  return (
    <section className="word-wrapper" ref={ref}>
      {letters.map((letter, i) => (
        <div key={i} className={`letter`}>
          <span className={`${solved ? "show" : "hide"}`}>{letter}</span>
        </div>
      ))}
    </section>
  );
});

export default Word;
