<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

        <h3 class="mb-4 whitespace-nowrap ml-48 text-xl"><strong>Modifier un utilisateur</strong></h3>

        <div class="main-right main-center col-span-5 space-y-1">
            <div class="p-20 mx-48 bg-white border border-gray-200 rounded-lg">
                <form class="space-y-3" v-on:submit.prevent="submitForm">
                    <div class="space-y-3">
                        <label>Nom
                            <input type="text"  v-model="form.user.last_name" placeholder="Nom"
                                class="w-full  m-2 p-4  border border-gray-200 rounded-lg" required>
                        </label>
                        
                        <label>Prénom
                            <input type="text"  v-model="form.user.first_name" placeholder="Prénom"
                                class="w-full m-2 p-4 border border-gray-200 rounded-lg" required>
                        </label>
                    </div>

                    <div class="space-y-3">
                        <label>Email</label><br>
                        <input type="email"  v-model="form.user.email"  placeholder="Email"
                            class="w-full m-2 p-4  border border-gray-200 rounded-lg" required>
                    </div>
                   

                    <div class="space-y-3">
                        <label>
                            Mot de pass
                            <input type="password"  v-model="form.user.password" placeholder=" Mot de pass"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg" minlength="8">
                        </label>

                        <label>
                            Filière
                            <input type="text"  v-model="form.user.major" placeholder="Filière"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg" required>
                        </label>
                    </div>


                    <div class="space-y-3">
                        
                        <label>
                            Année
                            <select v-if="form.user.year_of_major  === '1er' " v-model="form.user.year_of_major" class="w-full m-2 p-4 border border-gray-200 rounded-lg" required>
                                <option value="1er" selected>1er année</option>
                                <option value="2eme">2eme année</option>
                                <option value="3eme">3eme année</option>
                            </select>

                            <select v-if="form.user.year_of_major === '2eme' " v-model="form.user.year_of_major" class="w-full  m-2 p-4 border border-gray-200 rounded-lg" required>
                                <option value="1er">1er année</option>
                                <option value="2eme" selected>2eme année</option>
                                <option value="3eme">3eme année</option>
                            </select>

                            <select v-if="form.user.year_of_major === '3eme' " v-model="form.user.year_of_major" class="w-full  m-2 p-4 border border-gray-200 rounded-lg" required>
                                <option value="1er">1er année</option>
                                <option value="2eme">2eme année</option>
                                <option value="3eme" selected>3eme année</option>
                            </select>
                        </label>

                        <label v-if="form.user.is_graduate !== null">
                            Promo
                            <input type="text"  v-model="form.user.year_of_graduate" placeholder="Filière"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg">
                        </label>
                    </div>

                    <div v-if="form.user.is_graduate !== null" class="space-y-3">
                                                
                        <label>
                            Lauréat
                            <select v-if="form.user.is_graduate === false"  v-model="form.user.is_graduate" class="w-full m-2 p-4 border border-gray-200 rounded-lg" required>
                                <option value="0" selected>Non</option>
                                <option value="1">Oui</option>
                            </select>
                            <select v-else v-model="form.user.is_graduate" class="w-full m-2 p-4 border border-gray-200 rounded-lg" required>
                                <option value="0">Non</option>
                                <option value="1" selected>Oui</option>
                            </select>
                        </label>
        

                        <label>
                            Lien LinkedIn
                            <input type="text"  v-model="form.user.linkedin_link" placeholder="Lien LinkedIn"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg">
                        </label>
                    </div>

                    <div v-if="form.user.is_graduate !== null" class="space-y-3">
                        <label>
                            Lieu de travail (entreprise / organisation)
                            <input type="text"  v-model="form.user.place_of_work" placeholder="Lieu de travail"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg">
                        </label>

                        <label>
                            Titre du poste de travail
                            <input type="text"  v-model="form.user.job_title" placeholder="Titre du poste de travail"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg">
                        </label>
                    </div>


                    <template v-if="errors.length > 0">
                        <div class="bg-red-600 my-4 text-white rounded-lg p-6">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                    </template>

                    <div>
                        <button class="py-4 px-6 bg-red-700 text-white rounded-lg hover:bg-red-900">Modifier</button>
                    </div>
                </form>
            </div>
        </div>

	</div>



</template>

<script>

import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'

export default {
    setup() {
        const userStore = useUserStore();
        const toastStore = useToastStore()

        return {
            userStore,
            toastStore
            
        }
    },
    
    data() {

        return {
            form: {
                user: '',
            },
            errors: []
        }
    },

    async created() {
        try {
            // Fetch user data asynchronously
            const response = await axios.get(`/api/user/${this.$route.params.id}/`);
            // Store the user data
            this.form.user = response.data;
            this.form.user.password = '';
        } catch (error) {
            console.log('Error:', error);
            this.$router.push('/notfound');
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
        this.checkUser()
    },

    methods: {
        checkUser() {
            if (!this.userStore.user.isAdmin === 'true') {
                this.$router.push('/');
            }
        },
        submitForm() {
            this.errors = []

            const namePattern = /^[a-z ,.'-]+$/i;
            const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            const containsNumberPattern = /^\d+(\.\d+)?$/;
            const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
            const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"/;


            if(this.form.user.last_name.length < 3 || !namePattern.test(this.form.user.last_name)){
                this.errors.push("Nom doit être valide")
                return;
            }

            if(this.form.user.first_name.length < 3 || !namePattern.test(this.form.user.first_name)){
                this.errors.push("Prénom doit être valide")
                return;
            }

            if(!emailPattern.test(this.form.user.email)){
                this.errors.push("Email doit être valide")
                return;
            }

            if(this.form.user.major.length < 3 || containsNumberPattern.test(this.form.user.major)){
                this.errors.push('Filière doit avoir au moin 3 caractères et elle doit être valide')
                return;
            }

            if(this.form.user.linkedin_link !== null){
                if(this.form.user.linkedin_link < 30 || !urlPattern.test(this.form.user.linkedin_link)){
                    this.errors.push("Lien linkedIn doit être valide")
                    return;
                }
            }

            if(this.form.user.place_of_work !== null){
                if(this.form.user.place_of_work.length < 3 ){
                    this.errors.push("Nom d'entreprise doit avoir au moin 3 caractères")
                    return;
                }
            }

            if(this.form.user.job_title !== null){
                if(containsNumberPattern.test(this.form.user.job_title)){
                    this.errors.push("Titre d'emplois doit avoir au moin 10 caractères et doit être valide")
                    return;
                }
            }

            if(this.form.user.year_of_graduate !== null){
                if(this.form.user.year_of_graduate.length !== 9){
                    this.errors.push('Promotion doit avoir exactement 9 caractères (ex: 2022-2023)')
                    return;
                }
            }

            if(this.form.user.password !== null){
                if(passPattern.test(this.form.user.password) ){
                    this.errors.push("Mot de passe doit avoir au minimum 8 charactères, une majuscule, une miniscule, un nombre")
                    return;
                }
            }

            if (this.errors.length === 0) {

                this.form.user.last_name = this.form.user.last_name.toUpperCase();
                this.form.user.major = this.form.user.major.toUpperCase();

                this.form.user.is_graduate = (this.form.user.is_graduate  === "0") ? false : true;

                axios
                    .patch(`/api/update/${this.$route.params.id}/`, this.form.user)
                    .then(response => {
                        if (response.data.message === 'success') {
                            this.$router.push('/users');
                            this.toastStore.showToast(5000, "L'utilisateur a été mis à jour", 'text-slate-50 bg-green-600')
                        } else {
                            const data = JSON.parse(response.data.message)
                            for (const key in data){
                                console.log('in the key', key, 'the msg: ',data[key][0].message)
                                this.errors.push(data[key][0].message)
                            }
                            this.toastStore.showToast(5000, "Une erreur s'est produite. Veuillez réessayer", 'text-slate-50 bg-red-600')
                            this.$router.push('/notfound');
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



