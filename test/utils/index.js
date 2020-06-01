const faker = require('faker')

async function cadastrarUsuario ({
  nome = faker.name.firstName() + ' ' + faker.name.lastName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
  administrador = `${faker.random.boolean()}`
} = {}) {
  const { body } = await request.post('/usuarios').send({
    nome,
    email,
    password,
    administrador
  }).expect(201)
  return {
    nome,
    email,
    password,
    administrador,
    _id: body._id
  }
}

module.exports = {
  cadastrarUsuario
}
