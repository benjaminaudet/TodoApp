<template>
<div class="container">
    <h2 class="center-align">Sign In</h2>
    <input type="text" v-model="username" placeholder="Enter your username">
    <input type="password" v-model="password" placeholder="Enter your password">
    <button class="btn" v-on:click="authenticate()">Sign In</button>
</div>
</template>

<script>
export default {
    name: "SignIn",
    data(){
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        authenticate: function(){
            fetch("http://localhost:3000/api/login" , {
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
                if(!data.accessToken){
                    alert("Invalid credentials")
                } else {
                    window.localStorage.setItem("accessToken" , data.accessToken)

                    this.$router.push({ path: "/" })
                }
            })
        }
    }
}
</script>