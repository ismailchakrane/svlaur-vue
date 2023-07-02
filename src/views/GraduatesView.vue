<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

		<div class="main-center col-span-4 space-y-5">

			<h3 v-if="form.graduates !== null" class="mb-6 text-xl"><strong>Liste des lauréats</strong></h3>
			<h3 v-else  class="flex items-center justify-center mt-[166px] text-xl"><strong>Pas de lauréats pour le moment</strong></h3>

			<div v-if="form.graduates !== null" class="shadow-lg bg-white border border-gray-200 rounded-lg">
                <form  class="p-4 flex space-x-4">  
                    <input type="text" v-model="searchBar"  class="p-4 w-full bg-gray-100 rounded-lg" placeholder="Cherchez vous quelqu'un ?">
                </form>
            </div>
			
			<div v-if="form.graduates !== null"> 
				<div class="space-y-7"  v-for="graduate in filteredGraduates"
                v-bind:key="graduate.id">
					<div v-if="graduate.id !== userStore.user.id" class="flex items-center justify-between bg-white rounded-lg p-4 mb-2 shadow-lg">
						<p class="text-base">
							<span class="text-lx">
								{{ graduate.last_name + ' ' + graduate.first_name}}
							</span>
							<span class="mx-2 italic text-gray-600">
								{{ (graduate.job_title !== null ) ?  graduate.job_title : '' }}
							</span>
							<span class="text-blue-400 italic">
								{{ (graduate.place_of_work !== null ) ?  '@' + graduate.place_of_work : '' }}
							</span><br>
							<strong>Filière : </strong>
							<span class="mx-1 text-gray-600 italic">
								{{ graduate.major }}
							</span><br>
							<strong v-if="graduate.year_of_graduate !== null">Promo : </strong>
							<span class="mx-1 text-gray-600 italic">
								{{ (graduate.year_of_graduate !== null ) ?  graduate.year_of_graduate : '' }}
							</span><br>
						</p>
						<button  v-if="graduate.linkedin_link !== null" class="py-2 px-3 bg-blue-600 text-white text-xs rounded">
							<a :href="graduate.linkedin_link" target="_blank" :title="graduate.linkedin_link">LinkedIn</a>
						</button>

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
                graduates: '',
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
        this.getGraduates()
    },

    computed: {
      filteredGraduates() {
        return Object.values(this.form.graduates).filter(grad =>
        grad.last_name.toLowerCase().includes(this.searchBar.toLowerCase())
        || grad.first_name.toLowerCase().includes(this.searchBar.toLowerCase())
        || 
            (grad.job_title === null) ?  1 : grad.job_title.toLowerCase().includes(this.searchBar.toLowerCase())       
        ||
            (grad.year_of_graduate === null) ?  1 : grad.year_of_graduate.toLowerCase().includes(this.searchBar.toLowerCase())       
        ||
            (grad.place_of_work === null) ?  1 : grad.place_of_work.toLowerCase().includes(this.searchBar.toLowerCase())       

        || grad.email.toLowerCase().includes(this.searchBar.toLowerCase())       
        || grad.major.toLowerCase().includes(this.searchBar.toLowerCase())       
        || grad.year_of_major.toLowerCase().includes(this.searchBar.toLowerCase())    
        );
      },
    },

    

	methods: {
        getGraduates() {
            axios
                .get('/api/get_graduates/')
                .then(response => {

                    this.form.graduates = response.data
                })
				.catch(error => {
                    console.log('error', error)
                })
        },

        checkUser() {
            if (this.userStore.user.isAuthenticated) {
                this.$router.push('/graduates');
            } else {
                this.$router.push('/');
            }
        }
    }
}

</script>






