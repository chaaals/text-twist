import { useMemo } from "react";

const useAudio = (url) => {
  const audio = useMemo(() => new Audio(url), [url]);

  const playAudio = () => audio.play();

  console.log({ audio });
  return { audio, playAudio };
};

export default useAudio;
