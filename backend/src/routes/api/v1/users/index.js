// import { Router } from "express";
// import { getAllUsers, getOneUser, createOneUser } from "./handlers.js";
const { Router } = require("express");
const { getAllUsers, getOneUser, createOneUser } = require("./handlers.js");

const router = Router();
router.get(`/`, getAllUsers);
router.post(`/`, createOneUser);
router.get(`/:id`, getOneUser);
module.exports = router;
