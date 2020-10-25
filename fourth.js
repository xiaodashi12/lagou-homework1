const fp = require('lodash/fp')
const {Container, Maybe} = require('./suport.js')
//1、使用fp.add(x,y) fp.map(f,x)创建一个能让functor里的值增加的函数exl
let maybe = Maybe.of([5, 6, 1])
let ex1 = () => {
    const fn = fp.map(x => x)
    const averge = function(xs) {
        return fp.reduce(fp.add, 0, xs)
    }
    let r1 = maybe.map(fp.flowRight(averge, fn))
    return r1
}
console.log(ex1())

//2、实现一个函数ex2 ,能使用fp.first获取列表的第一个元素
let arr = ['do', 'ray', 'mi', 'fa', 'so', 'la', 'ti', 'do']
let maybed = Container.of(arr)
let ex2 = () => {
    const r2 = maybed.map(arr => fp.first(arr))
    return r2
}
console.log(ex2())

//3、实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母。
let safeProp = fp.curry(function(x, o){
    return Maybe.of(o[x])
})
let ex3 = () => {
    let user2 = {id:2, name:'Albert'}
    let r3 = safeProp('name', user2)
    const s3 = fp.map(fp.first)
    return s3(r3)
}
console.log(ex3())

//4、使用Maybe重写ex4 不要有if语句
let ex4 = (n) => {
    let r4 = Maybe.of(n).map(n => parseInt(n))
    return r4
}
console.log(ex4('211'))