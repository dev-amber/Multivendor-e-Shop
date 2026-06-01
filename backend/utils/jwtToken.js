//create token and saving cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const isProduction = process.env.NODE_ENV === "PRODUCTION";

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    path: "/",
  };

  console.log(process.env.JWT_EXPIRES);

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
