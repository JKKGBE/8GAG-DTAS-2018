import shortid from 'shortid';

function getUniqueId(additionalText) {
  const id = shortid.generate();
  
  return additionalText
    ? `${id}${additionalText}`
    : id;
}

export {
  getUniqueId,
};