/* Conteúdo da trilha — Educação Física, 9º ano.
   Habilidade central: EF89EF08P9 (CRMG/BNCC). Habilidades de apoio: EF89EF07P9, EF89EF09P9, EF89EF11P9.
   A progressão vai do mais simples (lembrar) ao mais complexo (criar), na ordem dos módulos. */

const HABILIDADES = {
  EF89EF08P9:
    "Interpretar as transformações históricas dos padrões de desempenho, saúde e beleza, " +
    "relacionando-as a momentos e fatos sócio-histórico-culturais, considerando a forma como são " +
    "apresentados nos diferentes meios (científico, midiático etc.).",
  EF89EF07P9:
    "Experimentar e fruir um ou mais programas de exercícios físicos, identificando as exigências " +
    "corporais e os objetivos de cada programa, reconhecendo a importância de uma prática planejada " +
    "e adequada às características, necessidades, intenções, afinidades e objetivos de cada sujeito.",
  EF89EF09P9:
    "Problematizar a prática excessiva de exercícios físicos e o uso de medicamentos para a ampliação " +
    "do rendimento ou potencialização das transformações corporais, recorrendo a fatos e ao " +
    "conhecimento científico produzido.",
  EF89EF11P9:
    "Identificar e comparar as diferenças e semelhanças entre a ginástica de conscientização corporal " +
    "e as de condicionamento físico e discutir como a prática de cada uma dessas manifestações pode " +
    "contribuir para a melhoria das condições de vida, saúde, bem-estar e cuidado consigo mesmo.",
};

const NIVEIS = {
  lembrar: { rotulo: "Lembrar", cor: "#4FC3F7", ordem: 1 },
  compreender: { rotulo: "Compreender", cor: "#7AC943", ordem: 2 },
  aplicar: { rotulo: "Aplicar", cor: "#FFC928", ordem: 3 },
  analisar: { rotulo: "Analisar", cor: "#F2711C", ordem: 4 },
  avaliar: { rotulo: "Avaliar", cor: "#C2185B", ordem: 5 },
  criar: { rotulo: "Criar", cor: "#7B3FBF", ordem: 6 },
};

/* ------------------------------------------------------------------ diagramas
   SVG inline: nada de imagem gerada, o texto precisa ser exato e legível. */

const SVG_TEIA = `
<svg viewBox="0 0 640 380" class="fig" role="img" aria-label="Teia com seis fatores de saúde ligados entre si">
  <defs><style>.no{fill:#F1EAFB;stroke:#7B3FBF;stroke-width:3}.rt{font:700 17px Nunito;fill:#3D1766}
  .lg{stroke:#C9BEDD;stroke-width:2.5;stroke-dasharray:7 6}</style></defs>
  <line class="lg" x1="320" y1="190" x2="110" y2="70"/><line class="lg" x1="320" y1="190" x2="530" y2="70"/>
  <line class="lg" x1="320" y1="190" x2="80" y2="300"/><line class="lg" x1="320" y1="190" x2="560" y2="300"/>
  <line class="lg" x1="320" y1="190" x2="320" y2="45"/><line class="lg" x1="320" y1="190" x2="320" y2="340"/>
  <line class="lg" x1="110" y1="70" x2="320" y2="45"/><line class="lg" x1="530" y1="70" x2="560" y2="300"/>
  <circle cx="320" cy="190" r="56" fill="#F2711C"/>
  <text x="320" y="185" text-anchor="middle" style="font:800 16px Nunito;fill:#fff">QUALIDADE</text>
  <text x="320" y="204" text-anchor="middle" style="font:800 16px Nunito;fill:#fff">DE VIDA</text>
  <g>
    <ellipse class="no" cx="320" cy="45" rx="78" ry="26"/><text class="rt" x="320" y="51" text-anchor="middle">Movimento</text>
    <ellipse class="no" cx="110" cy="70" rx="68" ry="26"/><text class="rt" x="110" y="76" text-anchor="middle">Sono</text>
    <ellipse class="no" cx="530" cy="70" rx="86" ry="26"/><text class="rt" x="530" y="76" text-anchor="middle">Alimentação</text>
    <ellipse class="no" cx="80" cy="300" rx="72" ry="26"/><text class="rt" x="80" y="306" text-anchor="middle">Convívio</text>
    <ellipse class="no" cx="560" cy="300" rx="72" ry="26"/><text class="rt" x="560" y="306" text-anchor="middle">Telas</text>
    <ellipse class="no" cx="320" cy="340" rx="92" ry="26"/><text class="rt" x="320" y="346" text-anchor="middle">Saúde mental</text>
  </g>
</svg>`;

const SVG_INTENSIDADE = `
<svg viewBox="0 0 640 230" class="fig" role="img" aria-label="Escala de intensidade pelo teste da fala">
  <defs><style>.t{font:700 16px Nunito;fill:#3D1766}.b{font:800 18px Nunito;fill:#fff}</style></defs>
  <rect x="20" y="40" width="190" height="62" rx="12" fill="#7AC943"/>
  <rect x="225" y="40" width="190" height="62" rx="12" fill="#FFC928"/>
  <rect x="430" y="40" width="190" height="62" rx="12" fill="#F2711C"/>
  <text class="b" x="115" y="78" text-anchor="middle">LEVE</text>
  <text class="b" x="320" y="78" text-anchor="middle">MODERADA</text>
  <text class="b" x="525" y="78" text-anchor="middle">VIGOROSA</text>
  <text class="t" x="115" y="132" text-anchor="middle">Consigo cantar</text>
  <text class="t" x="115" y="154" text-anchor="middle">sem esforço</text>
  <text class="t" x="320" y="132" text-anchor="middle">Consigo conversar,</text>
  <text class="t" x="320" y="154" text-anchor="middle">mas não cantar</text>
  <text class="t" x="525" y="132" text-anchor="middle">Só falo frases</text>
  <text class="t" x="525" y="154" text-anchor="middle">curtas, ofegante</text>
  <text x="320" y="200" text-anchor="middle" style="font:800 17px Nunito;fill:#5B2A86">Teste da fala</text>
  <text x="320" y="221" text-anchor="middle" style="font:600 14px Nunito;fill:#6B6680">dá para medir a intensidade sem nenhum aparelho</text>
</svg>`;

const SVG_LINHA_TEMPO = `
<svg viewBox="0 0 660 200" class="fig" role="img" aria-label="Linha do tempo dos padrões de corpo">
  <line x1="30" y1="96" x2="620" y2="96" stroke="#7B3FBF" stroke-width="6" stroke-linecap="round"/>
  <polygon points="620,84 648,96 620,108" fill="#7B3FBF"/>
  <g style="font:800 15px Nunito;fill:#3D1766" text-anchor="middle">
    <circle cx="90" cy="96" r="13" fill="#F2711C"/><text x="90" y="58">início do séc. XX</text>
    <circle cx="250" cy="96" r="13" fill="#F2711C"/><text x="250" y="150">anos 1960</text>
    <circle cx="410" cy="96" r="13" fill="#F2711C"/><text x="410" y="58">anos 1990</text>
    <circle cx="570" cy="96" r="13" fill="#F2711C"/><text x="570" y="150">hoje</text>
  </g>
  <g style="font:600 13px Nunito;fill:#6B6680" text-anchor="middle">
    <text x="90" y="78">corpo cheio = saúde</text>
    <text x="250" y="172">magreza em alta</text>
    <text x="410" y="78">corpo "malhado"</text>
    <text x="570" y="172">filtro e edição</text>
  </g>
</svg>`;

/* ------------------------------------------------------------------ módulos */

const MODULOS = [
  // ───────────────────────────────────────────────────────────── 1 · LEMBRAR
  {
    id: "m1",
    titulo: "Palavras que a gente confunde",
    nivel: "lembrar",
    habilidade: "EF89EF11P9",
    resumo: "Saúde, qualidade de vida, atividade física, exercício e comportamento sedentário não são sinônimos.",
    aprenda: [
      { tipo: "texto", html:
        "<p><b>Saúde</b>, para a Organização Mundial da Saúde, é um estado de bem-estar <b>físico, mental e social</b> — " +
        "e não apenas a ausência de doença. Quem não está doente não está, automaticamente, com saúde.</p>" +
        "<p><b>Qualidade de vida</b> é a percepção que a pessoa tem da própria vida, dentro da cultura e dos valores " +
        "dela, em relação aos seus objetivos e expectativas. Por isso ela é, em parte, <b>subjetiva</b>: duas pessoas " +
        "na mesma situação podem avaliá-la de formas diferentes.</p>" },
      { tipo: "cartoes", itens: [
        { t: "Atividade física", d: "Qualquer movimento do corpo que gaste mais energia que o repouso: subir escada, varrer a casa, ir a pé para a escola." },
        { t: "Exercício físico", d: "Atividade física <b>planejada, estruturada e repetitiva</b>, com um objetivo: treinar, melhorar a resistência, ganhar força." },
        { t: "Comportamento sedentário", d: "Tempo acordado sentado, reclinado ou deitado, com gasto de energia muito baixo: aula, ônibus, celular, videogame." },
        { t: "Inatividade física", d: "Não alcançar o mínimo de atividade física recomendado para a idade. É diferente de comportamento sedentário." },
      ] },
      { tipo: "aviso", html:
        "Dá para ser <b>ativo e sedentário ao mesmo tempo</b>: alguém que treina 1 hora e passa outras 10 horas " +
        "sentado cumpre a recomendação de movimento e, ainda assim, tem muito comportamento sedentário." },
    ],
    questoes: [
      { id: "q1", tipo: "associar", pontos: 4,
        enunciado: "Ligue cada termo à sua definição.",
        pares: [
          ["Atividade física", "Qualquer movimento que gasta mais energia que o repouso"],
          ["Exercício físico", "Movimento planejado, estruturado e repetitivo, com objetivo"],
          ["Comportamento sedentário", "Tempo acordado sentado ou deitado, com gasto muito baixo"],
          ["Qualidade de vida", "Percepção da própria vida frente a objetivos e expectativas"],
        ],
        explicacao: "Todo exercício é atividade física, mas nem toda atividade física é exercício: falta o planejamento e o objetivo." },
      { id: "q2", tipo: "uma", pontos: 2,
        enunciado: "Mariana vai a pé até a escola todos os dias, 15 minutos na ida e 15 na volta. Isso é:",
        opcoes: ["Exercício físico, porque é todo dia", "Atividade física, porque é movimento com gasto de energia, mas não é planejado para treinar", "Comportamento sedentário", "Nenhuma das anteriores"],
        correta: 1,
        explicacao: "É deslocamento ativo: conta muito para a saúde, mas não foi estruturado como treino. Logo, atividade física." },
      { id: "q3", tipo: "vf", pontos: 4,
        enunciado: "Marque verdadeiro ou falso.",
        itens: [
          { t: "Quem não tem nenhuma doença tem, por definição, saúde.", v: false, por: "A definição da OMS inclui bem-estar mental e social, não só ausência de doença." },
          { t: "Uma pessoa pode treinar todo dia e, mesmo assim, ter muito comportamento sedentário.", v: true, por: "São medidas diferentes: minutos de movimento e horas sentado." },
          { t: "Qualidade de vida tem um componente subjetivo, que depende da própria pessoa.", v: true, por: "Ela envolve a percepção de cada um sobre a própria vida." },
          { t: "Varrer a casa não conta como atividade física.", v: false, por: "Conta: é movimento com gasto de energia acima do repouso." },
        ] },
    ],
    caderno: [
      { id: "c1", enunciado:
        "Liste no caderno <b>cinco coisas que você fez ontem</b> envolvendo (ou não) movimento. Ao lado de cada uma, " +
        "classifique: <i>atividade física</i>, <i>exercício físico</i> ou <i>comportamento sedentário</i>.",
        campo: "Quantas das cinco foram comportamento sedentário?" },
    ],
  },

  // ─────────────────────────────────────────────────────── 2 · COMPREENDER
  {
    id: "m2",
    titulo: "Os fatores que puxam a sua saúde",
    nivel: "compreender",
    habilidade: "EF89EF11P9",
    resumo: "A atividade física é um fator entre vários — e eles se influenciam.",
    aprenda: [
      { tipo: "texto", html:
        "<p>A saúde não depende de uma coisa só. Ela é puxada por vários <b>fatores</b> ao mesmo tempo, e eles " +
        "conversam entre si: dormir mal reduz a disposição para se movimentar; movimentar-se melhora o sono. " +
        "É um sistema, não uma lista.</p>" },
      { tipo: "svg", svg: SVG_TEIA },
      { tipo: "texto", html:
        "<p>Alguns fatores são <b>modificáveis</b> — dá para agir sobre eles: tempo de movimento, alimentação, sono, " +
        "tempo de tela, uso de álcool e tabaco. Outros são <b>não modificáveis</b>: idade, sexo biológico, herança " +
        "genética.</p>" +
        "<p>E existem os <b>determinantes sociais</b>: renda da família, moradia, saneamento, segurança do bairro, " +
        "acesso a praça, quadra e posto de saúde. Eles não dependem só do esforço individual — e explicam por que " +
        "“é só querer” é uma resposta rasa para um problema de saúde coletiva.</p>" },
    ],
    questoes: [
      { id: "q1", tipo: "varias", pontos: 4,
        enunciado: "Quais destes são fatores <b>modificáveis</b>? (marque todos)",
        opcoes: ["Horas de sono por noite", "Idade", "Tempo diário de tela no lazer", "Herança genética", "Quantidade de movimento na semana"],
        corretas: [0, 2, 4],
        explicacao: "Idade e genética não mudam. Sono, tela e movimento são hábitos — e por isso entram em qualquer plano de mudança." },
      { id: "q2", tipo: "associar", pontos: 4,
        enunciado: "Relacione o fator ao efeito que a pesquisa em saúde costuma associar a ele.",
        pares: [
          ["Movimento regular", "Melhora o humor e ajuda a regular o sono"],
          ["Noites mal dormidas", "Reduzem a disposição e a concentração no dia seguinte"],
          ["Muito tempo sentado", "Aumenta o risco cardiovascular, mesmo em quem treina"],
          ["Convívio social", "Protege a saúde mental e sustenta a adesão a hábitos"],
        ],
        explicacao: "Repare que os efeitos se cruzam: o movimento melhora o sono, e o sono melhora a vontade de se movimentar." },
      { id: "q3", tipo: "uma", pontos: 3,
        enunciado: "Dois bairros têm renda parecida. No bairro A há praça iluminada, quadra aberta e ciclovia; no bairro B, não. " +
          "Estudos mostram que os moradores do bairro A se movimentam mais. Qual conclusão é a mais adequada?",
        opcoes: [
          "Os moradores do bairro B são preguiçosos",
          "O ambiente onde a pessoa vive influencia o quanto ela consegue se movimentar",
          "A renda é o único fator que explica a diferença",
          "A diferença é só coincidência",
        ],
        correta: 1,
        explicacao: "Essa é a lógica dos determinantes sociais e ambientais: a oferta de espaço seguro muda o comportamento." },
    ],
    caderno: [
      { id: "c1", enunciado:
        "Desenhe no caderno uma <b>teia</b> com seis fatores (movimento, sono, alimentação, convívio, telas, saúde mental). " +
        "Ligue com setas os que se influenciam e escreva, ao lado de <b>duas</b> setas, uma frase explicando a ligação.",
        campo: "Escreva aqui uma das ligações que você explicou:" },
    ],
  },

  // ───────────────────────────────────────────────────────────── 3 · APLICAR
  {
    id: "m3",
    titulo: "Ler os números",
    nivel: "aplicar",
    habilidade: "EF89EF07P9",
    resumo: "Recomendações, intensidade e conta de minutos: usar dados para avaliar uma rotina.",
    aprenda: [
      { tipo: "texto", html:
        "<p>Para crianças e adolescentes de <b>5 a 17 anos</b>, a Organização Mundial da Saúde recomenda:</p>" +
        "<ul><li>uma <b>média de 60 minutos por dia</b> de atividade física moderada a vigorosa, " +
        "principalmente aeróbica, ao longo da semana;</li>" +
        "<li>atividades que fortaleçam <b>músculos e ossos</b> em pelo menos <b>3 dias</b> da semana;</li>" +
        "<li><b>limitar</b> o tempo sedentário de lazer, especialmente o tempo de tela recreativo.</li></ul>" +
        "<p>Repare na palavra <b>média</b>: o que vale é o total da semana. Um dia parado não derruba o plano.</p>" },
      { tipo: "svg", svg: SVG_INTENSIDADE },
      { tipo: "texto", html:
        "<p>Dá para estimar a <b>frequência cardíaca máxima</b> com uma conta simples: <b>220 − idade</b>. " +
        "A faixa moderada fica em torno de <b>64% a 76%</b> desse valor, e a vigorosa entre <b>77% e 93%</b>. " +
        "São estimativas de referência, não um limite exato para cada pessoa.</p>" },
    ],
    questoes: [
      { id: "q1", tipo: "numero", pontos: 3,
        enunciado: "Seguindo a recomendação de 60 minutos por dia, quantos minutos de atividade física moderada a vigorosa um adolescente deveria somar <b>por semana</b>?",
        resposta: 420, tolerancia: 0, unidade: "minutos",
        explicacao: "60 × 7 = 420 minutos por semana, ou seja, 7 horas." },
      { id: "q2", tipo: "numero", pontos: 3,
        enunciado: "Qual é a frequência cardíaca máxima <b>estimada</b> de um estudante de 15 anos? (use 220 − idade)",
        resposta: 205, tolerancia: 0, unidade: "bpm",
        explicacao: "220 − 15 = 205 batimentos por minuto. É uma estimativa populacional, não uma medida individual." },
      { id: "q3", tipo: "uma", pontos: 3,
        enunciado: "Durante uma caminhada rápida, Léo consegue conversar com a colega, mas não consegue cantar. A intensidade dele está:",
        opcoes: ["Leve", "Moderada", "Vigorosa", "Acima do máximo"],
        correta: 1,
        explicacao: "É exatamente o critério do teste da fala para a faixa moderada." },
      { id: "q4", tipo: "uma", pontos: 4,
        enunciado:
          "Veja a semana de Rafa: segunda 0 min · terça 90 min · quarta 0 min · quinta 80 min · sexta 60 min · sábado 120 min · domingo 70 min. " +
          "Ela cumpriu a recomendação semanal?",
        opcoes: [
          "Não, porque ficou dois dias sem se movimentar",
          "Sim: o total é 420 minutos, igual à recomendação, que é uma média semanal",
          "Não, porque o total é menor que 420 minutos",
          "Não dá para saber sem conhecer a intensidade do sábado",
        ],
        correta: 1,
        explicacao: "90+80+60+120+70 = 420. Como a recomendação é uma média semanal, ela foi cumprida — embora distribuir melhor fosse preferível." },
    ],
    caderno: [
      { id: "c1", enunciado:
        "Monte no caderno uma tabela com os <b>sete dias</b> da próxima semana. Registre, a cada dia, os minutos de " +
        "atividade física moderada ou vigorosa. No domingo, some tudo e compare com os 420 minutos.",
        campo: "Qual foi o seu total da semana (em minutos)?" },
    ],
  },

  // ──────────────────────────────────────────────────────────── 4 · ANALISAR
  {
    id: "m4",
    titulo: "Saúde e beleza mudaram com o tempo",
    nivel: "analisar",
    habilidade: "EF89EF08P9",
    resumo: "Padrões de desempenho, saúde e beleza são construções históricas e culturais.",
    aprenda: [
      { tipo: "texto", html:
        "<p>O que é considerado “corpo saudável” ou “corpo bonito” <b>não é fixo</b>: muda conforme a época, a " +
        "cultura e as condições de vida de cada sociedade. Em períodos de escassez de alimento, um corpo mais cheio " +
        "foi sinal de saúde e prosperidade. Em outros momentos, a magreza passou a ocupar esse lugar.</p>" +
        "<p>Ao longo do século XX, o padrão se deslocou várias vezes — e, nas últimas décadas, passou a conviver com " +
        "a <b>edição de imagem</b>: filtros e retoques criam corpos que não existem nem na pessoa fotografada.</p>" },
      { tipo: "svg", svg: SVG_LINHA_TEMPO },
      { tipo: "texto", html:
        "<p>O mesmo vale para os <b>padrões de desempenho</b>. Recordes esportivos caem década após década, mas não " +
        "só porque os atletas “melhoraram”: mudaram a alimentação, o treinamento científico, os materiais (pista, " +
        "tênis, roupa), a detecção de talentos e o número de pessoas com acesso ao esporte.</p>" +
        "<p>Perceber isso é o que separa duas frases muito diferentes: “meu corpo está errado” e " +
        "“<b>este padrão foi construído</b> por alguém, em algum momento, por alguma razão”.</p>" },
    ],
    questoes: [
      { id: "q1", tipo: "ordenar", pontos: 4,
        enunciado: "Coloque em ordem cronológica estas mudanças no padrão de corpo mais valorizado:",
        itens: [
          "Corpo mais cheio associado a saúde e prosperidade",
          "Magreza ganha destaque na moda e na publicidade",
          "Corpo definido e musculoso vira símbolo de disciplina",
          "Imagens editadas e filtros criam padrões impossíveis",
        ],
        explicacao: "A sequência acompanha o século XX até a era das redes: escassez → moda → fitness → imagem editada." },
      { id: "q2", tipo: "varias", pontos: 4,
        enunciado: "Que evidências sustentam a afirmação de que o padrão de beleza é uma <b>construção social</b>? (marque todas)",
        opcoes: [
          "O padrão muda de uma época para outra",
          "O padrão varia entre culturas diferentes no mesmo período",
          "Todas as pessoas nascem com a mesma altura",
          "O padrão costuma acompanhar interesses de quem vende produtos",
        ],
        corretas: [0, 1, 3],
        explicacao: "Variação no tempo, variação no espaço e interesse econômico são três marcas de algo construído socialmente." },
      { id: "q3", tipo: "uma", pontos: 4,
        enunciado: "Uma reportagem afirma: “o ser humano está mais rápido: o recorde dos 100 m caiu muito desde 1920”. Qual análise é a mais completa?",
        opcoes: [
          "O corpo humano evoluiu biologicamente em cem anos",
          "A queda do recorde combina treinamento científico, alimentação, materiais e acesso de mais pessoas ao esporte",
          "Os cronômetros antigos estavam quebrados",
          "Os atletas de hoje se esforçam mais que os de antigamente",
        ],
        correta: 1,
        explicacao: "Cem anos é pouco para mudança evolutiva. O que mudou foram as condições sociais, técnicas e materiais em volta do atleta." },
    ],
    caderno: [
      { id: "c1", enunciado:
        "Entreviste no caderno <b>uma pessoa com mais de 40 anos</b>. Pergunte: o que era considerado “estar em forma” " +
        "quando ela tinha a sua idade? Onde ela via essas imagens? Anote <b>três diferenças</b> em relação a hoje.",
        campo: "Escreva aqui a diferença que mais te surpreendeu:" },
    ],
  },

  // ───────────────────────────────────────────────────────────── 5 · AVALIAR
  {
    id: "m5",
    titulo: "Ciência ou publicidade?",
    nivel: "avaliar",
    habilidade: "EF89EF08P9",
    resumo: "Avaliar como o meio científico e o meio midiático apresentam saúde, desempenho e beleza.",
    aprenda: [
      { tipo: "texto", html:
        "<p>A mesma informação sobre o corpo chega por caminhos muito diferentes. O <b>meio científico</b> descreve " +
        "quantas pessoas participaram, por quanto tempo, o que foi medido, e admite incerteza: “os dados sugerem”, " +
        "“é possível que”. O trabalho passa por <b>revisão de outros pesquisadores</b> antes de ser publicado.</p>" +
        "<p>O <b>meio midiático</b> — reportagem, anúncio, post de influenciador — precisa prender a atenção em " +
        "segundos. Por isso tende ao exagero, à promessa rápida e ao caso individual apresentado como regra.</p>" },
      { tipo: "cartoes", itens: [
        { t: "Promessa de prazo curto", d: "“Elimine a barriga em 7 dias.” Mudanças reais de composição corporal são lentas." },
        { t: "Antes e depois", d: "Um caso não é evidência. Pose, luz, roupa e recorte mudam a foto inteira." },
        { t: "Patrocínio escondido", d: "Quem ganha dinheiro se você acreditar? Publicidade precisa estar declarada." },
        { t: "Correlação virando causa", d: "“Quem come X vive mais” pode significar que quem come X também tem mais renda e acesso a médico." },
      ] },
      { tipo: "aviso", html:
        "Quatro perguntas resolvem a maior parte dos casos: <b>quem afirma? com base em quê? quem ganha com isso? " +
        "o que a fonte original diz?</b>" },
    ],
    questoes: [
      { id: "q1", tipo: "uma", pontos: 3,
        enunciado: "Post: “Tomei este suplemento por 30 dias e meu corpo mudou — link na bio, use meu cupom.” O sinal de alerta mais forte é:",
        opcoes: [
          "O prazo de 30 dias",
          "Quem afirma tem ganho financeiro direto com a sua compra",
          "O fato de ser um post e não um jornal",
          "Não há sinal de alerta",
        ],
        correta: 1,
        explicacao: "Cupom e link de afiliado criam conflito de interesse: quem informa também lucra com a decisão de quem lê." },
      { id: "q2", tipo: "uma", pontos: 3,
        enunciado: "Manchete: “Estudo com 40 mil pessoas, acompanhadas por 10 anos, sugere que caminhar 30 min por dia reduz risco cardiovascular.” Essa manchete:",
        opcoes: [
          "É confiável à primeira vista: informa tamanho da amostra, tempo de acompanhamento e usa linguagem cautelosa",
          "É propaganda disfarçada",
          "É fraca, porque não promete resultado rápido",
          "Não serve, porque caminhar não é exercício",
        ],
        correta: 0,
        explicacao: "Amostra grande, acompanhamento longo e o verbo “sugere” são marcas da comunicação científica honesta." },
      { id: "q3", tipo: "uma", pontos: 4,
        enunciado: "“Pesquisa mostra que quem pratica natação tem melhores notas na escola.” Qual leitura é a mais cuidadosa?",
        opcoes: [
          "Natação aumenta a inteligência",
          "Há uma associação, mas outros fatores (renda da família, tempo livre, acesso a clube) podem explicar as duas coisas",
          "Notas altas fazem a pessoa nadar melhor",
          "O estudo está errado",
        ],
        correta: 1,
        explicacao: "Associação não é causa. Variáveis de fundo podem produzir a correlação sem que uma coisa cause a outra." },
      { id: "q4", tipo: "vf", pontos: 4,
        enunciado: "Sobre a prática excessiva de exercícios e o uso de substâncias (EF89EF09P9):",
        itens: [
          { t: "Treinar todos os dias sem descanso acelera os resultados.", v: false, por: "A adaptação acontece no descanso. Sem ele, cresce o risco de lesão, fadiga crônica e queda de desempenho." },
          { t: "Anabolizantes sem prescrição podem afetar fígado, coração e sistema hormonal.", v: true, por: "São efeitos documentados na literatura médica, inclusive em jovens." },
          { t: "Se um atleta profissional usa, é seguro para um adolescente.", v: false, por: "Argumento de autoridade não substitui evidência; e o corpo em desenvolvimento responde de outro jeito." },
          { t: "Buscar orientação de profissional de Educação Física e de nutrição reduz riscos.", v: true, por: "Prescrição individualizada é o caminho seguro para qualquer objetivo." },
        ] },
    ],
    caderno: [
      { id: "c1", enunciado:
        "Copie no caderno <b>uma manchete ou um post real</b> sobre corpo, saúde ou desempenho. Aplique as quatro " +
        "perguntas (quem afirma? com base em quê? quem ganha? o que diz a fonte original?) e escreva um parágrafo " +
        "com a sua conclusão.",
        campo: "Em uma frase: a sua conclusão sobre essa publicação." },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 6 · CRIAR
  {
    id: "m6",
    titulo: "Sua proposta para a escola",
    nivel: "criar",
    habilidade: "EF89EF08P9",
    resumo: "Reunir tudo numa proposta de intervenção com público, ação, evidência e forma de medir.",
    aprenda: [
      { tipo: "texto", html:
        "<p>Chegou a parte mais difícil: <b>propor</b>. Uma boa proposta de promoção de saúde na escola responde a " +
        "cinco perguntas, nesta ordem:</p>" +
        "<ol><li><b>Problema</b> — o que, exatamente, você quer mudar?</li>" +
        "<li><b>Público</b> — com quem? (uma turma, o 6º ano, o intervalo inteiro)</li>" +
        "<li><b>Ação</b> — o que será feito, quando e por quem?</li>" +
        "<li><b>Evidência</b> — por que isso deveria funcionar? Em que dado ou recomendação você se apoia?</li>" +
        "<li><b>Indicador</b> — como saber se deu certo? O que será contado ou perguntado, antes e depois?</li></ol>" },
      { tipo: "aviso", html:
        "Propostas que culpam o indivíduo (“é só ter força de vontade”) costumam falhar. As que mudam o " +
        "<b>ambiente</b> — abrir a quadra no intervalo, criar um campeonato de turmas, instalar um bebedouro — " +
        "funcionam porque facilitam a escolha saudável." },
    ],
    questoes: [
      { id: "q1", tipo: "uma", pontos: 3,
        enunciado: "Qual destes é um <b>indicador</b> adequado para a proposta “abrir a quadra no intervalo”?",
        opcoes: [
          "Achar que os alunos ficaram mais felizes",
          "Contar quantos estudantes usam a quadra por intervalo, em 10 dias antes e 10 dias depois",
          "Perguntar à direção se ela gostou da ideia",
          "Verificar se a quadra foi aberta",
        ],
        correta: 1,
        explicacao: "Indicador precisa ser observável e comparável antes/depois. “Quadra aberta” mede a ação, não o resultado." },
      { id: "q2", tipo: "uma", pontos: 3,
        enunciado: "Uma colega propõe: “cada aluno deve correr 30 minutos por dia em casa”. O principal problema é:",
        opcoes: [
          "30 minutos é pouco",
          "A proposta depende só do esforço individual e ignora tempo, espaço e segurança de cada um",
          "Correr não é atividade física",
          "Não há problema nenhum",
        ],
        correta: 1,
        explicacao: "É uma proposta que transfere ao indivíduo um problema que tem causas sociais e ambientais." },
      { id: "q3", tipo: "varias", pontos: 4,
        enunciado: "Que argumentos você poderia usar para convencer a direção, com base no que estudou? (marque todos os defensáveis)",
        opcoes: [
          "A recomendação para a idade é uma média de 60 minutos diários de atividade moderada a vigorosa",
          "O ambiente da escola influencia o quanto os estudantes se movimentam",
          "Quem não se movimenta é preguiçoso",
          "Reduzir o tempo sentado traz benefício mesmo para quem já pratica esporte",
        ],
        corretas: [0, 1, 3],
        explicacao: "Os três primeiros argumentos corretos vêm direto dos módulos 2 e 3. Culpabilizar não é argumento — é julgamento." },
      { id: "q4", tipo: "aberta", pontos: 6,
        enunciado:
          "Escreva a sua proposta em um parágrafo, respondendo às cinco perguntas: problema, público, ação, evidência e indicador.",
        dica: "Mínimo de 220 caracteres. Depois de escrever, avalie você mesmo com os critérios abaixo.",
        minimo: 220,
        rubrica: [
          "Identifiquei com clareza o problema e o público.",
          "Descrevi uma ação concreta, com quem faz e quando.",
          "Apoiei a proposta em um dado ou recomendação estudada.",
          "Defini um indicador observável, medido antes e depois.",
        ] },
    ],
    caderno: [
      { id: "c1", enunciado:
        "Passe a proposta a limpo no caderno, em <b>meia página</b>, com os cinco itens separados por subtítulos. " +
        "Deixe espaço no fim para a avaliação do professor.",
        campo: "Qual é o indicador que você escolheu?" },
      { id: "c2", enunciado:
        "Reúna-se com <b>dois colegas</b>, leiam as três propostas e escolham uma para apresentar. Anote no caderno " +
        "o motivo da escolha e uma melhoria sugerida pelo grupo.",
        campo: "Qual melhoria o grupo sugeriu?" },
    ],
  },
];

const TOTAL_PONTOS = MODULOS.reduce(
  (s, m) => s + m.questoes.reduce((a, q) => a + q.pontos, 0), 0);

const MEDALHAS = [
  { id: "primeiro", nome: "Primeiro passo", desc: "Concluiu o módulo 1.", teste: (e) => e.modulos.m1?.concluido },
  { id: "metade", nome: "Meio caminho", desc: "Concluiu três módulos.", teste: (e) => Object.values(e.modulos).filter((m) => m.concluido).length >= 3 },
  { id: "caderno", nome: "Caderno em dia", desc: "Marcou todas as tarefas de caderno.", teste: (e) => MODULOS.every((m) => m.caderno.every((c) => e.caderno[m.id + "-" + c.id]?.feito)) },
  { id: "critico", nome: "Olhar crítico", desc: "Acertou pelo menos 80% do módulo 5.", teste: (e) => (e.modulos.m5?.pontos || 0) >= 0.8 * 14 },
  { id: "trilha", nome: "Trilha completa", desc: "Concluiu os seis módulos.", teste: (e) => MODULOS.every((m) => e.modulos[m.id]?.concluido) },
];

const PASSAR = 0.7; // 70% dos pontos do módulo para liberar o próximo
