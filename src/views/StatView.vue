<template>
    Stat view
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
                stat: '',
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
    },

	methods: {

        checkUser() {
            if (this.userStore.user.isAdmin === 'true') {
                this.$router.push('/stat');
            } else {
                this.$router.push('/');
            }
        }
    }
}

</script>