<template>
<div class="_container">
    <div class="text-5xl text-center">Sign Up</div>
    <br><br><br>
    <input type="text" class="appearance-none rounded w-full py-2 px-4 leading-tight " placeholder="Enter your first name" v-model="firstName">
    <input type="text" class="appearance-none rounded w-full py-2 px-4 leading-tight " placeholder="Enter your last name" v-model="lastName">
    <input type="text" class="appearance-none rounded w-full py-2 px-4 leading-tight " placeholder="Enter your username" v-model="username">
    <input type="password" class="appearance-none rounded w-full py-2 px-4 leading-tight " placeholder="Enter your password" v-model="password">
    <button class="btn" v-on:click="createUser()">Sign Up</button>
    <br>
    <br>
    <br>
    <div class="text-sm text-center">Already have an account? <a href="/signin">Sign In</a></div>
</div>
</template>

<script>
export default {
    name: "SignUp",
    data() {
        return {
            firstName: "",
            lastName: "",
            username: "",
            password: ""
        }
    },
    mounted(){
        document.title = "Sign Up | Todo App"
    },
    methods: {
        createUser: function () {
            fetch("http://34.71.135.86/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46YWRtaW4="
                    },
                    body: JSON.stringify({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        username: this.username,
                        password: this.password,
                        todos: "[]",
                        roles: [
                            "user"
                        ]
                    })
                })
                .then(res => res.json())
                .then(data => {
                        if (data.createdAt) {
                            fetch("http://34.71.135.86/api/login", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Basic YWRtaW46YWRtaW4="
                                },
                                body: JSON.stringify({
                                    username: this.username,
                                    password: this.password
                                })
                            })
                            .then(res => res.json())
                            .then(data => {
                                window.localStorage.setItem("accessToken" , data.accessToken)
                            })

                            this.$router.push({
                                path: "/"
                            })
                        }

                            else {
                                alert("Please check your information entered!")
                            }
                        })
                }
        }
    }
</script>


<style scoped>
._container{
    margin: 50px;
}

input{
    margin-bottom: 50px;
}

button{
    height: 60px;
    position: relative;
    left: 0%;
    width: 100%;
}

</style>