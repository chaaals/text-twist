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

  return { isPlaying, playAudio, pauseAudio };
};

export default useAudio;
