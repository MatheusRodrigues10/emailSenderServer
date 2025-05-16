import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Em construção ;)");
});

export default router;
