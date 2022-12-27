class Address {
    constructor(public city: string = "Coimbatore") { }
}

class Customer {
    constructor(public id: number = 1, public firstName: string = "", public lastName: string = "", public address: Address = new Address()) { }
}
function main() {
    let cust = new Customer()
    console.log(cust)
}
main()