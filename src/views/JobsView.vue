<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

		<div class="main-center col-span-4 space-y-5">

			<h3 class="mb-6 text-xl"><strong>Offres d'emplois ouvertes</strong></h3>

			<div class="shadow-lg bg-white border border-gray-200 rounded-lg">
                <form  class="p-4 flex space-x-4">  
                    <input type="search" class="p-4 w-full bg-gray-100 rounded-lg" placeholder="Qu'est-ce que tu cherche?">

                    <button class="inline-block py-4 px-6 bg-red-700 hover:bg-red-900 text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                        </svg>
                    </button>
                </form>
            </div>

			<div class="space-y-7">
				<div class="flex items-center justify-between bg-white rounded-lg p-4 shadow-lg">
					<p class="text-base">
						<span class="italic">Ingénieur qualité</span><span class="text-blue-400 italic ml-1 mr-3">@X</span>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
							stroke="currentColor" class="w-5 h-5 inline text-blue-500">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span class="italic text-gray-600">15/08/2001</span><br>
						<span class="text-gray-500">Nous sommes à la recherche d'un ingénieur en informatique pour rejoindre
							notre équipe dynamique. Si vous êtes passionné(e) par...</span>
					</p>
					<RouterLink to='/trendview' class="py-2 px-3 bg-gray-600 text-white text-xs rounded">Consulter
					</RouterLink>
				</div>
			</div>
		</div>

	</div>
</template>




