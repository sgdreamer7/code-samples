export class Purchase {
    id: number;
    number: string;
    cart_id: string;
    total: any;
    currency: string;
    item: any;
    created_date: string;
    status: any;
}

export class PurchaseSearch {
    field: string;
    value: string;
}

export class PurchaseFilter {
    page: number | any;
    size: number | any;
}
