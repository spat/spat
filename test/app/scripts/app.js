
var app = {
  utils: {
    wait(time) {
      return new Promise((resovle) => {
        setTimeout(resovle, time);
      });
    },
  }
};

export default app;
