import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'My Bills API',
    description: 'Swagger documentation of My Bills API.',
    version: '1.0.0',
    swagger: '2.0',
    contact: {
      name: 'Rafael Correia',
      email: 'rafaelcbm@gmail.com',
      url: 'https://www.linkedin.com/in/rafaelmenezes'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  externalDocs: {
    description: 'Course link that motivated this project.',
    url: 'https://www.udemy.com/course/tdd-com-mango/?referralCode=B53CE5CA2B9AFA5A6FA1'
  },
  servers: [{
    url: '/api',
    description: 'Base API'
  }],
  tags: [{
    name: 'Login',
    description: 'Auth related APIs'
  }, {
    name: 'Wallets',
    description: 'APIs related to Wallets, responsible for grouping the bills'
  }, {
    name: 'Categories',
    description: 'APIs related to Categories, responsible for categorize the bills'
  }, {
    name: 'Bills',
    description: 'APIs related to Bills, responsible for maintain the bills'
  }],
  paths,
  schemas,
  components
}
