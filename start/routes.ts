/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
const UsersService = require('./users_service.ts')
const service = new UsersService();

Route.group(() => {

Route.get('/', async({request,response}) => {
  response.send('hello')
})
  
Route.get('/users', async() => {
  const users = await service.consultar();
  return { users }
})

Route.get('/users/:id', async({request ,response}) => {
  try {
    const { id } = request.params();
            const user = await service.consultarUno(id);
            response.json(user);
  } catch (error) {
    throw new Error('User not found')
  }
});

Route.post('/create',async({request, response}) => {
        const body = request.body();
        const newUser = await service.create(body);

        response.status(201).json(newUser)
    })

Route.patch('/update/:id', async({request, response}) => {

  const { id } = request.params();
  const body = request.body();
  const user = await service.update(id, body);
  response.json(user)

})

Route.delete('/delete/:id', async({request, response}) => {
  const { id } = request.params();
  const rta = await service.delete(id);
  response.json(rta)
})

}).prefix('/app')

module.exports = Route
