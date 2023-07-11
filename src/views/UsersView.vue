<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

		<div class="main-center col-span-4 space-y-5">

			<h3 class="mb-6 text-xl"><strong>Liste des utilisateurs</strong></h3>

			<div class="shadow-lg bg-white border border-gray-200 rounded-lg">
                <form  class="p-4 flex space-x-4" v-if="form.graduates !== null">  
                    <input type="text" v-model="searchBar"  class="p-4 w-full bg-gray-100 rounded-lg" placeholder="Cherchez vous quelqu'un ?">
                </form>
            </div>
			
			<div v-if="form.users !== null"> 
				<div class="space-y-7"  v-for="user in filteredUsers"
                v-bind:key="user.id">
					<div v-if="user.id !== userStore.user.id" class="flex items-center justify-between bg-white rounded-lg p-4 mb-2 shadow-lg">
						<p class="text-base">
							<span class="text-lx">
								{{ user.last_name + ' ' + user.first_name}}
							</span>
							<span v-if="user.job_title !== null" class="mx-2 italic text-gray-600">
								{{ (user.job_title !== null ) ?  user.job_title : '' }}
							</span>
							<span v-if="user.place_of_work !== null" class="text-blue-400 italic">
								{{ (user.place_of_work !== null ) ?  '@' + user.place_of_work : '' }}
							</span><br>
							<strong>Filière : </strong>
							<span class="mx-1 text-gray-600 italic">
								{{ user.major }}
							</span><br>
                            <strong>Email : </strong>
							<span class="mx-1 text-gray-600 italic">
								{{ user.email }}
							</span><br>
                            <strong>Année : </strong>
							<span class="mx-1 text-gray-600 italic">
								{{ user.year_of_major }}
							</span><br>
							<strong v-if="user.year_of_graduate !== null">Promo : </strong>
							<span v-if="user.year_of_graduate !== null" class="mx-1 text-gray-600 italic">
								{{ (user.year_of_graduate !== null ) ?  user.year_of_graduate : '' }}
							</span><br>
						</p>

                        <div class="space-x-2">
                        
                            <button  v-if="user.linkedin_link !== null" class="py-2 px-3 bg-blue-600 hover:bg-blue-900 text-white text-xs rounded">
                                <a :href="user.linkedin_link" target="_blank" :title="user.linkedin_link">LinkedIn</a>
                            </button>

                            <RouterLink :to="`/user/${user.id}`" class="py-2 px-3 bg-gray-600  hover:bg-gray-900 text-white text-xs rounded">Modifier
                            </RouterLink>

                            <form class="inline" v-on:submit.prevent="deleteUserSubmit(user.id)">
                                <button class="py-2 px-3 bg-red-600 text-white text-xs rounded hover:bg-red-900">Supprimmer</button>
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
                users: '',
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
        this.getUsers()
    },

    computed: {
      filteredUsers() {
        return Object.values(this.form.users).filter(user =>
        user.last_name.toLowerCase().includes(this.searchBar.toLowerCase())
        || user.first_name.toLowerCase().includes(this.searchBar.toLowerCase())
        || user.email.toLowerCase().includes(this.searchBar.toLowerCase())       
        );
      },
    },

	methods: {
        deleteUserSubmit(userId){
            // Make an API request to delete the offer with the given ID
            axios.delete(`/api/delete/${userId}/`)
                .then(() => {
                    this.toastStore.showToast(5000, "L'utiliateur a été supprimée avec succès", 'text-slate-50 bg-green-600')
                    // Offer deleted successfully, update the list of offers
                    this.getUsers();
                })
                .catch(error => {
                    console.error(error);
                    this.toastStore.showToast(5000, "Une erreur s'est produite. Veuillez réessayer", 'text-slate-50 bg-red-600')
                });
        },

        getUsers() {
            axios
                .get('/api/get_users/')
                .then(response => {
                    this.form.users = response.data
                })
				.catch(error => {
                    console.log('error', error)
                })
        },

        checkUser() {
            if (this.userStore.user.isAdmin === 'true') {
                this.$router.push('/users');
            } else {
                this.$router.push('/');
            }
        }
    }
}

</script>






