//定义三种状态
//等待中
const PENDING = 'pending'
//操作成功
const FULFILLED = 'fulfilled'
//操作失败
const REJECTED = 'rejected'

class MyPromise {
    //构造函数
    constructor(executor) {
        try {
            executor(this.resolve, this.rejected)//立即执行函数
        } catch (error) {
            this.rejected(error)
        }
    }
    // promise状态
    status = PENDING
    // 成功后的值
    value = undefined
    // 失败后的原因
    reason = undefined
    // 成功回调
    successCb = []
    // 失败回调
    failCb = []
    resolve = value => {
        //如果状态不是等待的话，阻止程序向下执行
        if (this.status !== PENDING) return
        //将状态更改为成功
        this.status = FULFILLED;
        //保存成功之后的值
        this.value = value;
        while (this.successCb.length) {
            this.successCb.shift()()
        }
    }
    rejected = err => {
        if (this.status !== PENDING) return
        this.status = REJECTED;
        this.reason = err;
        while (this.failCb.length) {
            this.failCb.shift()()
        }
    }
    then(successCb, failCb) {
        successCb = successCb ? successCb : value => value;
        failCb = failCb ? failCb : err => { throw err }
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCb(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCb(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            } else {
                //等待
                this.successCb.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCb(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                });
                this.failCb.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCb(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                });
            }
        })
        return promise2;
    }
    catch(cb){
        return this.then(undefined,cb)
    }
    finally(cb) {
        return this.then(value => {
            return MyPromise.resolve(cb()).then(() => value);
        }, err => {
            return MyPromise.resolve(cb()).then(() => { throw err })
        })
    }
    static all(arr) {
        let result = [];
        let index = 0;

        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                result[key] = value;
                index++;
                if (index === arr.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < arr.length; i++) {
                let current = arr[i];
                if (current instanceof MyPromise) {
                    current.then(value => addData(i, value), err => reject(err))
                } else {
                    addData(i, arr[i])
                }
            }

        })
    }
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value
        } else {
            return new MyPromise((resolve) => resolve(value))
        }
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('重复引用数据'))
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}

let promise = new MyPromise((resolve, reject) => {
    resolve('OK')
})
promise.then().then().then(resolve => console.log(resolve), err => {
    console.log(err);

})
