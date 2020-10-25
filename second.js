// 将下面异步代码改成promise的方式实现
// setTimeout(()=>{
//     var a = 'hello ';
//     setTimeout(()=>{
//         var b = 'lagou '
//         setTimeout(()=>{
//             var c = 'i love u'
//             console.log(a+b+c);
//         },10)
//     },10)
// },10)

function init(){
    return new Promise((resolve, reject) => {
        resolve('hello ')
    }).then(res => {
        return (res + 'lagou ')
    }).then(res => {
        return(res + 'i ❤  u')
    }).then(res => {
        console.log(res)
    })
}
init()