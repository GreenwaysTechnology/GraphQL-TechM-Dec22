//functions
//es 6 default args
function calculate(a: number = 0, b: number = 0): number {
    return a + b
}
console.log(calculate(10, 10))
// console.log(calculate()) //error no arg is passed
// console.log(calculate("10","10"))
console.log(calculate())

//void 
function doStuff(): void {
    return
}
//ts optional parameters
function fetchData(url?: string, method?: string): void {
    console.log(url, method)
}
fetchData("/api/users", "GET")
fetchData()

//union types
//value must be "Male" or "Female" | "Third"
function fetchUsers(gender: "Male" | "Female" | "Third" = "Male", id?: string | number) {
    console.log(id, gender)
}
fetchUsers("Male")
fetchUsers("Female", 92)
fetchUsers("Male", 122)
//fetchUsers("xxx")
