
//customer type 
// class Customer {
//     id: number
//     name: string
//     city?:string  //optional field
// }

//interface as Type
// interface Customer {
//     id: number
//     name: string
//     city?:string  //optional field
// }

//type keyword
type Customer = {
    id: number
    name: string
    city?: string  //optional field
    gender?: "Male" | "Female" | "Third"
}

let customer: Customer = {
    id: 1,
    name: 'Subramanian',
    city: 'Coimbatore',
    gender: "Male"
}

let customer1: Customer = {
    id: 1,
    name: 'Subramanian'
}
///Arrays : collection of values
//generics

let customers: Array<Customer> = [
    {
        id: 1,
        name: 'Subramanian',
        gender: "Male"
    }
]












