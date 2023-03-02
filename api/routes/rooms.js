import express from "express"
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom)

//UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:roomNoId", updateRoomAvailability)

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

//GET SPECIFIC
router.get("/:id", getRoom)

//GET ALL
router.get("/", getAllRooms)


export default router