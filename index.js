const express = require('express')
const uuid = require ('uuid')

const port = 3000
const app = express()
app.use(express.json())

/*
    - Query params => meusite.com/users?name=marcelo&age=35 // FILTROS
    - Route params => /users/2      //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO.
    - Request body => {"name":"Marcelo", "age": 35}

    - GET => Buscar informação no back-end
    - POST => Criar informação no back-end
    - PUT / PATCH => Alterar/Atualizar informação no back-end
    - DELETE => Deletar informação no back-end
*/

//Query params
// app.get('/users', (request, response) => {
//     const { name, age } = request.query
    
//     console.log(name, age)

//     return response.json({name: name, age: age})
// })

// app.listen(port, () =>{
//     console.log('🚀Server started on port 3000🚀')
// })


//Route params
// app.get('/users/:id', (request, response) => {

//     const id = request.params
    
//     console.log(id)

//     return response.json({id})
// })

// app.listen(port, () =>{
//     console.log('🚀Server started on port 3000🚀')
// })


//Request Body
// app.get('/users', (request, response) => {

//     const { name, age } = request.body
//     console.log(request.body)
  
//     return response.json({name, age})
// })

// app.listen(port, () =>{
//     console.log('🚀Server started on port 3000🚀')
// })



//Rotas sem Middlewares
// const users = []
// app.get('/users', (request, response) => {

//     return response.json(users)
// })

// app.post('/users', (request, response) => {

//     const { name, age } = request.body

//     const user = { id:uuid.v4(), name, age}

//     users.push(user)

//     return response.status(201).json(users)
// })

// app.put('/users/:id', (request, response) => {
//     const { id } = request.params
//     const { name, age } = request.body

//     const updateUser = {id, name, age }

//     const index = users.findIndex( user => user.id === id)

//     if(index < 0){
//         return response.status(404).json({ error: "User not found"})
//     }
    

//     users[index] = updateUser

//     return response.json(updateUser)
// })


// app.delete('/users/:id', (request, response) => {
//     const { id } = request.params
    

//     const index = users.findIndex( user => user.id === id)

//     if(index < 0){
//         return response.status(404).json({ error: "User not found"})
//     }

//     users.splice(index,1)

//     return response.status(204).json(users)
// })


// app.listen(port, () =>{
//     console.log('🚀Server started on port 3000🚀')
// })



const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex( user => user.id === id)

    if(index < 0){
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()

}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {

    const { name, age } = request.body

    const user = { id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(users)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = {id, name, age }

    users[index] = updateUser

    return response.json(updateUser)
})


app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    
    users.splice(index,1)

    return response.status(204).json(users)
})


app.listen(port, () =>{
    console.log('🚀Server started on port 3000🚀')
})