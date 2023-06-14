<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

		<div class="main-center col-span-4 space-y-5">

			<h3 class="mb-6 text-xl"><strong>Liste des lauréats</strong></h3>

			<div class="shadow-lg bg-white border border-gray-200 rounded-lg">
                <form  class="p-4 flex space-x-4" v-if="form.graduates !== null">  
                    <input type="search" class="p-4 w-full bg-gray-100 rounded-lg" placeholder="Cherchez vous quelqu'un ?">
                    <button class="inline-block py-4 px-6 bg-red-700 hover:bg-red-900 text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                        </svg>
                    </button>
                </form>
            </div>
			
			<div v-if="form.graduates !== null"> 
				<div class="space-y-7"  v-for="graduate in form.graduates"
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
        this.getGraduates()
    },

	methods: {
        getGraduates() {
            axios
                .get('/api/get_graduates/')
                .then(response => {

                    this.form.graduates = response.data
					console.log('users ', this.form.graduates)
                })
				.catch(error => {
                    console.log('error', error)
                })
        }
    }
}

</script>




