<template>
<div class="container">
    <input type="text" placeholder="Enter your first name" v-model="firstName">
    <input type="text" placeholder="Enter your last name" v-model="lastName">
    <input type="text" placeholder="Enter your username" v-model="username">
    <input type="password" placeholder="Enter your password" v-model="password">
    <button class="btn" v-on:click="createUser()">Sign Up</button>
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
    methods: {
        createUser: function () {
            fetch("http://localhost:3000/api/users", {
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
                            fetch("http://localhost:3000/api/login", {
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
