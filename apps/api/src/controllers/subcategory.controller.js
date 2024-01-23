import Category from "../models/category.model";
import Product from "../models/product.model";
import Sub_category from "../models/sub_category.model";
import { Op } from "sequelize";

export const addSubCategory = async (req, res) => {
    const { sub_category, CategoryId} = req.body;
    let findSubCategory;
    try{
        findSubCategory = await Sub_category.findOne({
            where: {
                sub_category: sub_category,
                isDeleted: false
            }
        });
        if (findSubCategory){
            return res.status(401).send('Subcategory is already existed')
        }
           
        await Sub_category.create({
            sub_category: sub_category, 
            CategoryId: CategoryId
        })
        return res.status(200).send('Sub-Category is added successfully')
        
    }catch(error){
        return res.status(400).send({ message: error.message})
    }
}

export const getAllSubCategory = async (req, res) => {
    try{
        const { name } = req.query;
        const getCategory = {};
        if (name){
            getCategory.name = name;
        }
        const subCategory = await Sub_category.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}`,
                },
            },
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name']
                },
                {
                    model: Product,
                    attributes: ['name']
                }
            ]
        });
        return res.status(200).send(subCategory);
    }catch(error){
        return res.status(400).send({message: error.message})
    }
}

export const getSubcategoryById = async (req, res) => {
    try{
        const subCategoryId = await Sub_category.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'descriptions']
                }
            ]
        })
    } catch (error){
        return res.status(400).send( { message: error.message })
    }
}

export const editSubCategory = async (req, res) => {
    try{
        await Sub_category.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        return res.status(200).send('Sub Category is updated')
    } catch (error){
        return res.status(400).send({message: error.message})
    }
}

export const deleteSubCategory = async (req, res) => {
    try{
        await Sub_category.update(
            { isDeleted: true },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        return res.status(200).send('Sub Category is deleted')
    }catch(error){
        return res.status(400).send({message: error.message})
    };
}