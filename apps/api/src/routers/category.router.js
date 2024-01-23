import { Router } from "express";
import { addCategory, editCategory } from "../controllers/category.controller";



const categoryRouter = Router()

categoryRouter.post('/add-category', addCategory)
categoryRouter.patch('/edit-category', editCategory)
categoryRouter.get('/')

export {categoryRouter};