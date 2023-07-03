Esse é um projeto desenvolvido utilizando NextJs e Typescript, utilizando a API da Marvel para buscar personagens e suas histórias.

Qualquer sugestão de modificação referente ao código ou o design do app, será muito bem-vindo.

Caso queiram visualizar o projeto, acessem: https://marvel-search-flame.vercel.app/

## Iniciando

Para iniciar a aplicação, utilize npm install para instalar as dependencias, e em seguida utilize o comando abaixo:

```bash
npm run dev

```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.



## Pesquisando

Para realizar uma pesquisa, você precisa inserir o primeiro nome do personagem em ingles. Por exemplo, pesquisar pela palavra 'Captain', irá encontrar todos os personagens que começam com 'Captain'. Caso você pesquisa por 'America', irá realizar a mesma função, mas deixando de fora personagens como 'Captain America'.

Essa é uma requisição da própria API da Marvel, que pede o nome completo ou o primeiro nome do personagem para realizar a busca.

Obs.: Verifique se na busca não possui espaço em branco no inicio ou final, resultando em erro no busca.
## Tecnologias utilizadas

Para estilização dos componentes, foi utilizado a biblioteca Styled-Components, junto com o auxílio de TailwindCss. O motivo de utilizar TailwindCSS, é para facilitar o teste de algumas animações e transições de maneira mais ágil. No final do projeto, todas as classes do TailwindCSS foram removidas, e toda a estilização foi feita com Styled-Components.

Para criar algumas animações mais complexas, foi utilizado a biblioteca Framer-Motion. Essa biblioteca facilita a criação de animação que envolvem modificação do Layout da página e transformações de componentes.

Ainda sobre animações, foi utilizado uma biblioteca chamada lottie-react, que permite importar animações de vetor criadas pela plataforma Lottie.

