export interface IProduct {
    id?: string | number;
    name?: string;
    image?: string;
    price?: number;
    desc?: string;
    detail?: string;
    categoryId?: string;
    sizeIds?: [];
    quantity?: number
}