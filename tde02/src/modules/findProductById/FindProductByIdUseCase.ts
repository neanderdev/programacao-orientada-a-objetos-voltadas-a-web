import { prismaClient } from "../../database/prismaClient";

export class FindProductByIdUseCase {
    async execute(id: string) { 
        const product = await prismaClient.product.findUnique({
            where: {
                id,
            }
        });

        if (!product) {
            throw new Error("Product not is exists!");
        }

        return product;
    }
}