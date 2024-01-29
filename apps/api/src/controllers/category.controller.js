import { Op } from 'sequelize';
import Category from '../models/category.model'
import Sub_category from '../models/sub_category.model';
import Product from '../models/product.model';

export const getAllCategory = async (req, res) => {
    try{
        const { name } = req.query;
        const category = {};
        if (name){
            category.name = name;
        };
        const findCategories = await Category.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}`,
                },
            },
            include: [
                {
                    model: Sub_category,
                    attributes: ["name"]
                },
                {
                    model: Product,
                    attributes: ["name"],
                },
            ],
            order: [["name", "ASC"]]
        });
        return res.status(200).send(findCategories)
    } catch (error) {
        return res.status(400).send({ message: error.message})
    }
}

export const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const findCategory = await Category.findOne({
            where: {
                name: name
            }
        });
        if (findCategory){
            return res.status(402).send('Category is already existed')
        }

        await Category.create({
            name
        });
        return res.status(200).send("Category is successfully added")
    } catch (error){
        return res.status(400).send({ message: error.message })
    };
}

export const editCategory = async (req, res) => {
    try{
        await Category.update(
            {
                name: req.body.name
            }
        )
    }catch (error){
        return res.status(401).send({message: error.message})
    }
};

export const deleteCategory = async (req, res) => {
    try{
        await Category.update(
            { isDeleted: true },
            {
                where: {
                    id: req.params.id,
                },
            },
        );
        return res.status(200).send("Category is successfully updated")
    } catch (error) {
        return res.status(400).send ({message: error.message})
    }
}

export const getCategoryByName = async (req, res) => {
    try{
        const categoryName = await Category.findAll({
            where: {
                name: req.query.name,
            },
            include: [
                {
                    model: Sub_category,
                    attributes:['id', 'name']
                },
                {
                    model: Product,
                    attributes: ['id', 'name']
                }
            ]
        })
    } catch (error){
        return res.status(400).send({ message: error.message })
    }
}
