import ShoppingCartItem from './shopping-cart-item';
import { Product } from './product';

export default class ShoppingCart {
    private id: string;
    private dateCreated: Date;
    private items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: number]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        // tslint:disable-next-line:forin
        for (const productId in itemsMap) {
          const item = itemsMap[productId];
          this.items.push(new ShoppingCartItem({ ...item }));
        }
    }

    public getId() {
        return this.id;
    }

    public setId(id: string) {
        this.id = id;
    }

    public getDate() {
        return this.dateCreated;
    }

    public setDate() {
        this.dateCreated = new Date();
    }

    public getItems() {
        return this.items;
    }

    getQuantity(product: Product) {
        const item = this.itemsMap[product.idproducto];
        return item ? item.cantidad : 0;
    }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.items) {
          sum += this.items[productId].totalPrecio;
        }
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.itemsMap) {
            count += this.itemsMap[productId].cantidad;
        }
        return count;
    }

    public setItems(items: Array<ShoppingCartItem>) {
        this.items = items;
    }

    public addItem(item: Product) {
        const shoppingItem = new ShoppingCartItem(item);
        const index = this.items.indexOf(shoppingItem);
        if (index >= 0) {
            this.items[index].cantidad ++;
        } else {
            const cartItem = new ShoppingCartItem(item);
            this.items.push(cartItem);
        }
    }

    public removeItem(item: Product) {
        const shoppingItem = new ShoppingCartItem(item);
        const index = this.items.indexOf(shoppingItem);
        if (index >= 0) {
            this.items[index].cantidad --;
        }
        if (this.items[index].cantidad === 0) {
            const cartItem = new ShoppingCartItem(item);
            this.items.slice(index);
        }
    }
}
