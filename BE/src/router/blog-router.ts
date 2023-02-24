import {Router} from "express";
import homeController from "../controller/HomeController";

export const blogRouter = Router();

blogRouter.get('/', homeController.getAll);

blogRouter.post('/', homeController.create);
blogRouter.put('/:id', homeController.update);
blogRouter.delete('/:id', homeController.remove);//,checkRole
blogRouter.get('/findById/:id', homeController.findById);
blogRouter.get('/getCategories', homeController.getCategories);
blogRouter.get('/search/findByName', homeController.search);
blogRouter.post('/blogCategory', homeController.saveBlogCategory);
blogRouter.get('/myList/:id', homeController.getMyList);
