# MicroService - Prescriptions
Um microserviço para registrar prescrições médicas.

### Instalação
---
Requer [Node.js](https://nodejs.org/) v12+ 
Abra um terminal, na raiz do projeto, e instale as dependências. 
```sh
$ npm install 
```
#### Database
---
A aplicação foi feita com o PostgreSQL.
É necessário possuir um banco postgresql instalado.
O nome do banco e o usuário da aplicação para rodar a aplicação localmente encontram-se em variáriveis de ambiente que foram setadas em um arquivo oculto(.env).
Por motivos de segurança esse arquivo (.env) faz parte do gitingnore e portanto não está entre os arquivos do projeto.
Sendo assim, o mesmo deve ser criado na raiz do projeto, seguindo a estrutura abaixo(.env):
```sh
NODE_ENV=local_env
SECRET=P0@2g5%@2r4m7e3 
PSP_PORT=7000 
DB_USER=postgres 
DB_HOST=localhost 
DB_NAME=iclinic 
DB_PASSWORD=apolo1 
DB_PORT=5432

TOKEN_PATIENT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJzZXJ2aWNlIjoicGF0aWVudHMifQ.Pr6Z58GzNRtjX8Y09hEBzl7dluxsGiaxGlfzdaphzVU 

HOST_PATIENT=https://limitless-shore-81569.herokuapp.com/v3/patients

TOKEN_CLINIC=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJzZXJ2aWNlIjoiY2xpbmljcyJ9.r3w8KS4LfkKqZhOUK8YnIdLhVGJEqnReSClLCMBIJRQ

HOST_CLINIC=https://agile-earth-43435.herokuapp.com/v1/clinics

TOKEN_PHYSICIAN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJzZXJ2aWNlIjoicGh5c2ljaWFucyJ9.Ei58MtFFGBK4uzpxwnzLxG0Ljdd-NQKVcOXIS4UYJtA

HOST_PHYSICIAN=https://cryptic-scrubland-98389.herokuapp.com/v2/physicians

TOKEN_METRIC=SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

HOST_METRIC=https://mysterious-island-73235.herokuapp.com/api/metrics
```
Para os ambientes dev, homolog e production, escolhi o PM2 como gerenciador de instância do NodeJS e sua configuração encontra-se no arquivo ecosystem.config.js na raiz do projeto.
Para um teste real, em um servidor online(DEV, HOMOLOG ou PROD),  espera-se(por motivos de segurança ) que as mesmas variáveis de ambiente do arquivo .env com seus respectivos dados de acesso estejam setadas no servidor.
Após a instalação das dependências deve-se criar um banco com o nome , usuário e senha informados nas variáveis de ambiente.

Com o banco criado rode o comando:
```sh
$ npm run initdb
```
Isso criará a tabela para receber as prescrições.
### Cache
---
Escolhi o **Redis** para realizar o cache das requisições do serviços dependentes.
Logo é necessário que o Redis esteja instalado na máquina onde a aplicação for executada.
**Redis: https://redis.io/download**

### Logs
---
Utilizei 2 fromatos de logs para a aplicação.
1: Texto puro gerado pelo PM2
2: JSON com utilização do Winston
Ambos encontram-se no diretório Logs na raiz do projeto.
Os arquivos relativos ao winston carregam o termo json no nome.

### Códigos e Mensagens de Erro
---
Utilizei o módulo **config** para parametrizar os códigos e as mensagens de erro e info.
**Config: https://www.npmjs.com/package/config**

### Testes
---
Optei pelo Jest para realizar os testes.
##### Unitários 
Execute o comando:
```sh
$ npm test
```
# Executando a aplicação
---
### Para ambiente Local com node/nodemon

```sh
$ npm run local
```
### Para ambiente Dev, Homolog ou Production com PM2, respectivamente:

```sh
$ npm run dev
```
```sh
$ npm run hmg
```
```sh
$ npm run prod  
```
 
 ---
 
 ### Postman 
 ---
 Para verfiicar os endpoints da aplicação, deve-se immportar no Postman a collection iclinic.postman_collection.json que encontra-se na raiz do projeto dentro do diretório postman.
### Autenticação
---
Esse serviço não foi feito com autenticação( o que é bem simples e mais comum para serviços via API com JWT ), por que presumiu-se que o mesmo seria avaliado somente seguindo as informações que constavam nas regras de negócio. E como as  regras não solicitavam autenticação, esta não foi feita. No entanto, dado a modularização do serviço, uma autenticação é facilmente acoplada.
 
 # Rotas da Aplicação
 ---
#### Host: localhost:7000
### Criação de Prescrição

Ao acionar esse endpoint teremos um registro de transação gerando a consulta aos serviços dependentes(gerando cache), montando as métricas e registrando-as, e por fim, persistindo a prescrição.
|Request| POST|
|---|---| 
|Content-Type|application/json| 
|Rota|/prescriptions|

```
Exemplo: http://localhost:7000/prescriptions
body
 {
	"clinic":1,
	"physician":2,
	"patient":8,
	"text":"Tomar Paracetamol 1x ao dia"
}
```
|Response JSON| Status 400| 
|---|---|  

```
{
    "success": false,
    "error": {
        "code": "03",
        "message": "patient not found"
    },
    "response": "We can't to register the prescription. Please, try later!"
}
```
---
