import { prismaClient } from "../../database/prismaClient";

interface IUpdateProductDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    picture: string;
};

export class UpdateProductUseCase {
    async execute({ id, name, description, price, picture }: IUpdateProductDTO) {
        const productIsExists = await prismaClient.product.findUnique({
            where: {
                id,
            }
        });

        if (!productIsExists) {
            throw new Error("Product not is exists!");
        }

        const product = await prismaClient.product.update({
            data: {
                name,
                description,
                price,
                picture,
            },
            where: {
                id,
            }
        });

        return product;
    }
}