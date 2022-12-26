//variable declarations with type
let firstName: string = "Subramanian"
console.log("first Name " + firstName)
console.log('First Name' + firstName)
//es 6 template literal: interploation
console.log(`First Name ${firstName}`)
//verify the type safty
//firstName =90 // error TS2322: Type 'number' is not assignable to type 'string'.
firstName = "Ram"

//another syntax to declare variables : Type inference
//here there is no explicit, the variable type is understood, based on value
let lastName = "Murugan"
console.log(`last Name ${lastName}`)
// lastName =90

//numbers
let age: number = 42
console.log(`Age ${age}`)

//booleans
let active: boolean = true
console.log(`Status ${active}`)

//undefined : implicit undefined
let salary;
console.log(`salary ${salary}`)
salary = 100;
console.log(`salary ${salary}`)
salary ="1000"

//any : instead of declaraing undefined it is recommended to use any.
//any means i dont know the type of variable at present
//any means i dont want any specific type for the variable.
let somevar:any 
console.log(`SomeVar ${somevar}`)
somevar =10
console.log(`SomeVar ${somevar}`)
somevar =true
console.log(`SomeVar ${somevar}`)

//NaN -  Not a Number : it is runtime error code, which is thrown during runtime if computation fails

let a  //undefined
let b =10; // number

// c  = undefined * number => NaN
let c = a * b 
console.log(`c ${c}`)

//infinity
let d = 10/0
console.log(`d ${d}`)




