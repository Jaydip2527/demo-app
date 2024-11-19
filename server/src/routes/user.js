const router = require("express").Router();
// Import Models
const userService = require("../controllers/user");
const user = new userService();

router.post("/register", async (req, res, next) => {
    try {
      const result = await user.storeUserData(req.body);
      res.status(201).json({ data: result, message: "User created successfully", success: true });
    } catch (err) {
      console.log("error", err);
      next({ data: [], message: err, success: false });
    }
});

router.post("/login", async (req, res, next) => {
    try {
      const result = await user.login(req.body);
      if (result.success) {
        res.status(200).send({ data: result, message: "User logged in successfully", success: true });
      } else {
        res.status(401).send({ data: [], message: result.message, success: false });
      }
    } catch (err) {
      console.log("error", err);
      next({ data: [], message: err, success: false });
    }
});

module.exports = router;