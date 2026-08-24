<div align="center">

<img src="assets/icons/icon-192.png" alt="MiauSaude" width="96" height="96">

# MiauSaude

**Triagem de risco de dermatite felina baseada em evidência**

Aplicação web progressiva (PWA) trilíngue para avaliação do risco de dermatite em gatos,
derivada de um estudo transversal global com 1.512 gatos domésticos.

[**▶ Acessar a aplicação**](https://emergeware.github.io/miau-saude/)

<br>

<img src="assets/qr.png" alt="QR code para abrir o MiauSaude" width="220" height="220">

<sub>Aponte a câmera do celular para o QR code acima</sub>

</div>

---

## Visão geral

O **MiauSaude** é uma ferramenta de triagem que estima o risco de dermatite felina a partir
de fatores nutricionais, demográficos, de saúde, gastrointestinais e ambientais. O modelo
integra cinco hipóteses validadas, calibradas sobre uma base de 1.512 gatos.

A aplicação é totalmente **estática** (um único `index.html` com HTML, CSS e JavaScript
embutidos, sem dependências de build) e funciona como **PWA instalável**: ao ser adicionada
à tela inicial do celular, abre em tela cheia, como um aplicativo nativo.

Versão atual: **v8** — motor de cálculo alinhado à versão final da dissertação.

## Funcionalidades

- **Dois modos de uso**
  - *Tutor* — linguagem acessível para donos de gatos
  - *Veterinário* — triagem clínica com métricas e contribuições por hipótese
- **Três idiomas** — Português, Inglês e Alemão
- **Apresentação em áudio** por idioma, com **fallback automático de formato**
  (reproduz `.m4a`; se o navegador não suportar, cai para `.mp3` sozinho)
- **PWA instalável** — tela cheia, ícone próprio e casca offline via service worker
- **Acessibilidade** — foco de teclado visível e respeito a `prefers-reduced-motion`
- **Resultado explicável** — medidor de risco, contribuição de cada hipótese e recomendações

## Modelo preditivo

| Característica                   | Valor                                      |
| -------------------------------- | ------------------------------------------ |
| Base de dados                    | 1.512 gatos domésticos                     |
| Variáveis analisadas             | 520                                        |
| Hipóteses integradas             | 5 (validadas)                              |
| AUC — modelo de referência       | 0,69 – 0,73 (validação cruzada 5-fold)     |
| AUC — motor linear da aplicação  | ≈ 0,65                                     |
| VPN — modelo de referência (RF, Seção 4.8) | ≈ 87 %                          |
| VPN — motor linear da aplicação (corte 30 %) | ≈ 78 %                        |
| Prevalência de referência        | 25,5 %                                     |
| Faixa de probabilidade emitida   | 5 % – 85 %                                 |

A discriminação do modelo é **modesta**: ele é mais informativo para *excluir* do que para
*confirmar* dermatite. O VPN supera o VPP nos dois modelos, e é por isso que o teto de
probabilidade é 85 % e não 95 % — uma ferramenta de triagem com discriminação moderada não
deve emitir quase-certezas.

### Hierarquia entre domínios

O escore bruto integra as cinco hipóteses com pesos derivados da importância de permutação
agrupada do Random Forest, restrita a variáveis **não-circulares**:

| Peso | Hipótese | Domínio                                    |
| ---- | -------- | ------------------------------------------ |
| 0,53 | H1       | Demografia (idade, peso, sexo, raça)       |
| 0,15 | H3       | Nutrição                                   |
| 0,12 | H5       | Ambiente                                   |
| 0,11 | H2       | Complexidade de saúde                      |
| 0,09 | H4       | Gastrointestinal                           |

A soma dos pesos é 1,00. A probabilidade final é `sigmoid((raw − 0,42) × 6,0)`, limitada ao
intervalo [0,05 – 0,85].

### Por que os sinais cutâneos não pontuam

O passo 3 do questionário coleta 13 sinais dermatológicos e um grau de severidade, mas
**eles não entram no cálculo de risco**. Usar a manifestação da dermatite para prever
dermatite tornaria o modelo circular.

Os sinais são registrados como retrato da condição atual e exibidos no resultado. Marcar
todos os 13 não altera a probabilidade em um único ponto percentual — esse é, inclusive, um
dos testes de regressão do motor.

### Achados que contrariam a intuição

- **Conviver com cães é protetor** (OR ajustado 0,67; p = 0,005): 20,9 % de dermatite entre
  gatos que vivem com cães, contra 27,2 % entre os que não vivem.
- **Diarreia** é a única variável gastrointestinal independentemente associada
  (OR 2,57; p = 0,010). **Vômito** é confundido por complexidade de saúde
  (OR ajustado 1,13; p = 0,536) e pesa bem menos.
- **Acesso externo** e **fumo passivo** não mostraram associação independente
  (OR 1,05; p = 0,71 e OR 1,07; p = 0,70). Permanecem na interface por completude, com peso
  residual.

> A ferramenta é **orientativa** e **não substitui** a consulta veterinária. Resultados
> positivos devem ser confirmados por exame clínico.

## Limitações conhecidas

Divergências entre o motor publicado e a dissertação estão registradas como
[issues](https://github.com/emergeware/miau-saude/issues) e aguardam decisão científica:

| Issue | Assunto                                       | Consequência                                                        |
| ----- | --------------------------------------------- | ------------------------------------------------------------------- |
| [#2](https://github.com/emergeware/miau-saude/issues/2) | Campo "Allergy" não qualifica o tipo | Circularidade prospectiva pela interface; decisão de produto        |
| [#3](https://github.com/emergeware/miau-saude/issues/3) | `wet_only` ausente em H3        | Fator dietético forte (OR 2,61) não implementado, por acompanhar a tese |
| [#4](https://github.com/emergeware/miau-saude/issues/4) | Efeito do cão sob clamp em 0    | O efeito protetor só aparece se houver outro risco ambiental       |

## Instalação no celular (tela cheia)

1. Abra [a aplicação](https://emergeware.github.io/miau-saude/) no navegador do celular.
2. Adicione à tela inicial:
   - **Android (Chrome):** menu ⋮ → *Adicionar à tela inicial* / *Instalar app*
   - **iPhone (Safari):** botão compartilhar → *Adicionar à Tela de Início*
3. Abra pelo **ícone** criado — a aplicação abre em tela cheia, sem barra de endereço.

## Estrutura do projeto

```
miau-saude/
├── index.html              # Aplicação (arquivo único: HTML + CSS + JS)
├── manifest.json           # Web App Manifest (PWA)
├── sw.js                   # Service worker (casca offline)
├── README.md
├── .gitignore
└── assets/
    ├── audio/              # Apresentações em áudio (PT/EN/DE) — .m4a e .mp3
    │   ├── audio_pt.m4a · audio_pt.mp3
    │   ├── audio_en.m4a · audio_en.mp3
    │   └── audio_de.m4a · audio_de.mp3
    └── icons/              # Ícones do PWA
        ├── icon-192.png
        ├── icon-512.png
        ├── icon-maskable-512.png
        └── apple-touch-icon.png
```

> O `index.html`, o `manifest.json` e o `sw.js` permanecem na raiz por exigência da plataforma:
> o GitHub Pages serve a raiz no endereço público e o service worker só controla o escopo a
> partir do próprio diretório.

## Desenvolvimento local

Não há etapa de build. Basta servir a pasta por HTTP (o service worker e o manifest exigem
um servidor, não funcionam abrindo o arquivo via `file://`):

```bash
# Python 3
python -m http.server 8000

# ou Node.js
npx serve .
```

Depois acesse `http://localhost:8000`.

> Antes de validar no navegador, confirme que a porta escolhida serve *este* projeto —
> `curl -s http://127.0.0.1:8000/ | head -8` deve mostrar o `<title>` do MiauSaude. Uma porta
> já ocupada por outro servidor local serve a página errada em silêncio.

### Motor de cálculo

O motor vive na função `compute()` de `index.html`. Ele não depende do DOM: recebe as
respostas por `S.answers` e devolve `{prob, h:{h1..h5}, nSk, nC}`.

Isso permite testá-lo isoladamente, extraindo o trecho entre `function ck(k){` e o fim de
`function riskLevel(...)` e executando-o em Node com `vm.runInContext`, sobre um
`var S={answers:{}}`. Testar o código real evita que uma reimplementação paralela esconda
justamente o defeito procurado.

## Tecnologias

- HTML, CSS e JavaScript puros (sem framework, sem build)
- Progressive Web App: Web App Manifest + Service Worker
- Hospedagem estática via GitHub Pages

## Contexto acadêmico

Esta ferramenta resulta da dissertação de mestrado apresentada ao **Messerli Research
Institute** da **Universidade de Medicina Veterinária de Viena** (Diretor: Univ.-Prof. Dr.
Herwig Grimm).

> *"Desnutrição em Gatos com Dermatite? Um Estudo Transversal Global"* — estudo com 1.512
> gatos domésticos sobre a relação entre dermatite felina e fatores nutricionais,
> demográficos, de saúde, gastrointestinais e ambientais.

- **Autora:** Isabele Pedrozo Martins (Mat. 12304239)
- **Orientadora:** Franziska Roth-Walter
- **Programa:** Mestrado Interdisciplinar em Interações Humano-Animais — 310801
- **Local e data:** Viena, agosto de 2026

## Licença e créditos

Conteúdo científico © dos respectivos autores da pesquisa (Messerli Research Institute,
Vetmeduni Wien). Desenvolvimento e engenharia por **Emergeware Technologies**.

Todos os direitos reservados. O uso, a reprodução ou a distribuição requerem autorização
prévia dos detentores dos direitos.
