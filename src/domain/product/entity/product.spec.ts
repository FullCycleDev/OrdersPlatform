
import Order from "../../checkout/entity/order"
import Product from "./product"

describe("Product unit test", () => {

    it("should throw error when id is empty", () => {

        expect(() => {

            const product = new Product("", "Product 1", 100)
        }).toThrowError("Id is required")
    })

    it("should throw error when name is empty", () => {

        expect(() => {

            const product = new Product("123", "", 100)
        }).toThrowError("Name is required")
    })


    it("should throw error when price is required", () => {

        expect(() => {

            const product = new Product("123", "Product 1 ", -1)
        }).toThrowError("Price must be greater than zero")
    })


    it("should change name", () => {

        const product = new Product("123", "Product 1", 100)
        product.name = "Product 2"

        expect(product.name).toBe("Product 2")

    })

})