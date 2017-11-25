/**
 * Created by wolfsheller on 2017/3/22.
 */
import Mock from 'mockjs'
import Merchant from './merchant/merchant.js'
import Domain from '../assets/domain.js'
let merchantUrl = Domain.merchantUrl
let agentUrl = Domain.agentUrl
let couponUrl = Domain.couponUrl
let centerUrl = Domain.centerUrl
let mallUrl = Domain.mallUrl

// 引入mock数据，方法为get
import merchantDetail from './merchant/merchantdetail.js'
import marketDetail from './merchant/marketdetail.js'
import merchantGooddetail from './merchant/merchantgooddetail.js'
import merOrders from './merchant/merorders.js'
import Junior from './agent/junior.js'
import Coupon from './coupon/coupon.js'
import Address from './center/address.js'
import Index from './mall/index.js'

// 引入mock数据，方法为post
import JuniorPost from './agent/juniorpost.js'

// get请求
// Mock.mock(merchantUrl + 'index', 'get', Merchant)
// Mock.mock(merchantUrl + 'details', 'get', merchantDetail)
// Mock.mock(merchantUrl + 'mardetails', 'get', marketDetail)
// Mock.mock(merchantUrl + 'gooddetails', 'get', merchantGooddetail)
Mock.mock(centerUrl + 'merorders', 'get', merOrders)
// Mock.mock(agentUrl + 'junior', 'get', Junior)
// Mock.mock(couponUrl + 'coupon', 'get', Coupon)
// Mock.mock(centerUrl + 'address', 'get', Address)
// Mock.mock(mallUrl + '1index', 'get', Index)

// post请求
// Mock.mock(agentUrl + 'junior', 'post', JuniorPost)
// Mock.mock(mallUrl + 'delcart1', 'get', function (options) {
//  console.log(options.body)
// })
// Mock.mock(centerUrl + 'editaddress', 'post', function (options) {
//   for (let item of Address.addressitems) {
//     if (options.body === "adid=" + item.adid) {
//       return item
//     }
//   }
// })
// Mock.mock(mallUrl + 'iscol', 'post', function (options) {
  // console.log(JSON.stringify(options))
  // return options.body
// })
// Mock.mock(centerUrl + 'submitaddress', 'post', function (options) {
//   console.log(options)
// })
// Mock.mock(couponUrl + 'coupon', 'post', function (options) {
//   console.log(options)
// })

export default Mock
