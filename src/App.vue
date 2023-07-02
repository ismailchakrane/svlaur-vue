<template>
    <body class="min-h-screen flex flex-col">

        <nav class="py-2 px-8 border-b border-gray-200">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-center justify-between">
                    <div class="menu-left">
                        <RouterLink to="/jobs" v-if="(userStore.user.isAuthenticated === 'true')  && (userStore.user.isAdmin === 'false')"  title="Accueil">
                            <img class="w-30 h-24 px-0 mx-0 max-h-full" src="/images/logo.png" alt="Logo" />
                        </RouterLink>

                        <RouterLink to="/jobs" v-if="(userStore.user.isAuthenticated === 'true') && (serStore.user.isAdmin === 'true')" title="Accueil">
                            <img class="w-30 h-24 px-0 mx-0 max-h-full" src="/images/logo.png" alt="Logo" />
                        </RouterLink>

                        <RouterLink to="/" v-else title="Accueil">
                            <img class="w-30 h-24 px-0 mx-0 max-h-full" src="/images/logo.png" alt="Logo" />
                        </RouterLink>
                    </div>

                    <div class="menu-center flex space-x-12" v-if="userStore.user.isAuthenticated && userStore.user.isAdmin === 'false'">

                        <RouterLink class="hover:text-red-700" to="/jobs" title="Emplois" :class="{ 'text-red-700': isURLContainsRoute('/jobs') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                        </RouterLink>

                        <RouterLink class="hover:text-red-700" to="/internships" title="Stages"
                            :class="{ 'text-red-700': isURLContainsRoute('/internships') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                            </svg>
                        </RouterLink>

                        <RouterLink class="hover:text-red-700" to="/graduates" title="Lauréats"
                            :class="{ 'text-red-700': isURLContainsRoute('/graduates') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        </RouterLink>

                        <button
                        class="hover:text-red-700"
                        title="Deconnexion"
                        @click="logout"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        </button>

                    </div>


                    
                    <div class="menu-center flex space-x-12" v-if="userStore.user.isAuthenticated && userStore.user.isAdmin === 'true'">

                        <RouterLink  class="hover:text-red-700" to="/stat" title="Statistiques"
                            :class="{ 'text-red-700': isURLContainsRoute('/stat') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" 
                                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                            </svg>

                        </RouterLink>                        
                        
                        <RouterLink  class="hover:text-red-700" to="/addusers" title="Ajouter des utilisateurs"
                            :class="{ 'text-red-700': isURLContainsRoute('/addusers') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                        </RouterLink>

                        <RouterLink  class="hover:text-red-700" to="/users" title="Liste des utilisateurs"
                            :class="{ 'text-red-700': isURLContainsRoute('/users') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                        </RouterLink>

                        <RouterLink  class="hover:text-red-700" to="/offers" title="Liste des offres"
                            :class="{ 'text-red-700': isURLContainsRoute('/offers') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" 
                                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                            </svg>

                        </RouterLink>


                        <button
                        class="hover:text-red-700"
                        title="Deconnexion"
                        @click="logout"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        </button>
                    </div>

                    <div class="menu-right">
                        <template v-if="userStore.user.isAuthenticated && userStore.user.id">
                            <h3>{{ this.userStore.user.lastName + ' ' + userStore.user.firstName }}</h3>
                        </template>

                        <template v-else>
                            <div :class="{ 'hidden-element': isNotLogin() }" class="menu-right">
                                <RouterLink to="/login"
                                    class="mr-4 py-4 px-6 bg-red-700 hover:bg-red-900 text-white rounded-lg">Se
                                    connecter</RouterLink>
                            </div>
                        </template>
                    </div>


                </div>
            </div>
        </nav>


        <main class="flex-grow px-8 py-6 bg-gray-100">
            <RouterView />
        </main>

        <Toast />

        <footer class="text-center bg-red-700 py-4 mt-auto">
            <p class="text-sm text-white">École Nationale supérieure d’Arts et Métiers de Rabat</p>
            <p class="text-sm text-white">&copy; 2022 - 2023</p>
        </footer>

    </body>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router';


import axios from 'axios'
import Toast from '@/components/Toast.vue'
import { useUserStore } from '@/stores/user'


export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },
    components: {
        RouterLink,
        RouterView,
        Toast
    },
    beforeCreate() {
        this.userStore.initStore()
        
        const token = this.userStore.user.access

        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            axios.defaults.headers.common["Authorization"] = "";
        }
    },
    methods: {
        isURLContainsRoute(route) {
            return this.$route.path === route;
        },
        isNotLogin() {
            if (this.$route.path === '/login' ) {
                return true;
            }

            return false;
        },

        logout() {
            // console.log('Log out')
            this.userStore.removeToken()
            this.$router.push('/')
        }
    },
};
</script>

<style>
.hidden-element {
    visibility: hidden;
}
</style>