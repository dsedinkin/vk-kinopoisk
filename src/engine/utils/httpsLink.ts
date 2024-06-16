const httpsLink = (link: string) => {
  if (link.indexOf("http://") === 0 || link.indexOf("https://") === 0) {
    return link;
  } else {
    return `https://${link}`;
  };
};

export default httpsLink;
