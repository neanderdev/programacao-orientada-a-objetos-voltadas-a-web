import { prismaClient } from "../../database/prismaClient";

export class ListAllProductUseCase{
    async execute() {
        const products = await prismaClient.product.findMany();

        return products;
    }
}