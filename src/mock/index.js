import Mock from 'mockjs'
const BASE_URL = import.meta.env.BASE_URL

Mock.setup({
  timeout: 10 // 模拟接口延时
})
// Mock.XHR.prototype.withCredentials = true // 配置跨域携带cookies
import { cities, area, month } from './data'


const userInfo = {
  token: '123asd56asd43x2ca65weax321-856vas',
  roleId: 1,
  username: 'nkxrb',
  menuIds: [1, 2, 3, 11, 12, 13, 14]
}
const success = {
  code: 200,
  msg: 'success'
}

/**
  url: '/login', // 必填 要模拟的接口url
  type: 'post', // 默认post
  disable: false, // 是否禁用mock,使用真实接口，默认false
  data: userList // 必填
 */
const mockList = [
  {
    url: 'login',
    data: { ...success, result: userInfo }
  },
  {
    url: 'list-inc',
    data: {
      ...success,
      'data|20': [
        { name: '@province', 'value': '@natural(1600, 59600)' }
      ]
    }
  },
  {
    url: 'list-text',
    data: {
      ...success,
      'data|50': [
        {
          name: '@cword(2, 5)',
          value: '@natural(1600, 59600)'
        }
      ]
    }
  },
  {
    url: 'list-area',
    data: {
      ...success,
      'data|5': [
        {
          'name|+1': area,
          value: '@natural(1600, 5600)'
        }
      ]
    }
  },
  {
    url: 'list-city',
    data: {
      ...success,
      'data|22': [
        {
          'name|+1': cities,
          value: '@natural(1600, 5600)'
        }
      ]
    }
  },
  {
    url: 'list-month',
    data: {
      ...success,
      'data|12': [
        {
          'name|+1': month,
          value: "@natural(1600, 59600)",
          gdp: "@natural(821000, 8199040)",
          gdp2: "@natural(940100, 9199040)",
          people: "@natural(2100, 19040)",
          subway: "@natural(1700, 5466)",
          ratio: function () {
            return Number.prototype.toFixed.call(this.gdp2 / this.gdp * 100, 2)
          }
        }
      ]
    }
  },
  {
    url: 'relationCities',
    data: {
      ...success,
      'data|22': [
        {
          'name|+1': cities,
          value: "@natural(1600, 59600)",
          va: "@natural(2100, 19040)",
          vb: "@natural(1700, 5466)",
          tos: function () {
            let value = Mock.mock("@natural(1600, 9600)")
            let toVal = this.value - value
            return [{
              name: Mock.mock({ 'name|1': cities }).name,
              value,
              toVal
            }]
          },
          ratio: function () {
            return Number.prototype.toFixed.call(this.va / (this.va + this.vb) * 100, 2)
          }
        }
      ]
    }
  }
]

mockList.forEach(item => {
  Mock.mock(BASE_URL + item.url, item.data)
})
