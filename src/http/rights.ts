// 封装获取权限列表的请求相关方法

// 导入封装好的axios实例
import http from './index'

import {getRightListReturnType} from '../types/rights'

// 获取list类型的权限列表api
export const getRightListHttp = ():Promise<getRightListReturnType>=>http.get('rights/list')