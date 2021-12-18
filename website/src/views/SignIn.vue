<template>
<div class="_container">
    <br><br>
    <h2 class="text-center text-5xl">Sign In</h2>
    <br><br>
    <input class="appearance-none rounded w-full py-2 px-4 leading-tight mb-50" id="inline-full-name" type="text" v-model="username" placeholder="Enter your username...">
    <input class="appearance-none rounded w-full py-2 px-4 leading-tight " id="inline-full-name" type="password" v-model="password" placeholder="Enter your password...">
    <br>
    <button class="pl-1 rounded" v-on:click="authenticate()">Sign In</button>
    <br><br><br>
    <div class="text-sm text-center">Don't have an account? <a href="/signup">Sign Up!</a></div>

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
            fetch("http://34.71.135.86/api/login" , {
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