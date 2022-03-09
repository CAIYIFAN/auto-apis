var assert = require('assert');
var { toTsType } = require('../utils/index')

const obj1 = {
  msg: 'success',
  ret: '0'
}

const obj2 = {
  msg: 1,
  ret: 1,
}

const obj3 = {
  msg: {
    ret: 'success'
  }
}

const obj4 = {
  msg: {
    ret: 1
  }
}

const obj5 = {
  list: [1,2,3]
}

const obj6 = {
  list: ['1', '2', '3']
}

const obj7 = {
  list: [{a: '1'},{a: '2'}]
}

const obj8 = {
  list: [{a: 1},{a: 2}]
}

const obj9 = {
  msg: {
    list: [1,2,3]
  }
}

const obj10 = {
  msg: {
    list: ['1', '2', '3']
  }
}

const obj11 = {
  msg: {
    list: [{a: '1'},{a: '2'}]
  }
}

const obj12 = {
  msg: {
    list: [{a: 1},{a: 2}]
  }
}

const obj13 = {
  msg: true
}

const obj14 = {
  list: [true, false]
}

const obj15 = {
  msg: {
    list: [true, false]
  }
}

const obj16 = {
  msg: {
    list: [{a: true}, {b: false}]
  }
}

describe('基础测试', function() {
  it('字符串', function() {
    assert.equal( toTsType(obj1), '{msg:string;ret:string;}')
  })
  it('数字', function() {
    assert.equal( toTsType(obj2), '{msg:number;ret:number;}')
  })
  it('对象+字符', function() {
    assert.equal( toTsType(obj3), '{msg:{ret:string;}}')
  })
  it('对象+数字', function() {
    assert.equal( toTsType(obj4), '{msg:{ret:number;}}')
  })
  it('数组+数字', function() {
    assert.equal( toTsType(obj5), '{list:Array<number> | [];}')
  })
  it('数组+字符', function() {
    assert.equal( toTsType(obj6), '{list:Array<string> | [];}')
  })
  it('数组+对象+字符', function() {
    assert.equal( toTsType(obj7), '{list:Array<{a:string;}> | [];}')
  })
  it('数组+对象+字符', function() {
    assert.equal( toTsType(obj8), '{list:Array<{a:number;}> | [];}')
  })
  it('对象+数组+数字', function() {
    assert.equal( toTsType(obj9), '{msg:{list:Array<number> | [];}}')
  })
  it('对象+数组+字符', function() {
    assert.equal( toTsType(obj10), '{msg:{list:Array<string> | [];}}')
  })
  it('对象+数组+对象+字符', function() {
    assert.equal( toTsType(obj11), '{msg:{list:Array<{a:string;}> | [];}}')
  })
  it('对象+数组+对象+数字', function() {
    assert.equal( toTsType(obj12), '{msg:{list:Array<{a:number;}> | [];}}')
  })
  it('布尔值', function() {
    assert.equal( toTsType(obj13), '{msg:boolean;}')
  })
  it('数组+布尔值', function() {
    assert.equal( toTsType(obj14), '{list:Array<boolean> | [];}')
  })
  it('对象+数组+布尔值', function() {
    assert.equal( toTsType(obj15), '{msg:{list:Array<boolean> | [];}}')
  })
  it('对象+数组+对象+布尔值', function() {
    assert.equal( toTsType(obj16), '{msg:{list:Array<{a:boolean;}> | [];}}')
  })
})