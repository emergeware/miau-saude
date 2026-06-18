<div align="center">

<img src="assets/icons/icon-192.png" alt="MiauSaude" width="96" height="96">

# MiauSaude

**Triagem de risco de dermatite felina baseada em evidência**

Aplicação web progressiva (PWA) trilíngue para avaliação do risco de dermatite em gatos,
derivada de um estudo transversal global com 1.512 gatos domésticos.

[**▶ Acessar a aplicação**](https://emergeware.github.io/miau-saude/)

</div>

---

## Visão geral

O **MiauSaude** é uma ferramenta de triagem que estima o risco de dermatite felina a partir
de fatores nutricionais, demográficos, de saúde, gastrointestinais e ambientais. O modelo
preditivo integra cinco hipóteses validadas e foi calibrado sobre uma base de 1.512 gatos.

A aplicação é totalmente **estática** (um único `index.html` com HTML, CSS e JavaScript
embutidos, sem dependências de build) e funciona como **PWA instalável**: ao ser adicionada
à tela inicial do celular, abre em tela cheia, como um aplicativo nativo.

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

| Característica            | Valor                                              |
| ------------------------ | -------------------------------------------------- |
| Base de dados            | 1.512 gatos domésticos                             |
| Variáveis analisadas     | 520                                                |
| Hipóteses integradas     | 5 (validadas)                                      |
| Desempenho (AUC)         | 0.69 – 0.73                                         |
| Prevalência de referência| 25,5 %                                             |

> A ferramenta é **orientativa** e **não substitui** a consulta veterinária. Resultados
> positivos devem ser confirmados por exame clínico.

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
- **Programa:** Mestrado Interdisciplinar em Interações Humano-Animais — 310801, WS 2024/25
- **Local e data:** Viena, março de 2026

## Licença e créditos

Conteúdo científico © dos respectivos autores da pesquisa (Messerli Research Institute,
Vetmeduni Wien). Desenvolvimento e engenharia por **Emergeware Technologies**.

Todos os direitos reservados. O uso, a reprodução ou a distribuição requerem autorização
prévia dos detentores dos direitos.
