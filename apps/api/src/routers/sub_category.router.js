import { Router } from "express"
import { addSubCategory } from "../controllers/subcategory.controller"




const subCategoryRouter = Router()

subCategoryRouter.post('/add-subcategory', addSubCategory)

export { subCategoryRouter }