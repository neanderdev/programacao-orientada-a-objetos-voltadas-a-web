import { Request, Response } from "express";

import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, description, price, picture } = request.body;

        const createProductUseCase = new CreateProductUseCase();
        const productCreated = await createProductUseCase.execute({ name, description, price, picture });

        return response.status(201).json(productCreated);
    }
}