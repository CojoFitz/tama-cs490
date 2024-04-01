const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  console.log("VALIDATING");
  const accessToken = req.header("accessToken");
  console.log(accessToken);

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };