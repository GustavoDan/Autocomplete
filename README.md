# Autocomplete

Projeto que estou programando na faculdade
A ideia é fazer um autocomplete com syntax highlighting de comandos CRUD de um BD, assim como roda-los, caso estejam validos.
É necessario criar o banco, contido no script "database.sql", para o autocomplete ter acesso ao nome das tabelas/colunas

Para rodar o projeto usando XAMPP:

- Colocar a pasta raiz do projeto na pasta {local de instalação do xampp}/htdocs, o padrão é em C:/XAMPP/htdocs
- Renomear ".env.dist" para ".env" e colocar as suas credenciais do banco nele
- Iniciar os servidores Apache e MySQL na GUI do XAMPP
- Acessar localhost/{nome da pasta raiz do projeto}

Caso precise criar o banco usando XAMPP:

- Iniciar os servidores Apache e MySQL na GUI do XAMPP
- Acessar http://localhost/phpmyadmin/index.php?route=/server/sql
- Colar o script "database.sql" na caixa de texto
- Clicar no botão "Continuar"

Esse projeto foi feito para rodar usando o SGBD MySql, é necessario modificar o arquivo "database/connection.php" para usar outros SGBDs
