export interface IOrder {
    id?: string | number;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    district?: string;
    zip?: string;
    items?: [];
    status?: boolean
}