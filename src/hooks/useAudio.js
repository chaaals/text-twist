import { useMemo, useState } from "react";

const useAudio = (url) => {
  const audio = useMemo(() => new Audio(url), [url]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    audio.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
      setIsPlaying(false);
      return;
    }

    playAudio();
    setIsPlaying(true);
  };
  return { isPlaying, playAudio, pauseAudio, toggleAudio };
};

export default useAudio;
