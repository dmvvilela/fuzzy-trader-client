# Fuzzy Trader

Fuzzy Trader. A technical challenge for BxBlue.

Algumas considerações:

"
O free tier das APIs sugeridas são um pouco conservadores. Então inicialmente tentei usar o alpha vantage pois já funcionaria para ambos cripto e ações.. O problema é que a camada gratuita dele permite apenas 5 requisições por minuto. Portanto, acabei utilizando ele apenas para as criptomoedas e defini em 5 moedas diferentes. (ainda assim, caso falhe peço que verifique esse detalhe e atualize para o correto funcionamento).

Para as ações então sobrou a API do worldtraging data. O problema dessa vez é que a camada gratuita permite apenas requisições http. Portanto, como o servidor no Heroku é https, o Firefox bloqueias essas requisições por ser de conteúdo misto. Então peço que realize o teste local ou (preferencialmente) no Chrome, caso contrário a API será bloqueada.

Para evitar problemas, na tela de investimento coloquei um botão de atualizar os valores das moedas, e após uma vez carregado seu conteúdo fica em cache no redux e aí já pode-se testar todo o aplicativo sem problemas.
"
