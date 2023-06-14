import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            isAuthenticated: false,
            id: null,
            lastName: null,
            firstName: null,
            email: null,
            major: null,
            yearOfMajor: null,
            linkedinLink: null,
            placeOfWork: null,
            jobTitle: null,
            yearOfGraduate: null,
            isGraduate: null,
            isAdmin: null,
            access: null,
            refresh: null,
        }
    }),

    actions: {
        initStore() {
            console.log('initStore', localStorage.getItem('user.access'))

            if (localStorage.getItem('user.access')) {
                console.log('User has access!')

                this.user.access = localStorage.getItem('user.access')
                this.user.refresh = localStorage.getItem('user.refresh')
                this.user.id = localStorage.getItem('user.id')
                this.user.lastName = localStorage.getItem('user.lastName')
                this.user.firstName = localStorage.getItem('user.firstName')
                this.user.email = localStorage.getItem('user.email')
                this.user.major = localStorage.getItem('user.major')
                this.user.yearOfMajor = localStorage.getItem('user.yearOfMajor')
                this.user.linkedinLink = localStorage.getItem('user.linkedinLink')
                this.user.placeOfWork = localStorage.getItem('user.placeOfWork')
                this.user.jobTitle = localStorage.getItem('user.jobTitle')
                this.user.yearOfGraduate = localStorage.getItem('user.yearOfGraduate')
                this.user.isGraduate = localStorage.getItem('user.isGraduate')
                this.user.isAdmin = localStorage.getItem('user.isAdmin')
                this.user.isAuthenticated = true

                this.refreshToken()

                console.log('Initialized user:', this.user)
            }
        },

        setToken(data) {
            console.log('setToken', data)

            this.user.access = data.access
            this.user.refresh = data.refresh
            this.user.isAuthenticated = true

            localStorage.setItem('user.access', data.access)
            localStorage.setItem('user.refresh', data.refresh)

            console.log('user.access: ', localStorage.getItem('user.access'))
        },

        removeToken() {
            console.log('removeToken')

            this.user.refresh = null
            this.user.access = null
            this.user.isAuthenticated = false
            this.user.id = null
            this.user.lastName = null
            this.user.firstName = null
            this.user.email = null
            this.user.major = null
            this.user.yearOfMajor = null 
            this.user.linkedinLink = null
            this.user.placeOfWork = null
            this.user.jobTitle = null
            this.user.yearOfGraduate = null 
            this.user.isGraduate = null
            this.user.isAdmin = null

            localStorage.setItem('user.access', '')
            localStorage.setItem('user.refresh', '')
            localStorage.setItem('user.id', '')
            localStorage.setItem('user.lastName','')
            localStorage.setItem('user.firstName','')
            localStorage.setItem('user.email','')
            localStorage.setItem('user.major','')
            localStorage.setItem('user.yearOfMajor','')
            localStorage.setItem('user.linkedinLink','')
            localStorage.setItem('user.placeOfWork','')
            localStorage.setItem('user.jobTitle','')
            localStorage.setItem('user.yearOfGraduate','')
            localStorage.setItem('user.isGraduate','')
            localStorage.setItem('user.isAdmin','')
        },

        setUserInfo(user) {
            console.log('setUserInfo', user)

            this.user.id = user.id
            this.user.lastName = user.last_name
            this.user.firstName = user.first_name 
            this.user.email = user.email
            this.user.major = user.major
            this.user.yearOfMajor = user.year_of_major
            this.user.linkedinLink = user.linkedin_link
            this.user.placeOfWork = user.place_of_work
            this.user.jobTitle = user.job_title
            this.user.yearOfGraduate = user.year_of_graduate
            this.user.isGraduate = user.is_graduate
            this.user.isAdmin = user.is_admin

            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.lastName',this.user.lastName)
            localStorage.setItem('user.firstName',this.user.firstName)
            localStorage.setItem('user.email', this.user.email)
            localStorage.setItem('user.major',this.user.major)
            localStorage.setItem('user.yearOfMajor',this.user.yearOfMajor)
            localStorage.setItem('user.linkedinLink', this.user.linkedinLink)
            localStorage.setItem('user.placeOfWork',this.user.placeOfWork)
            localStorage.setItem('user.jobTitle',this.user.jobTitle)
            localStorage.setItem('user.yearOfGraduate',this.user.yearOfGraduate)
            localStorage.setItem('user.isGraduate',this.user.isGraduate)
            localStorage.setItem('user.isAdmin',this.user.isAdmin)

            console.log('User', this.user)
        },

        refreshToken() {
            axios.post('/api/refresh/', {
                refresh: this.user.refresh
            })
                .then((response) => {
                    this.user.access = response.data.access

                    localStorage.setItem('user.access', response.data.access)

                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
                })
                .catch((error)=>{
                    console.log(error)

                    this.removeToken()
                })
        },
    }
})