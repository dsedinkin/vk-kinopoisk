const delayPromise = async (promise: any) => {
  await new Promise(resolve => {
    setTimeout(resolve, 800);
  });
  return promise;
};

export default delayPromise;
