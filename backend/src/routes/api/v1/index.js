// import { Router } from "express";
// import { getCsrfToken } from "./handlers.js";
const { Router } = require("express");
const { getCsrfToken } = require("./handlers.js")

const router = Router();
router.get(`/csrf-token`, getCsrfToken);
module.exports = router;
