import "./Word.css";

const Word = ({ word, solved }) => {
  const letters = word.split("");
  return (
    <section className="word-wrapper">
      {letters.map((letter, i) => (
        <div key={i} className={`letter`}>
          <span className={`${solved ? "show" : "hide"}`}>{letter}</span>
        </div>
      ))}
    </section>
  );
};

export default Word;
