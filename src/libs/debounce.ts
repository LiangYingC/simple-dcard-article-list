const debounce = <T extends Function>(func: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  const debounceFunc = () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func();
    }, delay);
  };

  return debounceFunc;
};

export default debounce;
