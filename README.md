# Supertest - Sample

**Exemplo de estrutura de automação de API feita com [Supertest](https://www.npmjs.com/package/supertest) e [Mocha](https://www.npmjs.com/package/mocha)**

---

## Instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/download/) e [Node.js](https://nodejs.org/en/download/) instalados.

### Clonando o repositório

Todos os comandos abaixo são feitos no terminal

**1** - Faça um clone do repositório e acesse o diretório criado pelo clone.

**2** - Instale as dependências do projeto:

```sh
npm ci
```

O comando [npm ci](https://docs.npmjs.com/cli/ci.html) instala as dependências do projeto de forma limpa. Uma diferença importante para o [npm install](https://docs.npmjs.com/cli/install) é que remove o diretório _node_modules_ e instala as versões listadas no  [package.json](./package.json) e [package-lock.json](./package-lock.json).

### Testes de API

#### Pré-requisito

> Os testes foram realizados em cima da lib [Serverest](https://www.npmjs.com/package/serverest), que levanta API Rest para automação.
- Abra o terminal e execute `npx serverest@2`

#### Executando os testes

Para executar os testes em ambiente local, execute:

```sh
npm test
```

É também possível executar os testes para a rota `https://m.localizahertz.com` com o comando, porém **não irá funcionar**

```sh
npm run test:prod
```

As variáveis por ambiente estão definidos dentro dos arquivos _*.config.js_ em [config/](config).

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
| [Cross-env](https://www.npmjs.com/package/cross-env)| Criação de variável de ambiente

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
 └─ package.json
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

Seguindo o exemplo acima, caso precisarmos setar password para o ambiente `local`, acesse o arquivo [local.config.js](config/local.config.js) e crie a variável `password` com seu respectivo valor.

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

Para informar em qual ambiente o seu teste irá rodar, informe em `cross-env`, no script de teste, o nome inicial do arquivo de conf.

**Exemplo**
_Arquivo_ `hom.config.js`
_Comando para execução do teste_ `cross-env AMBIENTE=\"hom\" mocha`


Scripts atuais do [package.json](package.json):
``` json
"scripts": {
  "test": "cross-env AMBIENTE=\"local\" mocha",
  "test:prod": "cross-env AMBIENTE=\"producao\" mocha"
},
```

## Lint

É boa prática que os arquivos estejam padronizados, seguindo o padrão de estilo do JS.
Para isso é utilizado a lib [Standard](https://www.npmjs.com/package/standard).

Após o término da sua implementação, execute:

`npm run lint:fix`
