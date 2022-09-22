import slug from "slug";

import { prismaClient } from "../../database/prismaClient";

interface ICreateProductDTO {
    name: string;
    description: string;
    price: number;
    picture: string;
};

export class CreateProductUseCase {
    async execute({ name, description, price, picture }: ICreateProductDTO) {        
        const productSlug = slug(name, { remove: /[0-9]/g });

        const productBySlugExist = await prismaClient.product.findUnique({
            where: {
                slug: productSlug,
            }
        });

        if (productBySlugExist) {
            throw new Error("Product slug is exists!");
        }

        const product = await prismaClient.product.create({
            data: {
                name,
                description,
                price,
                picture,
                slug: productSlug,
            }
        });

        return product;
    }
}