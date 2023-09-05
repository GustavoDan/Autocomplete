CREATE DATABASE IF NOT EXISTS autocomplete_teste;
USE autocomplete_teste;

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    idade INT,
    altura DECIMAL(5,2),
    data_nascimento DATE,
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT,
    preco DECIMAL(10,2),
    disponivel BOOLEAN
);

CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    produto_id INT,
    quantidade INT,
    data_pedido DATE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    cargo VARCHAR(50),
    salario DECIMAL(10,2),
    data_contratacao DATE
);
