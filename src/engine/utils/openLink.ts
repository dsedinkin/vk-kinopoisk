const openLink = (href: string) => {
  const a = document.createElement("a");
  Object.assign(a, { target: "_blank", href });
  a.click();
};

export default openLink;
