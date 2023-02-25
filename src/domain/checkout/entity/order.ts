import OrderItem from "./order_item";

export default class Order{


    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total : number;

    constructor(id:string, customerId: string, items: OrderItem[]){

        this._id = id;
        this._customerId = customerId;
        this._items = items

        this._total = this.total()
        this.validate()
    }

    changeCustomerId(customer: string) { 
        this._customerId = customer
    }


    changeItems(orderItem : OrderItem[]) {

        this._items = orderItem
      //  this._items = orderItem.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity))
    }

    changeId(id: string){
        this._id = id
    }


    validate(): boolean{
        if( this._id.length === 0){
            throw new Error("Id is required")
        }
        if( this._customerId.length === 0){
            throw new Error("CustomerId is required")
        } 
        if(this,this._items.length === 0){
            throw new Error("Item qtd must be greater than 0")
        }

        if(this._items.some(item => item.quantity <= 0)){
            throw new Error("Quantity must be greater than 0")
        }
        return true
    }


    total (): number {

        return this._items.reduce((acc, item) => acc + item.price , 0)
    }


    get id () : string {

        return this._id
    }
    get customerId () : string {

        return this._customerId
    }

    get items ( ) : OrderItem[]
    {
        return this._items
    }
    


}