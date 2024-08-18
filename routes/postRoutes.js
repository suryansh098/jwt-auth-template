const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", authenticateToken, postController.getPosts);

module.exports = router;
