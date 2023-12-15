// 项目公共配置
export const BASE_URL = '/api'

// 公共的延迟数据，比如表格点击，请求避免重复设置的延迟
export const PUBLIC_SETTIMEOUT_TIME = 100

// axios 配置
export const AXIOS_CONFIG = {
    BASE_URL,
    TIME_OUT: 10 * 1000,
    DEFAULT_MSG: '接口请求错误',
    REPEAT_MSG: '重复请求',
}
