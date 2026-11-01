# 🛒 Rage Store: Bot de E-commerce com Entrega Automática

## 📌 Visão geral

Uma solução full-stack completa no Discord para a venda de produtos digitais. O bot automatiza todo o ciclo de
venda: do controle de estoque e da interface dinâmica até o pagamento em tempo real pela **API do Mercado Pago**
e a entrega instantânea do produto.

## 🚀 Principais funcionalidades e regras de negócio

* **Pagamento em tempo real:** usa o SDK do Mercado Pago para gerar QR Codes PIX dinâmicos e chaves "Copia e Cola"
  direto na interface do Discord.
* **Entrega automática (FIFO):** segue a lógica "primeiro a entrar, primeiro a sair" na entrega das chaves de licença.
  Assim que o pagamento é confirmado, o sistema puxa automaticamente uma chave única de um banco SQLite e entrega ao cliente.
* **Gestão de estoque dinâmica:** um painel administrativo permite atualizar produtos, ajustar preços e repor estoque
  em tempo real, por meio de formulários (Modals) do Discord.
* **Checkout seguro:** cria um tópico privado e temporário para cada cliente, garantindo uma transação reservada
  e evitando a exposição de dados.

## 🛠️ Arquitetura técnica

* **Backend:** Node.js com `discord.js` v14.
* **Banco de dados:** `quick.db` (baseado em SQLite) para guardar com rapidez os rascunhos de produtos e as listas de estoque.
* **Integração de pagamentos:** integração REST com o Mercado Pago para acompanhar o status das transações (consulta periódica).
* **Gerenciamento de estado:** lida com interações de várias etapas usando envio de formulários (Modals) e rascunhos temporários no banco.

## 🔐 Boas práticas de segurança

* **Isolamento de credenciais:** segredos como o token do Discord e as chaves da API de pagamento ficam apenas
  em arquivos `.env`, que não estão no repositório.
* **Controle de acesso por cargo:** as funções administrativas são protegidas por verificação do ID do cargo,
  impedindo que pessoas não autorizadas alterem o estoque.
* **Validação de entradas:** os dados enviados pelos usuários são tratados e validados para impedir a injeção de
  scripts nos anúncios de produtos.
