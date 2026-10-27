export const smoothScrollTo = (targetY: number, duration: number = 800) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startY, distance, duration);

    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};
