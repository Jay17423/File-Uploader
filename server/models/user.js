import express from 'express'
import userController from "../controllers/user.js"

const router = express.Router();

router.post("/users",userController.createUser)
router.get("/users",userController.getAllUser)

export default  router;