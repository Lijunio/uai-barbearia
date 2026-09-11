# UAI BARBEARIA — Landing Page

Site institucional de página única (landing page) da **UAI BARBEARIA**, barbearia de bairro
em Carlos Prates, Belo Horizonte/MG.

Feito em HTML5, CSS3 e JavaScript puro — **sem frameworks** e **sem build**.
Basta abrir o `index.html` no navegador.

---

## 🚀 Como rodar localmente

Não precisa de instalação. Duas opções:

1. **Abrir direto:** dê duplo clique em `index.html`
2. **Servidor local** (recomendado, evita restrições de `file://`):

   ```bash
   npx serve .
   # ou
   python -m http.server 5500
   ```

## 📁 Estrutura

```
uai-barbearia/
├── index.html   # Estrutura e conteúdo da página
├── style.css    # Estilos, paleta de cores e responsividade
├── script.js    # Menu mobile, scroll suave, animações, botão flutuante
└── logo.png     # Logo da barbearia (usada no header, rodapé e favicon)
```

## 🎨 Identidade visual

| Cor | Hex | Uso |
|---|---|---|
| Cinza escuro | `#535557` | Fundo / superfícies |
| Dourado | `#d0bb5c` | Destaques, botões, ícones |
| Creme | `#d4ceb4` | Texto principal |
| Dourado escuro | `#62571c` | Bordas e detalhes |
| Cinza esverdeado | `#a4ac9a` | Texto secundário |

Fontes: **Oswald** (títulos) e **Montserrat** (texto) via Google Fonts.
Ícones: **Font Awesome 6**.

## ✨ Funcionalidades

- Header fixo que muda de estilo ao rolar a página
- Menu hambúrguer no mobile (fecha ao clicar em um link, no ESC ou clicando fora)
- Scroll suave entre as seções
- Animações de entrada (fade + subida) com `IntersectionObserver`
- Link do menu destacado conforme a seção visível
- Botão flutuante do WhatsApp que só aparece quando não há outro CTA na tela
- Layout responsivo (desktop, tablet e mobile)

## 📌 Onde editar o conteúdo

| O que mudar | Onde |
|---|---|
| Preços e serviços | `index.html` → seção `<section id="servicos">` |
| Foto de fundo do topo | `style.css` → regra `.hero` (`background-image`) |
| Foto da seção "Sobre" | `index.html` → `<figure class="about__media">` |
| Telefone / WhatsApp | Buscar por `5531998133184` no `index.html` |
| Instagram | Buscar por `uaibarbearia` no `index.html` |
| Horário e endereço | `index.html` → rodapé |

> ⚠️ **Antes de publicar:** as URLs de imagem do Unsplash são apenas placeholders.
> Substitua pelas fotos reais da barbearia.

## 🌐 Publicação (GitHub Pages)

1. Envie o projeto para o repositório
2. Em **Settings → Pages**, escolha *Source: Deploy from a branch*
3. Selecione a branch `main` e a pasta `/ (root)`
4. O site fica em `https://<usuario>.github.io/uai-barbearia/`

Para domínio próprio (ex.: `uaibarbearia.com.br`), configure em **Settings → Pages → Custom domain**
e aponte o DNS no seu registrador.

## 📞 Contato

- **WhatsApp:** (31) 99813-3184
- **Instagram:** [@uaibarbearia](https://instagram.com/uaibarbearia)
- **Endereço:** Rua Padre Eustáquio, 1541 — Carlos Prates, Belo Horizonte/MG
- **Horário:** Terça a Sexta 08h–20h · Sábado 08h–18h

---

© UAI BARBEARIA. Todos os direitos reservados.
