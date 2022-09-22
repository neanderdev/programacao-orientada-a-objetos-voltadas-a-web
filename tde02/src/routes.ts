import { Router } from "express";

import { ListAllProductController } from "./modules/listAllProduct/ListAllProductController";
import { CreateProductController } from "./modules/createProduct/CreateProductController";
import { FindProductByIdController } from "./modules/findProductById/FindProductByIdController";
import { UpdateProductController } from "./modules/updateProduct/UpdateProductController";
import { DeleteProductController } from "./modules/deleteProduct/DeleteProductController";

const routes = Router();

const listAllProductController = new ListAllProductController();
const createProductController = new CreateProductController();
const findProductByIdController = new FindProductByIdController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

routes.get("/products/", listAllProductController.handle);
routes.post("/products/", createProductController.handle);
routes.get("/products/:id", findProductByIdController.handle);
routes.put("/products/:id", updateProductController.handle);
routes.delete("/products/:id", deleteProductController.handle);

export { routes };