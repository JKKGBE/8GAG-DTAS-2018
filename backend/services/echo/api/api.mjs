function echo(req) {
  return {
    requestId: req.requestId,
    payload: req.payload,
  };
}

export {
  echo,
};