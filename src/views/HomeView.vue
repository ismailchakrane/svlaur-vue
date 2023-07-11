<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

		<div class="main-center col-span-4">
			<div class="shadow-lg bg-white border border-gray-200 rounded-lg">
				<h3 class="mb-10 mt-7 text-xl text-center"><strong>Nous somme qui ?</strong></h3>
				<div class="m-10 mr-20 mb-12 text-justify space-x-6">
					Nous sommes une plateforme de gestion des lauréats de L'ENSAM Rabat, 
					dédiée à faciliter la vie des étudiants en mettant à leur disposition un 
					ensemble d'outils et de fonctionnalités. Notre site propose une
					gestion complète des étudiants et des lauréats, des stages ainsi que des 
					offres d'emploi en cours. Grâce à notre plateforme conviviale et intuitive, 
					les étudiants peuvent consulter les offres de stages et d'emploi publiées par les entreprises
					et rester informés des dernières opportunités disponibles. 
					Nous sommes là pour soutenir les lauréats tout au long de 
					leur parcours professionnel en leur offrant une interface 
					centralisée pour accéder à toutes les informations pertinentes 
					et les aider à trouver des opportunités prometteuses pour leur carrière.
				</div>

				<h3 class="mb-10 mt-7 text-xl text-center"><strong>Nos services</strong></h3>

				<div class="flex flex-row">
					<div class="m-10 grow text-justify basis-3/4">
						Notre plateforme offre aux étudiants un accès facile et rapide à une 
						multitude de ressources liées aux lauréats, stages et offres d'emploi. 
						En tant qu'étudiant, vous pouvez consulter les listes de lauréats récents, 
						parcourir les différentes opportunités de stages disponibles dans diverses 
						entreprises, et explorer les offres d'emploi proposées par des employeurs. 
						Notre interface vous permet de filtrer les résultats 
						en fonction de vos préférences et compétences, vous aidant ainsi à trouver 
						les opportunités les plus pertinentes pour votre parcours académique et professionnel.
						<p class="font-bold">
							Vous pouvez vous connecter et consulter les offres de stages en cliquant sur le					
							<RouterLink :to="{ 'name': 'login' }" class="underline hover:text-red-700">lien</RouterLink>, à condition que vous disposiez d'un compte. 
							Par la suite, vous pourrez vous enregistrer en suivant le 
							<a 
								href="https://docs.google.com/forms/d/1jCgQ8O06r7RqGWUBjq6-XR05NysNwd_f2cKT9gX_Dvk" 
								class="underline hover:text-red-700" target="_blank">
									lien
							</a>.						
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
						En tant que lauréat, vous avez accès à une section dédiée où vous pouvez consulter 
						les profils d'autres lauréats et découvrir leurs parcours. 
						Cette fonctionnalité vous permet de vous inspirer et d'établir des connexions avec des personnes qui partagent des intérêts similaires. 
						De plus, vous pouvez également accéder aux offres d'emploi et aux opportunités de stage ouvertes. 
						Cela vous donne un avantage supplémentaire en termes de visibilité 
						et de possibilités de carrière, vous permettant de postuler à des 
						postes adaptés à votre expertise et vos aspirations professionnelles.
						<p class="font-bold">
							Vous pouvez vous connecter et consulter les offres de stages en cliquant sur le					
							<RouterLink :to="{ 'name': 'login' }" class="underline hover:text-red-700">lien</RouterLink>, à condition que vous disposiez d'un compte. 
							Par la suite, vous pourrez vous enregistrer en suivant le 
							<a 
								href="https://docs.google.com/forms/d/1jCgQ8O06r7RqGWUBjq6-XR05NysNwd_f2cKT9gX_Dvk" 
								class="underline hover:text-red-700" target="_blank">
									lien
							</a>.						
						</p>
					</div>

				</div>

				<div class="flex flex-row">
					<div class="m-10 grow text-justify basis-3/4">
						La plateforme offre également aux entreprises la possibilité de publier des offres 
						d'emploi et des offres de stage pour attirer les meilleurs talents parmi notre 
						communauté de lauréats. Nous mettons en avant votre marque 
						et vos opportunités, permettant ainsi une visibilité accrue auprès de notre 
						réseau de lauréats qualifiés. Que vous recherchiez des talents fraîchement 
						diplômés ou des profils expérimentés, notre plateforme vous offre un moyen 
						efficace, facile et ciblé de recruter les meilleurs candidats pour votre entreprise.
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
            if (this.userStore.user.isAdmin === 'true') {
                this.$router.push('/stat');
            } else if(this.userStore.user.isAuthenticated) {
				(this.userStore.user.isGraduate === 'true') ? this.$router.push('/jobs') : this.$router.push('/internships');
			} else {
                this.$router.push('/');
            }
        }
    }
}

</script>




