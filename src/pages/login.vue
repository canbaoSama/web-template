<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Lock, UserFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

import type { LoginForm } from '@/types/login'
import { request } from '@/utils/axios'
import { api } from '@/api/index'

import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const rules = reactive<FormRules>({
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    passwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const formRef = ref<FormInstance>()
const loginData = ref<LoginForm>({
    userName: '',
    passwd: '',
})

async function passwdLogin() {
    await formRef.value?.validate()
    const res = await request(api.passwdLogin, loginData.value, { method: 'post' })
    userStore.saveUserInfo(res?.data)
    ElMessage.success('登录成功，正在跳转中...')
}

function resetForm() {
    loginData.value = {
        userName: '',
        passwd: '',
    }
    formRef.value?.resetFields()
}
</script>

<template>
    <div class="absolute-full flex-center-center bg-img-cover shadow-blue-12" style="background-image: url('src/assets/images/login_bg.png')">
        <ElForm ref="formRef" :model="loginData" class="w-80 pt-8 px-6 pb-6" :rules="rules">
            <ElFormItem prop="userName">
                <ElInput v-model="loginData.userName" placeholder="用户名">
                    <template #prepend>
                        <ElIcon>
                            <UserFilled />
                        </ElIcon>
                    </template>
                </ElInput>
            </ElFormItem>
            <ElFormItem prop="passwd">
                <ElInput v-model="loginData.passwd" type="password" placeholder="密码">
                    <template #prepend>
                        <ElIcon>
                            <Lock />
                        </ElIcon>
                    </template>
                </ElInput>
            </ElFormItem>
            <ElFormItem class="flex-center-center">
                <ElButton type="primary" @click="passwdLogin">
                    登录
                </ElButton>
                <ElButton type="default" @click="resetForm">
                    重置
                </ElButton>
            </ElFormItem>
        </ElForm>
    </div>
</template>
