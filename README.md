Local dev

```
npm i
```

```
npm start
```

Deploy it wherever, then include a script tag in `platform-web` index.html

```
<script src="https://my-cloud-service.com/index.js" type="module"></script>
```

...and drop this line in `eventbus.tsx`

```
window.globalEventBus = globalEventBus
```

Then add as a web component in the `pac`

`<mfe-three></mfe-three>`
