
class CustomerRepository {
    constructor() { }
    //methods
    findAll() {
        return ['customers']
    }
    save() {
        return 'save'
    }
    remove() {
        return 'remove'
    }
}
function main() {
    let customerReposistory = new CustomerRepository()
    console.log(customerReposistory.findAll())
    console.log(customerReposistory.save())
    console.log(customerReposistory.remove())

}
main()