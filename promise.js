function Promise(exec) {
  this.onResolvedCbs = [];
  exec((value) => {
    setTimeout(() => {
      this.data = value;
      this.onResolvedCbs.forEach((item) => item(value));
    });
  });
}

Promise.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.onResolvedCbs.push(() => {
      const result = onResolved(this.data);
      result instanceof Promise ? result.then(resolve) : resolve(result);
    });
  });
};

export default Promise;
