<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

        <h3 class="mb-6 text-xl"><strong>Publier une offre</strong></h3>

        <div class="main-right main-center col-span-4 space-y-1">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <form class="space-y-6" v-on:submit.prevent="submitForm">
                    <div>
                        <label>Nom d'offre</label><br>
                        <input type="email"  v-model="form.offerName" placeholder="Votre adresse e-mail"
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    </div>

                    <div>
                        <label>Nom d'entreprise</label><br>
                        <input type="email"  v-model="form.companyName" placeholder="Votre adresse e-mail"
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    </div>

                    <div>
                        <label>Image (si nécessaire)</label><br>
                        <input type="file" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" accept="image/*" name="myfile"/>
                    </div>
                    
                    <!-- 
                    <div>
                        <label>Annonce PDF (si nécessaire)</label><br>
                        <input type="file" v-model="form.offerName" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" accept=".pdf" name="myfile"/>
                    </div> 
                    -->

                    <div>
                        <label>Type d'offre</label><br>
                        <select v-model="form.offerType" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                            <option value="internship">Stage</option>
                            <option value="job">Offre d'emplois</option>
                        </select>
                    </div>

                    <div>
                        <label>Description</label><br>
                        <textarea v-model="form.offerDescription"  class="p-4 my-2 w-full bg-gray-100 rounded-lg" placeholder="Descrption de l'offre"></textarea>
                    </div>

                    <template v-if="errors.length > 0">
                        <div class="bg-red-600 my-4 text-white rounded-lg p-6">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                    </template>

                    <div>
                        <button class="py-4 px-6 bg-red-700 text-white rounded-lg hover:bg-red-900">Publier</button>
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
                offerName: '',
                companyName: '',
                offerType: '',
                offerDescription: '',
                offerImg: '',
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



    // mounted() {
    //     this.checkUser()
    // },

    methods: {

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
                        if(this.userStore.isGraduate === true){
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

        // checkUser() {
        //     if (this.userStore.user.isAuthenticated) {
        //         this.$router.push('/jobs');
        //     } else {
        //         this.$router.push('/newoffer');
        //     }
        // }
    }
}

</script>



