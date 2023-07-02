<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

		<div class="main-center col-span-4 space-y-5">

			<h3 v-if="form.internships !== null" class="mb-6 text-xl"><strong>Stages ouverts</strong></h3>
			<h3 v-else  class="flex items-center justify-center mt-[166px] text-xl"><strong>Pas de stage ouvert pour le moment</strong></h3>

			<div v-if="form.internships !== null" class="shadow-lg bg-white border border-gray-200 rounded-lg">
                <form  class="p-4 flex space-x-4">  
                    <input type="text" v-model="searchBar"  class="p-4 w-full bg-gray-100 rounded-lg" placeholder="Cherchez vous un stage ?">
                </form>
            </div>

			<div v-if="form.internships !== null"> 
				<div class="space-y-7" v-for="internship in filteredInternships"
				v-bind:key="internship.id">

					<div class="flex items-center justify-between bg-white rounded-lg p-4 mb-4 shadow-lg">
						<p class="text-base">
							<span class="italic">{{ internship.title }}</span><span class="text-blue-400 italic ml-1 mr-3">@{{ internship.created_by }}</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
								stroke="currentColor" class="w-5 h-5 inline text-blue-500">
								<path stroke-linecap="round" stroke-linejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span class="italic text-gray-600">{{ ' ' + internship.date_created.slice(0, 10) }}</span><br>
							<span class="text-gray-500">{{ internship.description.slice(0, 100) + '...' }}</span>
						</p>
						<RouterLink :to="`/offer/${internship.id}`" class="py-2 px-3 bg-gray-600 text-white text-xs rounded">Consulter
						</RouterLink>
					</div>

				</div>
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
            searchBar : '',
            form: {
                internships: '',
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
        this.getInternships()
    },

    computed: {
      filteredInternships() {
        return Object.values(this.form.internships).filter(intern =>
            intern.title.toLowerCase().includes(this.searchBar.toLowerCase())
            || intern.created_by.toLowerCase().includes(this.searchBar.toLowerCase())
            || intern.description.toLowerCase().includes(this.searchBar.toLowerCase())     
        );
      },
    },

	methods: {
        getInternships() {
            axios
                .get('/api/offer/get_internships/')
                .then(response => {

                    this.form.internships = response.data
                })
				.catch(error => {
                    console.log('error', error)
                })
        },

		checkUser() {
            if (this.userStore.user.isAuthenticated) {
                this.$router.push('/internships');
            } else {
                this.$router.push('/');
            }
        }
    }
}

</script>




