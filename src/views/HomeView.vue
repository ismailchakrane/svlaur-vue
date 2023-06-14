<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

		<div class="main-center col-span-4">
			<div class="shadow-lg bg-white border border-gray-200 rounded-lg">
				<h3 class="mb-10 mt-7 text-xl text-center"><strong>Nous somme qui ?</strong></h3>
				<div class="m-10 mr-20 mb-12 text-justify space-x-6">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
					doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit officiis
					aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
					doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit officiis
					aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
					doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit officiis
					aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
				</div>

				<h3 class="mb-10 mt-7 text-xl text-center"><strong>Nos services</strong></h3>

				<div class="flex flex-row">
					<div class="m-10 grow text-justify basis-3/4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Temporibus doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit
						officiis aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
						doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit officiis
						aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
						doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit officiis
						aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
						<p class="font-bold">
							Vous pouvez se connecter et consulter les stages en cliquant sur le							
							<RouterLink :to="{ 'name': 'login' }" class="underline">lien</RouterLink>
						</p>
					</div>
					<div class="text-center m-6">

						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
							stroke="currentColor" class="text-red-700 rounded-lg shadow-lg bg-slate-100 h-5/6 w-5/6">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
						</svg>

					</div>
				</div>
				<div class="flex flex-row">
					<div class="text-center m-10">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
							stroke="currentColor" class="text-red-700 rounded-lg shadow-lg bg-slate-100 h-5/6 w-5/6">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
						</svg>
					</div>
					<div class="m-10 mr-20 grow text-justify basis-3/4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Temporibus doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit
						officiis aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
						doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit officiis
						aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
						doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit officiis
						aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
						<p class="font-bold">
							Vous pouvez se connecter et consulter les offres d'emplois en cliquant sur le							
							<RouterLink :to="{ 'name': 'login' }" class="underline">lien</RouterLink>
						</p>
					</div>

				</div>

				<div class="flex flex-row">
					<div class="m-10 grow text-justify basis-3/4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Temporibus doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit
						officiis aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
						doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit officiis
						aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
						doloribus, ab eum laudantium suscipit similique laboriosam molestias accusantium velit officiis
						aperiam nesciunt incidunt modi non optio voluptates sit minus assumenda.
						<p class="font-bold">
							Vous pouvez publier une offre de stage ou d'emplois en cliquant sur le
							<RouterLink :to="{ 'name': 'newoffer' }" class="underline">lien</RouterLink>
						</p>
					</div>
					<div class="text-center m-6">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
							stroke="currentColor" class="text-red-700 rounded-lg shadow-lg bg-slate-100 h-5/6 w-5/6">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
						</svg>
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
            if (this.userStore.user.isAuthenticated) {
                this.$router.push('/jobs');
            } else {
                this.$router.push('/');
            }
        }
    }
}

</script>




