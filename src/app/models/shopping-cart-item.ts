export default class ShoppingCartItem {
    idproducto: number;
    titulo: string;
    imgproducto: string;
    precio: number;
    cantidad: number;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }

    get totalPrecio() { return this.precio * this.cantidad; }
}
