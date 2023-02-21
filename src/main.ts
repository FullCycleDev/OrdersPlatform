import Address from './domain/entity/address';
import Customer from './domain/entity/customer';
import Order from './domain/entity/order';
import OrderItem from './domain/entity/order_item';

let customer = new Customer("123","Emanuel Wa Mungu")

const address = new Address("Rua dois", 2 , "123-322","Sao Paulo")
customer.Address = address

customer.Address = address
customer.activate()

//const item1 = new OrderItem("1","Item 1", 10)
//const item2 = new OrderItem("1","Item 2", 15)


//const order = new Order("1","123",[item1,item2])