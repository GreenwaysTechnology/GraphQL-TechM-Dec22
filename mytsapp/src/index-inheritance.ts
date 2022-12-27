//class based

abstract class Account {
    constructor() {
        console.log('Account class')
    }
    updateProfile() {
        return 'update profile'
    }
    abstract changePassword()
}
//interfaces
interface Deposit {
    deposit(): number
}

class SavingsAccount extends Account implements Deposit {
    constructor() {
        super()
        console.log('SavingsAccount class')
    }
    deposit(): number {
        return 100
    }
    changePassword() {
        return 'password'
    }
}
function main() {
    let acc = new SavingsAccount()
    console.log(acc.deposit())
    console.log(acc.updateProfile())
}
main()