<template>
<div class="_container">
    <br><br>
    <h2 class="text-center text-5xl">Your Todos</h2>
    <br><br><br>
    <div class="flex todo-bar">
        <input class="appearance-none rounded w-full py-2 px-4 leading-tight " id="inline-full-name" type="text" v-model="todo">
        <button class="pl-1 ml-10 rounded" v-on:click="addTodo()">Add Todo</button>
    </div>
    <br><br><br>
    <div class="todos">
        <div class="todo" v-for="todo in todos" v-bind:key="todo">
            <span class="text">{{todo}}</span>
            <i class="fad fa-times deleteTodo" v-on:click="deleteTodo(todo)"></i>
        </div>
    </div>
    <i class="fad fa-sign-out-alt logout" v-on:click="logout()"></i>
</div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            todos: [],
            id: "",
            todo: ""
        }
    },
    mounted() {
        document.title = "Todo List"

        // https://stackoverflow.com/questions/50213901/reload-page-in-vue-just-once-in-mounted
        if (localStorage.getItem('reloaded')) {
            localStorage.removeItem('reloaded');
        } else {
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
        

        const credentials = atob(window.localStorage.getItem("accessToken")).split(":")

        fetch("https://amplicationtodoapp.herokuapp.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46YWRtaW4="
            },
            body: JSON.stringify({
                username: credentials[0],
                password: credentials[1]
            })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.accessToken) {
                this.$router.push({ path: "/signin" })
            } 
        })

        fetch("https://amplicationtodoapp.herokuapp.com/api/users" , {
            method: "GET",
            headers: {
                "Authorization": "Basic YWRtaW46YWRtaW4="
            }
        })
        .then(res => res.json())
        .then(data => {
            for(let user of data){
                if(user.username == credentials[0]){
                    this.id = user.id

                    this.todos = user.todos ? JSON.parse(user.todos) : []

                    return
                }
            }
        })
    },
    methods: {
        setTodos: function(){
            fetch(`https://amplicationtodoapp.herokuapp.com/api/users/${this.id}` , {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46YWRtaW4="
                },
                body: JSON.stringify({
                    todos: JSON.stringify(this.todos)
                })
            })
        },
        addTodo: function(){
            if(!this.todo){
                alert("The todo cannot be empty")

                return
            }

            this.todos.push(this.todo)

            this.todo = ""

            this.setTodos()
        },
        deleteTodo: function(todo){
            if(confirm("Are you sure you want to delete this todo: " + todo)){
                const temp = []

                for(let _todo of this.todos){
                    if(_todo != todo){
                        temp.push(_todo)
                    }
                }

                this.todos = temp

                this.setTodos()
            }
        },
        logout: function(){
            window.localStorage.removeItem("accessToken")

            this.$router.push({ path: "/signin" })
        }
    }
}
</script>

<style>
.todo {
    width: 100%;
    height: 70px;
    background-color: #3B4252;
    color: #D8DEE9;
    padding-left: 30px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    position: relative;
    margin-bottom: 50px
}

.deleteTodo{
    position: absolute;
    left: calc(100% - 60px);
    cursor: pointer;
}

input{
    width: 95%;
    height: 60px;
}

.todo-bar{
    position: relative;
    left: 5%;
    width: 90%;
}

button{
    width: 200px;
    background-color: #3B4252;
}

button:focus{
    outline: none;
}

.todos{
    position: relative;
    left: 5%;
    width: 90%;
}

i{
    color: #88C0D0;
    font-size: 25px
}

.logout{
    font-size: 30px;
    position: absolute;
    top: 30px;
    left: calc(100% - 70px);
    cursor: pointer;
}
</style>
