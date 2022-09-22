import { Request, Response } from "express";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

export class UpdateProductController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, description, price, picture } = request.body;

        const updateProductUseCase = new UpdateProductUseCase();
        const product = await updateProductUseCase.execute({
            id,
            name,
            description,
            price,
            picture,
        });

        return response.json(product);
    }
}