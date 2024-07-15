import { createWebHistory, createRouter } from 'vue-router'
//@ts-expect-error Vue: Could not find a declaration file for module
import LogInView from '@/views/LogIn.vue'
//@ts-expect-error Vue: Could not find a declaration file for module
import UserProfileView from '@/views/UserProfile.vue'
//@ts-expect-error Vue: Could not find a declaration file for module
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
