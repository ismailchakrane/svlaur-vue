<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

		<div class="main-center col-span-4 space-y-5">
            <div class="flex flex-col bg-white rounded-lg p-4 mb-4 shadow-lg" v-if="form.offer !== null">
                <h2 class="mb-4 ml-9 text-lg"><strong>Titre d'offre :</strong>{{ ' ' + form.offer.title }}</h2>
                <h2 class="mb-4 ml-9 text-lg"><strong>Date de publication :</strong>{{ ' '+ form.offer.date_created }}</h2>
                <h2 class="mb-4 ml-9 text-lg"><strong>Entreprise / Organisation :</strong>{{ ' '+ form.offer.created_by }}</h2>

                <img 
                     v-if="form.offer.offer_img !== null" class="mx-auto my-6" width="200" 
                    height="100" :src="form.offer.offer_img" 
                alt="">

                <p class="mx-9 text-justify my-6">
                    {{ form.offer.description }}
                </p>

                <a v-if="form.offer.offer_pdf !== null" 
                    class="mx-auto my-6 py-4 px-6 bg-red-700 text-white rounded-lg hover:bg-red-900" 
                    target="_blank" 
                    :href="form.offer.offer_pdf">
                    <button>L'offre PDF</button>
                </a>
            </div>

            <div v-else>
                <h3 class="mb-6 text-xl"><strong>Pas d'offre trouver avec cette ID: {{ this.$route.params.id }}</strong></h3>
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
                offer: '',
            },
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
        this.getOffer()
    },

	methods: {
        getOffer() {
            axios
                .get(`/api/offer/${this.$route.params.id}/`)
                .then(response => {

                    const dateFr = response.data.date_created.slice(0,10);
                    response.data.date_created =  'Le ' 
                    + dateFr.slice(8,10) + '/' + dateFr.slice(5,7) + '/' + dateFr.slice(0,4) 
                    + ' à ' +  response.data.date_created.slice(11,16);
                    this.form.offer = response.data

                })
				.catch(error => {
                    console.log('error', error)
                    this.$router.push('/notfound');
                })
        },

		checkUser() {
            if (!this.userStore.user.isAuthenticated) {
                this.$router.push('/');
            }
        }
    }
}

</script>
