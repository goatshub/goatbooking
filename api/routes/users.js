import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router()

//check authen
router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("Hello user, you are logged in!")
})

//check user
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("Hello user, you are logged in amd you can delete your account!")
})

//check admin
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("Hello admin, you are logged in amd you can delete all account!")
})

//UPDATE
router.put("/:id", verifyUser, updateUser)

//DELETE
router.delete("/:id", verifyUser, deleteUser)

//GET SPECIFIC
router.get("/:id", verifyUser, getUser)

//GET ALL
router.get("/", verifyAdmin, getAllUsers)

export default router