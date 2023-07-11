<template>
    <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
        <div class="main-left">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <h1 class="mb-6 text-2xl">Se connecter</h1>

                <p class="mb-6 text-gray-500">
                    Renseigner le formulaire ci-joint afin que vous puissiez vous connecter, n'oubliez pas de spécifier votre rôle.
                </p>

                <p class="font-bold">
                    Si vous ne disposez pas d'un compte, vous avez la possibilité de vous enregistrer en suivant le                    
                    <a href="https://docs.google.com/forms/d/1jCgQ8O06r7RqGWUBjq6-XR05NysNwd_f2cKT9gX_Dvk" 
                        class="underline hover:text-red-700" target="_blank">
                        lien</a>.						
				</p>

                <p class="font-bold">
                    Vous êtes une entreprise ? vous pouvez consulter le
                    <RouterLink :to="{ 'name': 'newoffer' }" class="underline hover:text-red-700">lien</RouterLink>
                    afin que vous puissiez publier une offre
                </p>
            </div>
        </div>

        <div class="main-right">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <form class="space-y-6" v-on:submit.prevent="submitForm">
                    <div>
                        <label>E-mail</label><br>
                        <input type="email" v-model="form.email"  placeholder="Votre adresse e-mail"
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" required>
                    </div>

                    <div>
                        <label>Mot de passe</label><br>
                        <input type="password" v-model="form.password" placeholder="Votre Mot de passe"
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" required>
                    </div>

                    <template v-if="errors.length > 0">
                        <div class="bg-red-600 my-4 text-white rounded-lg p-6">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                    </template>

                    <div>
                        <button class="py-4 px-6 bg-red-700 text-white rounded-lg hover:bg-red-900">Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { useUserStore } from '@/stores/user'

export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },

    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            errors: []
        }
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

    mounted() {
        this.checkConnexion()
    },

    methods: {
        checkConnexion() {
            if (this.userStore.user.isAuthenticated) {
                if(this.userStore.user.isAdmin === 'true'){
                    this.$router.push('/stat');
                } else if(this.userStore.user.isGraduate === 'true') {
                    this.$router.push('/jobs');
                }else {
                    this.$router.push('/internships');
                }
            }
        },
        async submitForm() {
            this.errors = []

            if (this.form.email === '') {
                this.errors.push('Veuillez remplir votre email')
            }

            if (this.form.password === '') {
                this.errors.push('Veuillez remplir votre mot de passe')
            }

            if (this.errors.length === 0) {

                await axios
                    .post('/api/login/', this.form)
                    .then(response => {
                        this.userStore.setToken(response.data)

                        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
                    })
                    .catch(error => {
                        console.log('error', error)

                        this.errors.push('Email ou mot de passe incorrect!')
                    })
            }
            
            if (this.errors.length === 0) {
                await axios
                    .get('/api/me/')
                    .then(response => {


                        this.userStore.setUserInfo(response.data)


                        if(this.userStore.user.isAdmin === true){
                            this.$router.push('/addusers')
                        }
                        else if(this.userStore.user.isGraduate === true){
                            this.$router.push('/jobs')
                        }
                         else {
                            this.$router.push('/internships')
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }
        }
    }
}
</script>