import { createWebHistory, createRouter } from 'vue-router'
//@ts-ignore
import LogInView from '@/views/LogIn.vue'
//@ts-ignore
import UserProfileView from '@/views/UserProfile.vue'
import { useAuthUser } from '@/composables/useAuthUser'

const routes = [
    { path: '/', component: UserProfileView, meta: { requiresAuth: true } },
    { path: '/login', component: LogInView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const { user } = useAuthUser()
    if (to.meta.requiresAuth && !user.value) {
        return '/login'
    }
})
