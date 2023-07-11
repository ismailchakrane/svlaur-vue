<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

        <h3 class="mb-4 whitespace-nowrap ml-48 text-xl"><strong>Mes infos</strong></h3>

        <div class="main-right main-center col-span-5 space-y-1">
            <div class="p-20 mx-48 bg-white border border-gray-200 rounded-lg">
                <form class="space-y-3" >
                    <div class="space-y-3">
                        <label>Nom
                            <input type="text"  v-model="form.user.lastName" placeholder="Nom"
                                class="w-full  m-2 p-4  border border-gray-200 rounded-lg" readonly>
                        </label>

                        <label>Prénom
                            <input type="text"  v-model="form.user.firstName" placeholder="Prénom"
                                class="w-full m-2 p-4 border border-gray-200 rounded-lg" readonly>
                        </label>
                    </div>

                    <div class="space-y-3">
                        <label>Email</label><br>
                        <input type="email"  v-model="form.user.email"  placeholder="Email"
                            class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>
                    </div>
                   

                    <div class="space-y-3">
                        <label>
                            Filière
                            <input type="text"  v-model="form.user.major" placeholder="Filière"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>
                        </label>
                    </div>


                    <div class="space-y-3">
                        
                        <label>
                            Année
                            <input type="text" v-if="form.user.yearOfMajor  === '1er' " 
                            value=" 1er année"
                            class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>

                            <input type="text" v-if="form.user.yearOfMajor  === '2eme' " 
                            value="2ème année"
                            class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>

                            <input type="text" v-if="form.user.yearOfMajor  === '3eme' " 
                            value="3ème année"
                            class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>
                        </label>

                        <label v-if="form.user.yearOfGraduate !== 'null'">
                            Promo
                            <input type="text"  v-model="form.user.yearOfGraduate" placeholder="Filière"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>
                        </label>
                    </div>

                    <div v-if="form.user.isGraduate !== 'null'" class="space-y-3">
                                                
                        <label>
                            Lauréat
                            <input type="text" v-if="form.user.isGraduate === 'false'" 
                            value="Non"
                            class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>

                            <input type="text" v-if="form.user.isGraduate === 'true'" 
                            value="Oui"
                            class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>
                        </label>
        

                        <label v-if="form.user.linkedinLink !== 'null'" >
                            Lien LinkedIn
                            <input type="text"  v-model="form.user.linkedinLink" placeholder="Lien LinkedIn"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>
                        </label>
                    </div>

                    <div v-if="form.user.placeOfWork !== 'null'" class="space-y-3">
                        <label>
                            Lieu de travail (entreprise / organisation)
                            <input type="text"  v-model="form.user.placeOfWork" placeholder="Lieu de travail"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>
                        </label>

                        <label v-if="form.user.jobTitle !== 'null'">
                            Titre du poste de travail
                            <input type="text"  v-model="form.user.jobTitle" placeholder="Titre du poste de travail"
                                class="w-full m-2 p-4  border border-gray-200 rounded-lg" readonly>
                        </label>
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
        this.form.user = this.userStore.user
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

            if(!this.userStore.user.isAuthenticated) {
                this.$router.push('/');
            }
        },

    }
}

</script>



