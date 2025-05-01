import './App.css'

function App() {

  // Data type

  // Number
  // "", '', ``
  // let price = 16.90;
  // console.log(`Your age : ${price}`)

  // String
  // let name = "John";
  // let lastname = "Doe";
  // console.log(`${name} ${lastname}`);

  // Boolean true, false
  // let isLoggedIn = false;
  // if(!isLoggedIn){ // not + true
  //   console.log("Please log in first.");
  // }

  // Typeof
  // function x() {}
  // console.log(typeof(x));

  // undefined vs null
  // let x = null;
  // console.log(x);

  // var, let, const
  // let name = "abc";
  // function x(){
  //   console.log(name);
  // }

  // console.log(x());

  // const pi = 3.14;
  // pi = 3.18;

  // console.log(pi)

  // function sayHi(name) {
  //   return "Hello, " + name;
  // }

  // console.log(sayHi("John Doe"));

  // function add(num1, num2){
  //   return num1 + num2;
  // }

  // const result = add(2,3);
  // console.log(result);


  // function result(){
  //   console.log("Arrow");
  // }

  // const result = (n1) => {
  //   return n1;
  // }

  // console.log(result(2));

  // const greet = name => {
  //   let msg = `Hello ${name}`;
  //   console.log(msg);
  // }

  // greet("GoMez");

  // const user = {
  //   name: "John",
  //   lastname: "Doe",
  //   age: 51,
  //   address: {
  //     destrict: "Donmueng",
  //     province: "Bangkok"
  //   }
  // }

  // console.log(user.address.destrict);

  // let colors = ["red", "green", "blue"];
  // console.log(colors[2]);

  // function process(data, callback){
  //   callback(data)
  // }

  // process("AB", (msg) => console.log(msg));

  // const nums = [1,2,3,4,5,6];
  // const result = nums.map((n) => n * 2);
  // console.log(result);

  // const people = [
  //   {name: "John"},
  //   {name: "Jane"},
  //   {name: "Jan"}
  // ];

  // const names = people.map(p => p.name);
  // console.log(names);

  // .Filter
  // const names = ["Hotel", "Apartment", "Resort", "Villa"];
  // // const result = names.filter(n => n === "Resort");
  // const result = names.filter(n => n.toLowerCase().includes(("E").toLowerCase()));
  // console.log(result);

  // Ternary Operator
  // let age = 20;
  // let canVote = age >= 18 ? "Yes" : "No";

  // console.log(canVote);

  // Array destructuring
  // const arr = [1,2,3];
  // const [a, b] = arr;
  // console.log(b);

  // Object destructuring
  // const person = { name: "Tom", age: 22 };
  // const {name, age} = person;

  // console.log(name, age)

  // const student = {
  //   name: "Jane",
  //   address: {
  //     city: "Bangkok",
  //     zip: 10110
  //   }
  // }
  // const {name, address: { city }} = student;
  // console.log(name);

  // Logical Operators: ||, &&, ??, Optional Chaining ?
  // let username = "xxx";
  // console.log(username || "ano");

  // คำอธิบาย:
// username มีค่าเป็น "" (string ว่าง) ซึ่งถือเป็น falsy
// "Anonymous" เป็น truthy (มีค่า)

// let isAdmin = false;
// isAdmin && console.log("Welcome Admin");

// Nullish coalescing (??) สำหรับกำหนด ค่าเริ่มต้น (default value) เมื่อค่าซ้ายเป็น null หรือ undefined เท่านั้น
// let input = null;
// let output = input ?? "Default";

// console.log(output);

// Optional chaining  (?.) เป็นเครื่องมือที่ช่วยให้เราสามารถเข้าถึงคุณสมบัติ (properties) หรือเรียกใช้งานฟังก์ชันในอ็อบเจกต์ที่อาจไม่มีตัวตน อยู่ได้อย่างปลอดภัย โดยไม่ต้องเช็กด้วย if ซ้ำ ๆ
// let data = { user: {name: "Alice"} };

// if(data.user && data.user.name){
//   console.log(data.user.name);
// }else{
//   console.log("No name");
// }

// console.log(data?.user?.profile);

// Spread Operator (...) เครื่องมือที่ใช้ กระจาย (spread) ข้อมูลใน Array, Object หรือ Iterable อื่น ๆ ออกมาเป็นองค์ประกอบเดี่ยว ๆ ช่วยให้เขียนโค้ดได้กระชับและชัดเจนขึ้นมาก
// let arr1 = [1,2];
// let arr2 = [...arr1, 3,4];

// console.log(arr2);

// let obj1 = { a: 1 };
// let obj2 = { b: 2 };
// let merged = {...obj1, ...obj2}

// console.log(merged);

// Rest Parameter (...rest) คือการ รวบรวมค่าหลาย ๆ ค่า ที่ส่งเข้ามาในฟังก์ชัน ให้อยู่ในรูปของ Array ซึ่งช่วยให้เรารับ arguments แบบยืดหยุ่น โดยไม่จำเป็นต้องกำหนดจำนวนแน่นอนล่วงหน้า
// function sum(...nums){
//   console.log(nums);
// }

// sum(1, 2, 3);

function show(num1, ...nums){
  console.log(num1);
  console.log(nums);
}

show(10, 2, 3, 4, 5);


  return (
    <>fragment</>
  )
}

export default App
