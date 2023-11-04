const fastEval = (code: string) => {
  const head = document.querySelector("head");
  const script = document.createElement("script");
  script.innerHTML = code;
  head?.appendChild(script);
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

export { fastEval, toggleFullscreen };
