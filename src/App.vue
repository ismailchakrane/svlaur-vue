<template>
    <body class="min-h-screen flex flex-col">

        <nav class="py-10 px-8 border-b border-gray-200">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-center justify-between">
                    <div class="menu-left">
                        <RouterLink to="/jobs" v-if="userStore.user.isAuthenticated === true" title="Accueil">
                            <img class="w-30 h-24 px-0 mx-0 max-h-full" src="/images/logo.png" alt="Logo" />
                        </RouterLink>

                        <RouterLink to="/" v-else title="Accueil">
                            <img class="w-30 h-24 px-0 mx-0 max-h-full" src="/images/logo.png" alt="Logo" />
                        </RouterLink>
                    </div>

                    <div class="menu-center flex space-x-12" v-if="userStore.user.isAuthenticated">

                        <RouterLink to="/jobs" title="Emplois" :class="{ 'text-red-700': isURLContainsRoute('/jobs') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                        </RouterLink>

                        <RouterLink to="/internships" title="Stages"
                            :class="{ 'text-red-700': isURLContainsRoute('/internships') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                            </svg>
                        </RouterLink>

                        <RouterLink to="/graduates" title="Lauréats"
                            :class="{ 'text-red-700': isURLContainsRoute('/graduates') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        </RouterLink>

                        <RouterLink to="/settings" title="Paramètres"
                            :class="{ 'text-red-700': isURLContainsRoute('/settings') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </RouterLink>

                    </div>

                    <div class="menu-center flex space-x-12" v-else>
                    </div>

                    
                    <div class="menu-center flex space-x-12" v-if="userStore.user.isAdmin === true">
                        <RouterLink  to="/allusers" title="Ajouter un utilisateur"
                            :class="{ 'text-red-700': isURLContainsRoute('/addusers') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                        </RouterLink>

                        <RouterLink  to="/addusers" title="Ajouter un utilisateur"
                            :class="{ 'text-red-700': isURLContainsRoute('/addusers') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                        </RouterLink>
                    </div>

                    <div class="menu-right">
                        <template v-if="userStore.user.isAuthenticated && userStore.user.id">
                            <h3>{{ this.userStore.user.lastName + ' ' + userStore.user.firstName }}</h3>
                        </template>

                        <template v-else>
                            <div :class="{ 'hidden-element': isNotInLoginRoute() }" class="menu-right">
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

        console.log(this.userStore.user.isAuthenticated)

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
        isNotInLoginRoute() {
            if (this.$route.path === '/login') {
                return true;
            }

            return false;
        }
    },
};
</script>

<style>
.hidden-element {
    visibility: hidden;
}
</style>