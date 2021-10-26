const debounce = <T extends Function>(callback: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  const debounceFunc = () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback();
    }, delay);
  };

  return debounceFunc;
};

export default debounce;
