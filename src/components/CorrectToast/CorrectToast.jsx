import "./CorrectToast.css";

const CorrectToast = ({ index }) => {
  return (
    <div className="sticker-container animated animatedFadeInUp fadeInUp">
      <img
        src={`/gifs/correct-${index}.gif`}
        alt="correct input gif"
        width="150"
        height="150"
      />
    </div>
  );
};

export default CorrectToast;
