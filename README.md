# Treasy Dev Warrior Challenge

Projeto iniciado a partir do repo: [angular-gulp-boilerplate](https://github.com/1oginov/Angular-Gulp-Boilerplate)

Adicionado via bower:

*angular-animate
*mini.css
*popper.js
*Fonte Material Icons (index.html)

Adicionado para desenvolvimento (tdd) via npm:

*angular-mocks (não cheguei a usar)
*karma, karma-jasmine, karma-chrome-launche
*jasmine-core

# Requisitos do desafio

COMPORTAMENTOS ESPERADOS

* Ao filtrar a arvore devem ser exibidos somente os nós que contém o termo pesquisado
e todos os seus pais para que ela mantenha a hierarquia;
* Ao excluir um nó todos os seus filhos devem ser removidos também;
* Ao cadastrar ou editar um nó devem ser solicitados os campos código, descrição e
observação sendo que somente código e descrição são obrigatórios;
* Não deve ter limite de níveis e nós cadastrados;
* Na exibição da arvore deve mostrar somente a descrição dos nós e ao colocar o mouse
sobre um nó deve exibir um tooltip com o código, a descrição e a observação do nó;
* Deve ser possível expandir e fechar cada um dos nós e também ter a opção de
expandir e fechar todos ao mesmo tempo;

REQUISITOS TÉCNICOS

* O frontend deve ser construído utilizando AngularJS 1.6.x;
* Pode ser utilizada qualquer biblioteca ou componente do AngularJS;
* O model da aplicação não precisa ser persistido, ela precisa manter as informações
somente enquanto estivermos na página, ou seja, se a página for recarregada a
aplicação pode voltar ao estado inicial;
* Deve ser utilizado Bower para gerenciar as dependências;
* Deve ser utilizado Grunt ou Gulp para fazer o build e expedição da aplicação;
* O projeto deve ser hospedado em algum servidor de sua preferência (como sugestão, é
possível utilizar o Heroku que é gratuito) e o link para acesso deve ser enviado no e-mail
da entrega.



## Quick start

Boilerplate exists in **Node.js** environment, so you need to install Node.js from
[official website](https://nodejs.org) or use [NVM](https://github.com/creationix/nvm)
([NVM for Windows](https://github.com/coreybutler/nvm-windows)) first.   

After setting up Node.js you can use **npm** ([Yarn](https://yarnpkg.com) is an alternative) to install
[Bower](https://bower.io) and [Gulp](https://gulpjs.com) globally:

```sh
npm install -g bower gulp-cli
```

### Install

Clone repository from GitHub:

```sh
git clone https://github.com/pedroivorbgrodrigues/treasy
```

Jump into `treasy` directory and install dependencies from npm registry:

```sh
cd treasy
npm install
```

Next, install dependencies from Bower registry:

```sh
bower install
```

And that's it!

### Use

Execute Gulp serving task to check if everything is fine:

```sh
gulp serve
```

Your default browser will be launched at `http://localhost:3000` serving project. See other Gulp tasks and npm scripts
you can use below.


## Credits

[angular-gulp-boilerplate](https://github.com/1oginov/Angular-Gulp-Boilerplate)
