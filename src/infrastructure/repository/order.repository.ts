import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";


export default class OrderRepository {
  async create(entity: Order): Promise<void> {

    try {

      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {

      throw new Error("Order not created");
      }
  }


  async update(entity: Order): Promise<void> {


    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      }, {
      where: {
        id: entity.id
      }
    }
    )
  }


  async find(id: string): Promise<Order> {
    let foundOrder

    try {


      foundOrder = await OrderModel.findOne({
        where: {
          id: id
        },
        rejectOnEmpty: true,

        include: ["items"],
      })

    } catch (error) {
      throw new Error("Order not found");

    }


    let orderItems = foundOrder.items.map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
    let order = new Order(foundOrder.id, foundOrder.customer_id, orderItems)
    return order


  }


  async findAll(): Promise<Order[]> {

    let foundOrders
    try {

      foundOrders = await OrderModel.findAll({
        include: ["items"],
      })
    } catch (error) {
      throw new Error("Orders not found");

    }

    let orders = foundOrders.map((order_found) => {
      let orderItems = order_found.items.map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
      let order = new Order(order_found.id, order_found.customer_id, orderItems)
      return order
    }

    )
    return orders

  }

}