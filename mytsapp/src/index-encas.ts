//private,public 


class Customer {
    //instance variables
    public id: number
    public firstName: string
    public lastName: string
    constructor(id: number = 1, firstName: string = "", lastName: string = "") {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
    }

}
class CustomerRepository {
    constructor() { }
    //methods
    public findAll() {
        return ['customers']
    }
    public save() {
        return 'save'
    }
    public remove() {
        return 'remove'
    }
}

class User {
    private userName: string
    private password: string
}

function main(){
  let user = new User()
 // user.userName = ''
}
main()