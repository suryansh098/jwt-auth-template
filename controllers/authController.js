const jwt = require("jsonwebtoken");

// TOKEN: DO NOT USE THIS ON PRODUCTION
// temporary cache variable.
let validRefreshTokens = [];

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

exports.login = (req, res) => {
  const { username, password } = req.body;
  // Authenticate the user by validating the password

  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

  // TOKEN: store refresh token in some type of cache or db (eg redis, etc.)
  validRefreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
};

exports.generateRefreshToken = (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.sendStatus(401);
  if (!validRefreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
};

exports.logout = (req, res) => {
  // TOKEN: remove token from the cache or db
  validRefreshTokens = validRefreshTokens.filter(
    (token) => token !== req.body.token
  );
  return res.sendStatus(204);
};
