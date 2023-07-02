<template>
	<div class="max-w-7xl mx-auto grid grid-cols-4 gap-1">
        <h3 class="mb-6 text-xl"><strong>Ajouter des utilisateurs</strong></h3>

        <div class="main-right main-center col-span-4">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <h3 class="mb-3 text-red-600"><strong >NB:</strong></h3>
                <h4>* Les champs du fichier csv doivent être dans l'ordre:
                <strong>
                    Nom, Prénom, email, Filière, Année (1,2,3), 
                    lien LinkedIn(Optionnel), Nom d'entreprise(Optionnel), Titre d'emplois(Optionnel),
                    Promotion(optionnel), Lauréats(0/1), admin(0/1)
                </strong></h4><br>
                <h4>* Toute information optionnelle non renseigner doit entre remplacer par une valeur 
                <strong class="italic">
                    null 
                </strong>. Exemple: AHMED,Ali, ahmedali@gmail.com, INDIA, 2, null, null, null, null, 0, 0</h4><br>
        
                <form class="space-y-6" v-on:submit.prevent="submitForm">
                    <div>
                        <label>Selectionner un fichier csv</label><br>
                        <input type="file"  @change="onFileInputChange" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" accept=".csv" name="myfile" required/>
                    </div>

                    <template v-if="errors.length > 0">
                        <div class="bg-red-600 my-4 text-white rounded-lg p-6">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                    </template>
                    

                    <div>
                        <button class="py-4 px-6 bg-red-700 text-white rounded-lg hover:bg-red-900">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>

	</div>

</template>

<script>

import axios from 'axios'

import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'


export default {
    
    setup() {

        const userStore = useUserStore()
        const toastStore = useToastStore()

        return {
            toastStore,
            userStore
        }
    },

    data() {
        return {
            form: {
                lastName: '',
                firstName: '',
                email: '',
                password: '',
                major: '',
                yearOfMajor: '',
                linkedinLink: '',
                placeOfWork: '',
                jobTitle: '',
                yearOfGraduate: '',
                isGraduate: '',
                isAdmin: '',
            },
            errors: [],
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
                this.$router.push('/addusers');
            } else {
                this.$router.push('/');
            }
        },

        onFileInputChange(event){
            this.selectedFile = event.target.files[0];
        },

        submitForm() {
            this.errors = []

            // Verify if a file is selected
            if (!this.selectedFile) {
                this.errors.push('Veuillez selectionner un fichier')
            }

            // Verify if the selected file is a CSV
            if (this.selectedFile.name.slice(-3) !== 'csv') {
                this.errors.push('Veuillez selectionner un fichier sous format CSV')
            }
    
            if (this.errors.length === 0) {
                const reader = new FileReader();

                // Read the contents of the CSV file
                reader.readAsText(this.selectedFile);
                
                reader.onload = (e) => {
                    const contents = e.target.result;

                    // Split the CSV contents into rows
                    const rows = contents.split('\n');

                    for (let i = 0; i < rows.length; i++) {
                        const row = rows[i];

                        const columns = row.split(',');


                        for (let i = 0; i < columns.length; i++) {
                            columns[i] = columns[i].trim();
                        }

                        console.log(columns);

                        if(columns.length !== 11){
                            this.errors.push('Veuillez respecter le format des champs déjà mentionné ci-dessus ');
                            return;
                        }

                        let lastName = columns[0];
                        let firstName = columns[1];
                        let email = columns[2];
                        let major = columns[3];
                        let yearOfmajor = columns[4];
                        let linkedinLink = columns[5];
                        let placeOfWork = columns[6];
                        let jobTitle = columns[7];
                        let yearOfGraduate = columns[8];
                        let isGraduate = columns[9];
                        let isAdmin = columns[10];

                        const namePattern = /^[A-Za-z]+$/;
                        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        const yearOfmajorPattern = /^(1|2|3)$/;
                        const containsNumberPattern = /^\d+(\.\d+)?$/;
                        const boolPattern = /^(0|1)$/;
                        const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;


                        if(lastName.length < 3 || !namePattern.test(lastName)){
                            this.errors.push("Dans la ligne numéro ",i,'Nom doit être valide')
                            return;
                        }

                        if(firstName.length < 3 || !namePattern.test(firstName)){
                            this.errors.push("Dans la ligne numéro ",i,'Prénom doit être valide')
                            return;
                        }

                        if(!emailPattern.test(email)){
                            this.errors.push("Dans la ligne numéro ",i,'Email doit être valide')
                            return;
                        }

                        if(major.length < 3 || containsNumberPattern.test(major)){
                            this.errors.push("Dans la ligne numéro ",i,'La Filière doit avoir au moin 3 caractères et elle doit être valide')
                            return;
                        }

                        if(yearOfmajor.length !== 1 || !yearOfmajorPattern.test(yearOfmajor)){
                            this.errors.push("Dans la ligne numéro ",i,"L'Année doit être soit 1, 2 ou 3")
                            return;
                        }

                        if(linkedinLink !== "null"){
                            if(linkedinLink.length < 30 || !urlPattern.test(linkedinLink)){
                                this.errors.push("Dans la ligne numéro ",i,'Le lien linkedIn doit être valide')
                                return;
                            }
                        }

                        if(placeOfWork !== "null"){
                            if(placeOfWork.length < 3 ){
                                this.errors.push("Dans la ligne numéro ",i,"Nom d'entreprise doit avoir au moin 3 caractères")
                                return;
                            }
                        }

                        if(jobTitle !== "null" ){
                            if(jobTitle.length < 10 || containsNumberPattern.test(jobTitle)){
                                this.errors.push("Dans la ligne numéro ",i,"Titre d'emplois doit avoir au moin 10 caractères et doit être valide")
                                return;
                            }
                        }

                        if(yearOfGraduate !== "null"){
                            if(yearOfGraduate.length !== 9){
                                this.errors.push("Dans la ligne numéro ",i,'Promotion doit avoir exactement 9 caractères (ex: 2022-2023)')
                                return;
                            }
                        }

                        if(isGraduate.length !== 1 || !boolPattern.test(isGraduate)){
                            this.errors.push("Dans la ligne numéro ",i,'Lauréats  doit être soit 1 soit 0')
                            return;
                        }

                        if(isAdmin.length !== 1 || !boolPattern.test(isAdmin)){
                            this.errors.push("Dans la ligne numéro ",i,'Admin doit être soit 1 soit 0')
                            return;
                        }

                        if (this.errors.length === 0) {

                            this.form.lastName = lastName.toUpperCase();
                            this.form.firstName = firstName;
                            this.form.email = email;
                            this.form.password = lastName.toLowerCase() + firstName.toLowerCase()
                            this.form.major = major.toUpperCase();

                            if(yearOfmajor === "1"){
                                this.form.yearOfMajor = "1er"
                            }else if(yearOfmajor === "2"){
                                this.form.yearOfMajor = "2eme"
                            }else {
                                this.form.yearOfMajor = "3eme"
                            }

                            if(linkedinLink === "null"){
                                this.form.linkedinLink = null;
                            }else {
                                this.form.linkedinLink = linkedinLink;
                            }

                            if(placeOfWork === "null"){
                                this.form.placeOfWork = null;
                            }else{
                                this.form.placeOfWork = placeOfWork;
                            }

                            if(jobTitle === "null"){
                                this.form.jobTitle = null;
                            }else{
                                this.form.jobTitle = jobTitle;
                            }

                            if(yearOfGraduate === "null"){
                                this.form.yearOfGraduate = null;
                            }else{
                                this.form.yearOfGraduate = yearOfGraduate;
                            }

                        
                            this.form.isGraduate = isGraduate === "0" ? false : true;
                            this.form.isAdmin = isAdmin === "0" ? false : true;

                            axios
                                .post('/api/signup/', this.form)
                                .then(response => {
                                    if (response.data.message === 'success') {
                                        console.log('The user ' + this.form.lastName + ' '+ this.form.firstName  + ' is registered')

                                        this.toastStore.showToast(1000, 'The user ' + this.form.lastName + ' '+ this.form.firstName  + ' is registered', 'bg-emerald-600')

                                        this.form.lastName = ''
                                        this.form.firstName = ''
                                        this.form.email = ''
                                        this.form.password = ''
                                        this.form.major =''
                                        this.form.yearOfMajor = ''
                                        this.form.linkedinLink = ''
                                        this.form.placeOfWork = ''
                                        this.form.jobTitle = ''
                                        this.form.yearOfGraduate = ''
                                        this.form.isGraduate = ''
                                        this.form.isAdmin = ''

                                    } else {
                                        const data = JSON.parse(response.data.message)
                                        for (const key in data){
                                            console.log('in the key', key, 'the msg: ',data[key][0].message)
                                            this.errors.push(data[key][0].message)
                                        }
                                        this.toastStore.showToast(1000, 'Something went wrong in the line of user' + this.form.lastName + ' '+ this.form.firstName  + 'Please try again', 'bg-red-600')
                                    }
                                })
                                .catch(error => {
                                    console.log('error', error)
                                })
                        }


                    }

                };
            };

        }

    },
};
</script>
