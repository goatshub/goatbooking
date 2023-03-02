import express from "express";
import { createHotel, deleteHotel, getAllHotels, getHotel, getHotelsCountByCity, getHotelsCountByType, getHotelsRooms, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

//CREATE
router.post("/", verifyAdmin, createHotel)

//UPDATE
router.put("/:id", verifyAdmin, updateHotel)

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel)

//GET SPECIFIC
router.get("/find/:id", getHotel)

//GET ALL
router.get("/", getAllHotels)


//GET COUNTS
router.get("/countByCity", getHotelsCountByCity)
router.get("/countByType", getHotelsCountByType)

//GET ROOM
router.get("/room/:id", getHotelsRooms)

export default router