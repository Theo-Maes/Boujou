export const variantBox = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
    };
  },
};

export const variantText = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      delayChildren: 1,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      delayChildren: 2,
    },
  },
  exit: {
    opacity: 0,
  },
};
