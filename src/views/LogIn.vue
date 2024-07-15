<script setup lang="ts">
import { useAuthUser } from '@/composables/useAuthUser'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { LoginInfo } from '@/composables/useAuthUser'

const router = useRouter()
const { login } = useAuthUser()

const error = ref('')

const form = ref<LoginInfo>({
    username: '',
    password: '',
})

async function handleSubmit() {
    try {
        await login({ ...form.value })
        router.push('/')
    } catch (err) {
        error.value = (err as any).message
    }
}
</script>
<template>
    <form class="card" @submit.prevent="handleSubmit">
        <div class="card-body">
            <h2 class="card-title">Login to Your Account</h2>

            <label>
                <div class="label">Username</div>
                <input type="text" v-model="form.username" />
            </label>
            <label>
                <div class="label">Password</div>
                <input type="password" v-model="form.password" />
            </label>

            <div class="card-actions">
                <div
                    class="text-error"
                    :class="{
                        invisible: !error,
                    }"
                >
                    {{ error }}
                </div>
                <button class="btn btn-primary">Login</button>
            </div>
        </div>
    </form>
</template>
