import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import Address from "../value-object/address"
import ChangeAddressEvent from "./change-address.event"
import ProductCreatedEvent from "../../product/event/product-created.event"
import CustomerCreatedEvent from "./customer-created.event"
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler"
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler"
import EnviaConsoleLogHandler from "./handler/envia-console-log.handle"
import EventDispatcher from "../../@shared/event/event-dispatcher"
import Customer from "../entity/customer"

describe("customer create domain event", ()=>{

    it("should handle a event when create a customer",  () => {


    const customer = new Customer("123","Customer 1")
    const customerRepository = new CustomerRepository()
    const dispatcher = new EventDispatcher()

    const handler1 = new EnviaConsoleLog1Handler()
    const handler2 = new EnviaConsoleLog2Handler()
    const handler = new EnviaConsoleLogHandler()
    const customerAddress = new Address("New York",123,"000-23","First Street")

    
    customer.changeAddress(customerAddress)
    dispatcher.register("ChangeAddressEvent",handler)

    const spyEventHandler = jest.spyOn(handler,"handle")
    const eventData = customer.id+", "+customer.name+" alterado para: "+customerAddress._city+", "+customerAddress._number+", "+customerAddress._zip +", "+customerAddress._street

    const changeAddressEvent = new ChangeAddressEvent(eventData)

    dispatcher.notify(changeAddressEvent)
    expect(spyEventHandler).toHaveBeenCalled()

     
    dispatcher.unregisterAll
    
    const spyEventHandler1 =  jest.spyOn(handler1,"handle")
    const spyEventHandler2 = jest.spyOn(handler2,"handle")

    const customerCreateEvent = new CustomerCreatedEvent({
        id:"123",
        name:"Customer 1"
    })

   

    dispatcher.register("CustomerCreatedEvent",handler1)
    dispatcher.register("CustomerCreatedEvent",handler2)

    dispatcher.notify(customerCreateEvent)

    
    expect(spyEventHandler1).toHaveBeenCalled()
    expect(spyEventHandler2).toHaveBeenCalled()




    })
   
})