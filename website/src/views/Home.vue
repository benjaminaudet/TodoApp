<template>
<div class="container">
    <h2 class="center-align">Your Todos</h2>
    <div class="row" style="display: flex">
        <input type="text" v-model="todo" placeholder="Enter the todo">
        <button class="btn" v-on:click="addTodo()">Add Todo</button>
    </div>
    <div class="todos">
        <div class="todo" v-for="todo in todos" v-bind:key="todo">
            <span class="text">{{todo}}</span>
            <i class="fas fa-times deleteTodo" v-on:click="deleteTodo(todo)"></i>
        </div>
    </div>
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
        const credentials = atob(window.localStorage.getItem("accessToken")).split(":")

        fetch("http://localhost:3000/api/login", {
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

        fetch("http://localhost:3000/api/users" , {
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
            fetch(`http://localhost:3000/api/users/${this.id}` , {
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
        }
    }
}
</script>

<style scoped>
.todo {
    width: 100%;
    height: 60px;
    background-color: #EEE;
    color: black;
    padding-left: 30px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    position: relative;
    margin-bottom: 50px
}

.deleteTodo{
    position: absolute;
    left: calc(100% - 30px);

}
</style>
