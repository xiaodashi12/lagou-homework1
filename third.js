const fp = require('lodash/fp')
const cars = [
    {name:'Ferrari FF', horsepower:660, dollar_value:700000, in_stock:true},
    {name:'Spyker C12 Zagator', horsepower:650, dollar_value:648000, in_stock:false},
    {name:'Jaguar XKR-S', horsepower:550, dollar_value:132000, in_stock:false},
    {name:'Audi R8', horsepower:525, dollar_value:114200, in_stock:false},
    {name:'Aston Martin One-77', horsepower:750, dollar_value:1850000, in_stock:true},
    {name:'Pagani Huayra', horsepower:700, dollar_value:1300000, in_stock:false},
]
//1、使用函数组合fp.flowRight()重新实现下面函数
// let isLastInStock = function(cars) {
//     let last_car = fp.last(cars)
//     return fp.prop('in_stock',last_car)
// }

const isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(isLastInStock(cars))

// 2、使用fp.flowRight() fp.prop() fp.first()获取第一个car的name

const isFirstInName = fp.flowRight(fp.prop('name'), fp.first)
console.log(isFirstInName(cars))

//3、使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现
// let _average = function(xs){
//     return fp.reduce(fp.add,0,xs)/xs.length
// }
// let averageDollarValue = function(cars){
//     let dollar_values = fp.map((cars)=>{
//         return cars.dollar_value
//     },cars)
//     return _average(dollar_values)
// }

const fn = fp.map(item => item.dollar_value)
const averge = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
const averageDollarValue = fp.flowRight(averge, fn)
console.log(averageDollarValue(cars)) 

// 4、使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换成这种形式。
const underScore = fp.replace(/\W+/g, '_')
var Array = ['Hello World']
const sanitizeNames= fp.flowRight(underScore, fp.toLower)
var newArr = []
newArr.push(sanitizeNames(Array))
console.log(newArr)