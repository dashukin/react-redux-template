export const getExample = (req, res) => {
  res.json({ example: true, ts: Date.now() });
};
