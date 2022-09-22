import { Request, Response } from "express";

import { ListAllProductUseCase } from "./ListAllProductUseCase";

export class ListAllProductController {
    async handle(request: Request, response: Response) {
        const listAllProductUseCase = new ListAllProductUseCase();
        const products = await listAllProductUseCase.execute();

        return response.json(products);
    }
}