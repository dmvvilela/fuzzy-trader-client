# Fuzzy Trader

Fuzzy Trader. Desafio técnico utilizando MERN Stack com auto-deploy no Heroku.

Algumas considerações:

As APIs de criptomoedas e ações são bastante limitadas, portanto algumas considerações são levadas em conta para manter o projeto na camada Free Tier:

"
Inicialmente tentei usar o alpha vantage pois já funcionaria para ambos cripto e ações.. O problema é que a camada gratuita dele permite apenas 5 requisições por minuto. Portanto, acabei utilizando ele apenas para as criptomoedas e defini em 5 moedas diferentes. (ainda assim, caso falhe peço que verifique esse detalhe e atualize para o correto funcionamento).

Para as ações então sobrou a API do worldtrading data. O problema dessa vez é que a camada gratuita permite apenas requisições http. Portanto, como o servidor no Heroku é https, o Firefox bloqueias essas requisições por ser de conteúdo misto. Então peço que realize o teste local ou mudando para http a URL no browser, caso contrário a API será bloqueada.

Para evitar problemas, na tela de investimento coloquei um botão de atualizar os valores das moedas, e após uma vez carregado seu conteúdo fica em cache no redux e aí já pode-se testar todo o aplicativo sem problemas.

Também coloquei um botão para reiniciar o banco de dados e testar o exercício de formas diferentes. Ele se encontra no menu lateral do painel.

Com as informações disponíveis fica fácil mostrar lucros, criar gráficos de investimentos, enfim. Porém acredito que já extrapolaria o objetivo deste exercício.
"

Seguem os links do projeto:

https://github.com/dmvvilela/fuzzy-trader-client
https://github.com/dmvvilela/fuzzy-trader-server
fuzzy-trader-client.herokuapp.com
fuzzy-trader-server.herokuapp.com
