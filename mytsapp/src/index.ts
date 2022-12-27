import { CustomerService } from "./services/customer.service";

function main(){
   let customerService = new CustomerService()
   console.log(customerService.findAll())
}
main()