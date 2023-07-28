import { defineStore } from 'pinia'

import type { LoginUserInfo } from '@/types/login'

export const useUserStore = defineStore('user', () => {
    let userInfo: LoginUserInfo = {
        id: 1,
        token: '2',
        userName: '3',
    }

    const saveUserInfo = (loginRes: LoginUserInfo) => {
        userInfo = loginRes
    }

    return { userInfo, saveUserInfo }
})
