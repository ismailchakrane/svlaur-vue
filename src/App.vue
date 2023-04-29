<template>
    <nav class="py-5 px-4 border-b shadow-md border-gray-200">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
                <div class="menu-left">
                    <img class="w-30 h-24 max-w-full max-h-full" src="/images/logo.png" alt="Logo" />
                </div>

                <div class="menu-center flex space-x-12">
                    <a href="#" class="text-red-700">
                        Stages
                    </a>

                    <a href="#">
                        Jobs                            
                    </a>
                </div>

                <div class="menu-right">
                    <a href="#">
                        <img src="https://i.pravatar.cc/40?img=70" class="rounded-full">
                    </a>
                </div>
            </div>
        </div>
    </nav>

	<RouterView />
  
	<footer class="text-center bg-red-700 py-4">
  		<p class="text-sm text-white">&copy; 2023</p>
	</footer>


</template>

