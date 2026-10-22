# Saúde e qualidade de vida — trilha interativa de Educação Física (9º ano)

Sistema de aprendizagem guiada sobre **saúde, qualidade de vida e atividade física**, para o 3º
trimestre do 9º ano do Ensino Fundamental. Funciona no navegador, sem instalação e sem servidor:
o progresso do estudante fica salvo no próprio aparelho (`localStorage`).

![Educação Física](https://img.shields.io/badge/componente-Educa%C3%A7%C3%A3o%20F%C3%ADsica-F2711C)
![9º ano](https://img.shields.io/badge/ano-9%C2%BA-7B3FBF)
![EF89EF08P9](https://img.shields.io/badge/habilidade-EF89EF08P9-5B2A86)

## O que o sistema faz

- **Ensina**: cada módulo traz um texto curto, diagramas e cartões de conceito.
- **Avalia**: questões de tipos variados (associar, V/F, múltipla escolha, ordenar, cálculo,
  resposta aberta com rubrica), com correção imediata e explicação do porquê.
- **Acompanha a progressão**: pontos por módulo, percentual da trilha, nível de raciocínio
  alcançado, medalhas e gráfico comparativo.
- **Integra o caderno de papel**: sete tarefas são feitas no caderno; no sistema o estudante marca
  que fez e registra uma resposta curta, que entra no relatório.
- **Salva sozinho**: cada resposta é gravada no `localStorage` no momento em que é enviada.

## A progressão (fácil → complexo)

A trilha segue uma escala de complexidade crescente. Cada módulo só libera quando o anterior
atinge **70% dos pontos**.

| # | Módulo | Nível de raciocínio | Habilidade |
|---|---|---|---|
| 1 | Palavras que a gente confunde | Lembrar | EF89EF11P9 |
| 2 | Os fatores que puxam a sua saúde | Compreender | EF89EF11P9 |
| 3 | Ler os números | Aplicar | EF89EF07P9 |
| 4 | Saúde e beleza mudaram com o tempo | Analisar | **EF89EF08P9** |
| 5 | Ciência ou publicidade? | Avaliar | **EF89EF08P9** · EF89EF09P9 |
| 6 | Sua proposta para a escola | Criar | **EF89EF08P9** |

São 76 pontos no total e 7 tarefas de caderno.

### Habilidade central

> **EF89EF08P9** — Interpretar as transformações históricas dos padrões de desempenho, saúde e
> beleza, relacionando-as a momentos e fatos sócio-histórico-culturais, considerando a forma como
> são apresentados nos diferentes meios (científico, midiático etc.).

Habilidades de apoio: **EF89EF07P9** (programas de exercícios), **EF89EF09P9** (prática excessiva e
uso de substâncias) e **EF89EF11P9** (ginásticas e melhoria das condições de vida).

Base: Plano de Curso 2026 (3º trimestre) da Secretaria de Estado de Educação de Minas Gerais e
Currículo Referência de Minas Gerais. As recomendações de atividade física citadas seguem as
diretrizes da Organização Mundial da Saúde para a faixa de 5 a 17 anos.

## Como usar

### Estudante
Abra o endereço do sistema, escreva o nome e comece pelo módulo 1. Em cada módulo:
**1 · Aprenda** → **2 · Pratique** → **3 · No caderno**. O progresso é salvo automaticamente.

### Professor
- O relatório fica em **Meu progresso** e pode ser impresso ou salvo em PDF direto do navegador.
- O botão **Baixar meu progresso** gera um `.json` que o estudante pode enviar por e-mail ou
  classroom; **Carregar progresso** devolve o arquivo para dentro do sistema.
- As tarefas de caderno são conferidas no caderno físico; o sistema só registra que foram feitas.

### Rodar localmente

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`. Abrir o `index.html` direto pelo arquivo também funciona na
maioria dos navegadores.

## Onde o progresso fica salvo

Tudo fica em `localStorage`, sob a chave `ded-ef9-saude-v1`, **apenas no navegador do estudante**.
Não há servidor, conta, login nem envio de dados para a internet.

Consequências práticas, que valem avisar à turma:

- Limpar os dados do navegador apaga o progresso.
- Janela anônima normalmente não guarda nada (o sistema avisa quando detecta isso).
- Trocar de aparelho não leva o progresso junto — use **Baixar/Carregar progresso** para isso.

## Estrutura

```
index.html            página única
css/estilo.css        design system (mesma identidade dos Cadernos DED Express)
js/conteudo.js        todo o conteúdo: módulos, textos, diagramas SVG e questões
js/armazenamento.js   localStorage: carregar, salvar, exportar, importar, apagar
js/app.js             navegação, correção, progressão e relatório
img/                  logo e mascote
```

Para alterar ou acrescentar conteúdo, mexa só em `js/conteudo.js`. Os tipos de questão disponíveis
são `uma`, `varias`, `vf`, `associar`, `ordenar`, `numero` e `aberta`.

## Licença e uso

© 2026 DED Express. Todos os direitos reservados.

Material protegido por direito autoral (Lei nº 9.610/1998). O uso é autorizado para o professor
licenciado e suas próprias turmas. Não é permitido revender, redistribuir o código ou o conteúdo,
publicá-lo em outros repositórios ou plataformas, nem derivar outro produto a partir dele sem
autorização por escrito.
