const scrollToRef = (ref: any) => {
  if (ref?.current?.scroll) {
    ref.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  }
};

export default scrollToRef;
