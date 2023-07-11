<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">

		<div class="main-center col-span-4 space-y-5">
            <div class="flex flex-col bg-white rounded-lg p-4 mb-4 shadow-lg">
                <div class="flex flex-row justify-items-stretch  items-center justify-between">
                    <h2 class="text-center mb-9 text-lg basis-4/12 mx-auto" ><strong>Nombre de lauréats par filière </strong></h2>

                    <h2 class="text-center mb-9 text-lg basis-4/12 mx-auto"><strong>Pourcentages des lauréats embauchés</strong></h2>
                </div>

                <div class="flex flex-row justify-items-stretch  items-center justify-between">
                    <div class="basis-4/12 mx-auto">
                        <canvas id="gradsPerMajor"></canvas>
                    </div>

                    <div class="basis-4/12 mx-auto">
                        <canvas  id="percentageOfgradWorkers"></canvas>
                    </div>
                </div>


            </div>

		</div>

	</div>
</template>

<script>

import axios from 'axios'
import Chart from 'chart.js/auto'
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
                graph1: '',
                graph2: '',

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
        this.checkUser();
        this.graduatesPerMajor();
        this.percentageOfGradWorkers();
    },

	methods: {

        checkUser() {
            if (this.userStore.user.isAdmin === 'true') {
                this.$router.push('/stat');
            } else {
                this.$router.push('/');
            }
        },

        async graduatesPerMajor() {

            try {
                const response = await axios.get(`/api/graduates_per_major/`);
                this.form.graph1 = response.data;
            } catch (error) {
                console.log('Error:', error);
                this.$router.push('/notfound');
            }
            
            new Chart(
                document.getElementById('gradsPerMajor'),
                    {
                    type: 'pie',
                    options: {
                        animation: true,
                        plugins: {
                            legend: {
                                display: true
                            },
                            tooltip: {
                                enabled: true
                            }
                        }
                    },
                    data: {
                        datasets: [{
                            label: 'effectif',
                            data: this.form.graph1.grads_per_major,
                        }],

                        // These labels appear in the legend and in the tooltips when hovering different arcs
                        labels: this.form.graph1.majors
                    }
                }
            );
        },

        async percentageOfGradWorkers() {

            try {
                const response = await axios.get(`/api/percentage_of_grad_workers/`);
                this.form.graph2 = response.data;
            } catch (error) {
                console.log('Error:', error);
                this.$router.push('/notfound');
            }

            new Chart(
                document.getElementById('percentageOfgradWorkers'),
                    {
                    type: 'bar',
                    options: {
                        animation: true,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: true
                            }
                        }
                    },
                    data: {
                        datasets: [{
                            label: 'effectif',
                            data: this.form.graph2.numbers,
                            backgroundColor: [
                                'rgba(66, 185, 131, 1)',
                                'rgba(255, 100, 133, 1)',
                                ],
                            fill: false,
                            borderWidth: 2,
                            barThickness: 60,
                        }],
                        labels: [
                            'Avec travail',
                            'Sans travail',
                        ],
                    }
                }
            );
        }
    }
}

</script>