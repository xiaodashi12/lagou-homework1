class Container {
    static of(val){
        return new Container(val)
    }
    constructor(val) {
        this._val = val;//定义一个内容的变量不被访问到
    }
    map(fn) {
        return new Container(fn(this._val))
    }
}
class Maybe {
    static of (x) {
        return new Maybe(x)
    }
    constructor(val) {
        this._value = val
    }
    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
    isNothing() {
        return this._value === null || this._value === undefined
    }
}
module.exports = {Container, Maybe} 