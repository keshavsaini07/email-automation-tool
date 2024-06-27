const checkIsAuth = (req, res, next) => {
  console.log("check auth", req.isAuthenticated());
  req.isAuthenticated() ? next() : res.sendStatus(401);
};

export default {
    checkIsAuth
}