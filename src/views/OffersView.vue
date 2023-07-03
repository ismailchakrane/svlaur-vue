<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

		<div class="main-center col-span-4 space-y-5">

			<h3 v-if="form.offers !== null" class="mb-6 text-xl"><strong>Offres ouvertes non vérifiées</strong></h3>
            <h3 v-else  class="flex items-center justify-center mt-[166px] text-xl"><strong>Pas d'offre ouverte pour le moment</strong></h3>

			<div v-if="form.offers !== null" class="shadow-lg bg-white border border-gray-200 rounded-lg">
                <form  class="p-4 flex space-x-4">  
                    <input type="text" v-model="searchBar"  class="p-4 w-full bg-gray-100 rounded-lg" placeholder="Cherchez vous une offre ?">
                </form>
            </div>

            <div v-if="form.offers !== null"> 
				<div class="space-y-7" v-for="offer in filteredOffers "
				v-bind:key="offer.id">

					<div class="flex items-center justify-between bg-white rounded-lg p-4 mb-4 shadow-lg">
						<p class="text-base">
							<span class="italic">{{ offer.title }}</span><span class="text-blue-400 italic ml-1 mr-3">@{{ offer.created_by }}</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
								stroke="currentColor" class="w-5 h-5 inline text-blue-500">
								<path stroke-linecap="round" stroke-linejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span class="italic text-gray-600">{{ ' ' + offer.date_created.slice(0, 10) }}</span><br>
							<span class="text-gray-500">{{ offer.description.slice(0, 100) + '...'  }}</span>
						</p>
                        <div class="space-x-2">
                            <RouterLink :to="`/offer/unverified/${offer.id}`" target="_blank" class="py-2 px-3 bg-gray-600  hover:bg-gray-900 text-white text-xs rounded">Consulter
                            </RouterLink>
                            <form class="inline" v-on:submit.prevent="deleteOfferSubmit(offer.id)">
                                <button class="py-2 px-3 bg-red-600 text-white text-xs rounded hover:bg-red-900">Supprimer</button>
                            </form>
                            <form class="inline" v-on:submit.prevent="verifyOfferSubmit(offer.id)">
                                <button class="py-2 px-3 bg-green-600 text-white text-xs rounded hover:bg-green-900">Accepter</button>
                            </form>
                        </div>
					</div>

				</div>
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
        const userStore = useUserStore()
        const toastStore = useToastStore()

        return {
            userStore,
            toastStore,
        }
    },
    data() {
        return {
            searchBar : '',
            form: {
                offers: '',
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
        this.getOffers()
		this.checkUser()
    },

    computed: {
      filteredOffers() {
        return Object.values(this.form.offers).filter(offer =>
             offer.title.toLowerCase().includes(this.searchBar.toLowerCase())
            || offer.created_by.toLowerCase().includes(this.searchBar.toLowerCase())
            || offer.description.toLowerCase().includes(this.searchBar.toLowerCase())       
        );
      },
    },

	methods: {
        deleteOfferSubmit(offerId) {
            // Make an API request to delete the offer with the given ID
            axios.delete(`/api/offer/delete/${offerId}/`)
                .then(() => {
                    this.toastStore.showToast(5000, "L'offre a été supprimée avec succès", 'text-slate-50 bg-green-600')
                    // Offer deleted successfully, update the list of offers
                    this.getOffers();
                })
                .catch(error => {
                    console.error(error);
                    this.toastStore.showToast(5000, "Une erreur s'est produite. Veuillez réessayer", 'text-slate-50 bg-red-600')
                });
        },

        verifyOfferSubmit(offerId) {
            // Make an API request to delete the offer with the given ID
            axios.patch(`/api/offer/verify/${offerId}/`)
                .then(() => {
                    this.toastStore.showToast(5000, "L'offre a été vérifiée avec succès", 'text-slate-50 bg-green-600')
                    // Offer deleted successfully, update the list of offers
                    this.getOffers();
                })
                .catch(error => {
                    console.error(error);
                    this.toastStore.showToast(5000, "Une erreur s'est produite. Veuillez réessayer", 'text-slate-50 bg-red-600')
                });
        },


        getOffers() {
            axios
                .get('/api/offer/get_offers/')
                .then(response => {
                    this.form.offers = response.data
                })
				.catch(error => {
                    console.log('error', error)
                })
        },

		checkUser() {
            if (this.userStore.user.isAdmin === 'true') {
                this.$router.push('/offers');
            } else {
                this.$router.push('/');
            }
        }
    }
}

</script>





