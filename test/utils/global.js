const supertest = require('supertest')

const { url } = require('../../config')

global.request = supertest(url)
