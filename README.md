# easyjs-utils

> Libreria leggera di helper JavaScript per la manipolazione del DOM, gestione eventi e classi CSS — senza dipendenze.

---

## 🚀 Introduzione

**easyjs-utils** è una micro-libreria JavaScript (≈2KB minificata) che semplifica le operazioni più comuni sul DOM:
- Selezione rapida di elementi
- Gestione di eventi con funzioni shorthand (`onClick`, `onSubmit`, `onReady`, ecc.)
- Aggiunta, rimozione e toggle di classi CSS
- Manipolazione HTML e lettura stili
- Gestione semplificata di form e validazioni

Perfetta per progetti in **Vanilla JS** o come **base utility** per piccoli script frontend, senza jQuery.

---

## 📦 Installazione e inclusione

### 🔹 via npm

```bash
npm install easyjs-utils
```

Nel tuo progetto:
```js
import easy from "easyjs-utils";

easy.onReady(() => {
  easy.onClick('#btn', () => easy.toggleClass('#box', 'active'));
});
```

---

### 🔹 via CDN

**jsDelivr**
```html
<script src="https://cdn.jsdelivr.net/npm/easyjs-utils@1.0.0/dist/easy.min.js"></script>
```

**unpkg**
```html
<script src="https://unpkg.com/easyjs-utils@1.0.0/dist/easy.min.js"></script>
```

Una volta inclusa, la libreria è disponibile globalmente come `easy`.

---

## 🧰 Esempi di utilizzo

### Selettore e manipolazione del DOM
```html
<div id="box">Ciao!</div>

<script>
  easy.setHtml('#box', '<b>Nuovo contenuto!</b>');
  console.log(easy.sel('#box').innerText); // "Nuovo contenuto!"
</script>
```

---

### Gestione eventi
```html
<button id="btn">Cliccami</button>

<script>
  easy.onClick('#btn', (el, e) => {
    easy.toggleClass(el, 'active');
  });

  // Esegui codice al caricamento del DOM
  easy.onReady(() => console.log('DOM pronto!'));
</script>
```

---

### Gestione classi CSS
```html
<div id="panel"></div>

<script>
  easy.addClass('#panel', 'visible');
  if (easy.hasClass('#panel', 'visible')) {
    easy.removeClass('#panel', 'visible');
  }
</script>
```

---

### Lettura stili CSS
```html
<div id="box" style="margin-left: 20px; width: 200px;"></div>

<script>
  console.log(easy.cssMarginLeftPx('#box')); // 20
  console.log(easy.cssWidthPx('#box'));      // 200
</script>
```

---

### Gestione form con validazione
```html
<form id="contactForm" novalidate>
  <input type="email" name="email" required>
  <button type="submit">Invia</button>
</form>

<script>
  easy.onValidSubmit('#contactForm', (form, data) => {
    console.log('Form valido:', data);
  });
</script>
```

---

## 📘 API Principali

### Selettori
```js
easy.sel(selector, all = false, parent = document)
```

### Eventi
```js
easy.on(type, selector, handler, all = false)
easy.onClick(selector, handler)
easy.onSubmit(selector, handler)
easy.onReady(handler)
```

### Classi CSS
```js
easy.addClass(el, 'active')
easy.removeClass(el, 'hidden')
easy.toggleClass(el, 'expanded')
easy.hasClass(el, 'visible')
```

### Manipolazione HTML e trigger eventi
```js
easy.setHtml(el, '<p>Test</p>')
easy.trigger(el, 'customEvent')
easy.triggerChange(el)
```

### Stili
```js
easy.getStyle(el)
easy.cssWidth(el)
easy.cssWidthPx(el)
easy.cssMarginLeftPx(el)
easy.cssMarginRightPx(el)
```

### Form e validazione
```js
easy.onValidSubmit(form, (formEl, data) => {
  console.log(data);
});
```

---

## ⚙️ Build

Per generare la versione minificata (`dist/easy.min.js`):

```bash
npm run build
```

---

## 🧑‍💻 Autore

**Il Tuo Nome**
📧 [tua@email.com](mailto:tua@email.com)
🌐 [https://github.com/tuonome/easyjs](https://github.com/tuonome/easyjs)

---

## 🪪 Licenza

Distribuito sotto licenza **MIT**.
Consulta il file [LICENSE](./LICENSE) per i dettagli.
