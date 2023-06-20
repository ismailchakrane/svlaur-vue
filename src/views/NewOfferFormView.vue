<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

        <h3 class="mb-6 text-xl"><strong>Publier une offre</strong></h3>

        <div class="main-right main-center col-span-4 space-y-1">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <form class="space-y-6" v-on:submit.prevent="submitForm">
                    <div>
                        <label>Titre d'offre</label><br>
                        <input type="email"  v-model="form.offerTitle" placeholder="Votre adresse e-mail"
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" required>
                    </div>

                    <div>
                        <label>Nom d'entreprise</label><br>
                        <input type="email"  v-model="form.companyName" placeholder="Votre adresse e-mail"
                            class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" required>
                    </div>

                    <div>
                        <label>Image (si nécessaire)</label><br>
                        <input type="file" @change="onImgInputChange" accept="image/*" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"  name="myfile" required/>
                    </div>
                    
                    
                    <!-- <div>
                        <label>Annonce PDF (si nécessaire)</label><br>
                        <input type="file"  @change="onPdfInputChange class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" accept=".pdf" name="myfile" required/>
                    </div>  -->
                   

                    <div>
                        <label>Type d'offre</label><br>
                        <select v-model="form.offerType" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" required>
                            <option value="internship">Stage</option>
                            <option value="job" selected>Offre d'emplois</option>
                        </select>
                    </div>

                    <div>
                        <label>Description</label><br>
                        <textarea v-model="form.offerDescription"  class="p-4 my-2 w-full bg-gray-100 rounded-lg" placeholder="Descrption de l'offre" required></textarea>
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
                offerTitle: '',
                companyName: '',
                offerDescription: '',
                offerType: '',
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
        onImgInputChange(event){
            console.log(event.target.files)
            this.form.offerImg = event.target.files[0];
        },

        // onPdfInputChange(event){
        //     this.offerImg = event.target.files[1];
        // },

        async submitForm() {
            this.errors = []

            if (this.form.offerTitle === '') {
                this.errors.push("Veuillez remplir le titre de l'offre email")
            }

            if (this.form.companyName === '') {
                this.errors.push('Veuillez remplir votre mot de passe')
            }
            
            if (this.form.offerType === '') {
                this.errors.push("Veuillez selectionner le type d'offre")
            }
            
            if (this.form.offerDescription === '') {
                this.errors.push("Veuillez remplir la description de l'offre")
            }
            

            // Verify if a file is selected
            if (!this.form.offerImg) {
                this.errors.push('Veuillez selectionner un fichier')
            }

            // Verify if the selected file is a CSV
            const suitedImgFormat = ['png','jpg','jpeg','PNG','JPG','JPEG'];

            if (suitedImgFormat.includes(this.form.offerImg.name.slice(-3))) {
                this.errors.push('Veuillez selectionner une image')
            }


            if (this.errors.length === 0) {

                this.form.offerType = (this.form.offerType === "job") ? true : false;

                axios
                    .post('/api/offer/create', this.form)
                    .then(response => {
                        if (response.data.message === 'success') {
                            console.log("offer registred")
                            this.toastStore.showToast(1000, 'The offer is succesfully created', 'bg-emerald-600')
                        } else {
                            const data = JSON.parse(response.data.message)
                            for (const key in data){
                                console.log('in the key', key, 'the msg: ',data[key][0].message)
                                this.errors.push(data[key][0].message)
                            }
                            this.toastStore.showToast(1000, 'Something went wrong', 'bg-red-600')
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }
        },

        checkUser() {
            if (this.userStore.user.isAuthenticated) {
                this.$router.push('/jobs');
            } else {
                this.$router.push('/newoffer');
            }
        }
    }
}

</script>



