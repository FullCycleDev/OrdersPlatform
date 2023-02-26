import Address from "../value-object/address"
import CustomerFactory from "./customer.factory"

describe("Customer Factory Unit test", ()=> { 

    
    it("should create a Customer" , ()=> {
        let customer = CustomerFactory.create("John")
      
        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John")
        expect(customer.Address).toBeUndefined()

    })

    it("it shoud create a Customer with an address" , ()=> {

        const address = new Address("Street",123,"00-2","City")
        const customer = CustomerFactory.createWithAddress("John", address)

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John")
        expect(customer.Address).toBe(address)
    })
})