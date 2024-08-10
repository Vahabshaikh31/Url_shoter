const { getUser } = require("../services/auth");

const restrictToLoggedUserOnly = async (req, res, next) => {
  const sessionId = req.cookies?.uid;
  if (!sessionId) return res.redirect("/login");

  const user = getUser(sessionId);
  if (!user) return res.redirect("/login");

  res.user = user;
  next();
};
const checkAuth = async (req, res, next) => {
  try {
    const userID = req.cookies?.uid;
    if (!userID) {
      res.user = null;
      return next();
    }

    const user = await getUser(userID);
    res.user = user || "NULL";
    next();
  } catch (error) {
    console.error("Error in checkAuth middleware:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  restrictToLoggedUserOnly,
  checkAuth,
};
