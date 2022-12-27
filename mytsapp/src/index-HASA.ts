
class Address {
    public city: string
    constructor(city: string = "Coimbatore") {
        this.city = city
    }
}

class Customer {
    public id: number
    public firstName: string
    public lastName: string
    //has a 
    public address: Address
    constructor(id: number = 1, firstName: string = "", lastName: string = "", address: Address = new Address()) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.address = address
    }
}
function main(){
    let cust = new Customer()
    console.log(cust)
}
main()