# Supertest - Sample

![Testes de API](https://github.com/PauloGoncalvesBH/sample-supertest/workflows/Testes%20de%20API/badge.svg)
[![ServeRest API](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/PauloGoncalvesBH/ServeRest/)

**Exemplo de estrutura de automação de API feita com [Supertest](https://www.npmjs.com/package/supertest) e [Mocha](https://www.npmjs.com/package/mocha)**

- [Instalação e execução](#instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Clonando o repositório](#clonando-o-repositório)
- [Testes de API](#testes-de-api)
  - [Pré-requisito](#pré-requisito)
  - [Executando os testes](#executando-os-testes)
  - [Resultado](#resultado)
- [Sobre o projeto](#sobre-o-projeto)
  - [Dependências utilizadas](#dependências-utilizadas)
  - [Estrutura de diretórios](#estrutura-de-diretórios)
  - [Ambiente](#ambiente)
- [Lint](#lint)

---

## Instalação e execução

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker-compose](https://docs.docker.com/compose/install/) instalados.

### Testes de API

Os testes foram realizados em cima do [Serverest](https://github.com/PauloGoncalvesBH/ServeRest), que fornece rotas REST para fins de estudos.

#### Executando os testes

Para executar os testes direcionados para o ambiente de produção ([https://serverest.dev](http://serverest.dev/)), execute:

```sh
make test-prod
```

Para executar os testes em ServeRest executando localmente (_http://localhost:3000_), execute:

```sh
make test-local
```

> Antes do teste acima ser executado o container do ServeRest é iniciado localmente

As variáveis por ambiente estão definidos dentro dos arquivos _*.config.js_ em [config/](config).

### Resultado

O resultado dos testes são apresentados no terminal e em report HTML gerado com [mochawesome](https://www.npmjs.com/package/mochawesome).

<img src=https://user-images.githubusercontent.com/29241659/83446839-cbe8d380-a425-11ea-991b-c36cb0337859.png height="400">

## Sobre o projeto

### Dependências utilizadas
| lib | descrição
| --- | ---
| [Supertest](https://www.npmjs.com/package/supertest) | Biblioteca de automação de API
| [Mocha](https://www.npmjs.com/package/mocha) | Estrutura (`describe`, `it`, etc) e runner da automação
| [Chai](https://www.npmjs.com/package/chai)| Asserção em formato de BDD / TDD
| [@hapi/joi](https://www.npmjs.com/package/@hapi/joi) | Biblioteca para criação de schemas
| [Faker](https://www.npmjs.com/package/faker)| Gera dados aleatórios para serem utilizados nos testes
| [Mochawesome](https://www.npmjs.com/package/mochawesome)| Gera report HTML
| [Standard](https://www.npmjs.com/package/standard)| Linter e formatter do código JS

As dependências estão definidas no [package.json](./package.json).

### Estrutura de diretórios

```
sample-supertest/
 ├─ config/
 |   ├─ local.config.js
 |   └─ producao.config.js
 ├─ test/
 |   ├─ rota*/
 |       ├─ get.test.js
 |       └─ post.test.js
 |   └─ utils/
 ├─ .mocharc.js
 ├─ package.json
 ├─ Makefile
 ├─ docker-compose.yml
 └─ Dockerfile
```

- :file_folder: [config/](config): Dir com as variáveis que dependem do ambiente (ex.: _url, senha, password_)
- :file_folder: [test/](test): Dir com os testes das rotas e arquivos que auxiliam a automação
  - :file_folder: [usuarios/](test/usuarios) Dir com os testes da rota _usuarios_. O nome do diretório sempre será o da rota validada.
    - :page_with_curl: [get.test.js](test/usuarios/get.test.js) Arquivo de teste do verbo GET
  - :file_folder: [utils/](test/utils): Dir com todos os métodos consumidos pelos testes
- :page_with_curl: [.mocharc.js](.mocharc.js): Arquivo de configuração do [Mocha](https://www.npmjs.com/package/mocha)
- :page_with_curl: [package.json](package.json): Arquivo com informações das dependências do projeto, licença, scripts, autor, etc. Para saber mais [clique aqui](https://docs.npmjs.com/files/package.json)

### Ambiente

Determinados testes possuem dados atrelados a ambiente, como URL, que varia entre ambiente local, de homologação, produção, etc.

Caso precisarmos setar password para o ambiente `local`, acesse o arquivo [local.config.js](config/local.config.js) e crie a variável `password` com seu respectivo valor.

``` js
= module.exports = {
+  password: 'SENHA_PRODUCAO_123',
=   url: 'http://localhost:3000'
= }
```

Para consumir essa variável no seu arquivo de teste, importe o dir [config/](config):
``` js
// test/usuarios/post.test.js

const config = require('../../config')
console.log('Valor de Password:', config.password)
// Valor de Password: SENHA_PRODUCAO_123
```

Para informar em qual ambiente o seu teste irá rodar informe no script de teste o nome inicial do arquivo de conf.

##### Exemplo:

Para testar o ambiente `hom` deve ser criado o arquivo `hom.config.js` e o comando de execução fica igual a `AMBIENTE='hom' mocha`

#### Scripts atuais do [package.json](package.json)

``` json
"scripts": {
  "test": "AMBIENTE='local' mocha",
  "test:prod": "AMBIENTE='producao' mocha"
},
```

## Lint

É boa prática que os arquivos estejam padronizados, seguindo o padrão de estilo do JS.
Para isso é utilizado a lib [Standard](https://www.npmjs.com/package/standard).

Após o término da sua implementação, execute:

`npm run lint:fix`
