# Projeto Final de Desenvolvimento-web
Repositório para armazenar o trabalho da disciplina Desenvolvimento de Plataformas Web.


## Como baixar o projeto e colocar para rodar corretamente

Esse projeto é separado entre API e Front-end, sendo a api zipada e o front está no github normalmente, para rodar os dois da maneira correta siga o passo a passo abaixo:
**Atenção, caso não consiga rodar o projeto com o passo a passo abaixo contatar o aluno Wescley Silva pelo unifor online(2319735) ou pelo whatsapp(85987372570)**
### Windows

1. Clonar o repositorio para a máquina

![Print](https://i.ibb.co/F7yVHnf/Captura-de-tela-2024-06-05-202439.png)


2. Entre dentro da pasta do projeto pelo explorador de arquivos e extraia a API e o Servidor Docker(Utilize a opção "Extrair aqui")


   ![Explorador](https://i.ibb.co/CHxsgqJ/Captura-de-tela-2024-06-05-202926.png)

3. Para utilização do servidor docker no proximo passo, precisamos instalar o wsl 2, siga o artigo a seguir para instalar: [Artigo de instalação wsl 2](https://marcelo-albuquerque.medium.com/como-instalar-o-wsl-2-no-windows-10-3e26d99d7161)


4.  Instale o Docker Desktop para utilizarmos o Servidor Docker disponibilizado. Recomendo que siga este artigo para instalação: [Artigo de instalação](https://docs.docker.com/desktop/install/windows-install/#install-docker-desktop-on-windows) - [Link Para download](https://desktop.docker.com/win/main/amd64/149282/Docker%20Desktop%20Installer.exe)


5. Abra o docker desktop e vá nas configurações


![Docker desktop](https://i.ibb.co/dWwBVTH/Captura-de-tela-2024-06-05-232135.png)

6. Vá em Resources -> WSL Integration, selecione seu wsl e clique em "apply & restart"

![Docker wsl](https://i.ibb.co/ch2zmSf/image.png)

7. Abra seu wsl e digite o seguinte comando para entrar na pasta do projeto

`cd /mnt/c/Users/{Nome do Usuario}/{Pasta onde esta o projeto}/desenvolvimento-web/Server\ Docker/ `

![Wsl terminal](https://i.ibb.co/c287nJ1/Captura-de-tela-2024-06-05-234430.png)


8. Rode o seguinte comando para iniciar a criação dos containers da aplicação


``sudo docker-compose up -d``

![Docker up](https://i.ibb.co/9qhmfR6/Captura-de-tela-2024-06-05-235902.png)


9. Com o servidor rodando, agora precisamos atualizar os componentes da api e gerar uma nova chave para ela funcionar.

`Primeiro comando: docker-compose exec app bash`

`Segundo comando: cd api-unifor`

`Terceiro comando: composer update`

`Ultimo comando: php artisan key:generate`

![Primeiros 3 comandos](https://i.ibb.co/LZLRnXx/Captura-de-tela-2024-06-07-011600.png)


10. Após completar todos esses passos, basta acessar a url [desenvolvimento.web.com](http://desenvolvimento.web.com)
