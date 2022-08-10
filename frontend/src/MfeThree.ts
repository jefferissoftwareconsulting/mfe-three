import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import eventBus from './lib/event-bus.js';
import config from './config.js';

const configSchema = {
  fields: [{ label: 'Background color', name: 'bgColor' }],
};

interface Config {
  bgColor?: string;
}

const saveConfig = (componentConfig: Config) =>
  fetch(config.configUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(componentConfig),
  }).then(res => res.json());

export class MfeThree extends LitElement {
  eventBus: any;

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }
    .container {
      padding: 25px;
      border: 1px solid cyan;
    }
  `;

  constructor() {
    super();
    fetch(config.configUrl)
      .then(res => res.json())
      .then(settings => {
        this.settings = settings;
      })
      .catch(err => console.error(err));
  }

  @property({ type: Object }) settings: Config = {};

  @property({ type: String }) title = 'MFE-THREE';

  @property({ type: Number }) counter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.eventBus = eventBus();

    this.eventBus.addListener((event: any) => {
      console.log('in MFE-THREE event', event);
      switch (event.topic) {
        case 'mfe3:increment':
          this.counter += 1;
          break;

        case 'configChanged':
          if (!event.payload) break;
          saveConfig(event.payload).then(updatedConfig => {
            console.log('configChanged', updatedConfig);
          });
          break;

        default:
          break;
      }
    });
  }

  __increment() {
    this.eventBus.emit({ topic: 'mfe3:increment' });
  }

  __configure() {
    this.eventBus.emit({ topic: 'config', payload: configSchema });
  }

  mainTemplate() {
    return html`
      <h2>${this.title}</h2>
      <p>count: ${this.counter}</p>
      <p>
        <sp-button type="primary" @click=${this.__increment}
          >Increment</sp-button
        >
      </p>
      <p>
        <sp-button type="transparent" @click=${this.__configure}
          >Configure</sp-button
        >
      </p>
    `;
  }

  render() {
    if (Object.keys(this.settings).length === 0)
      return html` <div>Loading settings...</div> `;

    return html`
      <sp-global-styles>
        <div
          class="container"
          style="background-color: ${this.settings.bgColor}"
        >
          ${this.mainTemplate()}
        </div>
      </sp-global-styles>
    `;
  }
}
