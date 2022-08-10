import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import eventBus from './lib/event-bus.js';
import config from './config.js';

const configSchema = {
  componentId: 'mfe-three',
  componentName: 'MFE-THREE',
  fields: [
    {
      label: 'Background color',
      name: 'bgColor',
      placeholder: 'Enter hex, rgba, color name etc',
    },
  ],
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
      .then(config => {
        this.config = config;
      })
      .catch(err => console.error(err));
  }

  @property({ type: Object }) config: Config = {};

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
          if (!event.payload || event.payload.componentId !== 'mfe-three')
            break;
          saveConfig(event.payload).then(updatedConfig => {
            this.config = updatedConfig;
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

  render() {
    if (Object.keys(this.config).length === 0)
      return html` <div>Loading config...</div> `;

    return html`
      <sp-global-styles>
        <div class="container" style="background-color: ${this.config.bgColor}">
          <sp-split-row>
            <div slot="left">
              <h2>${this.title}</h2>
            </div>
            <div slot="right">
              <sp-button
                leading-icon="edit"
                button-type="transparent"
                @click=${this.__configure}
              ></sp-button>
            </div>
          </sp-split-row>
          <p>count: ${this.counter}</p>
          <p>
            <sp-button type="primary" @click=${this.__increment}
              >Increment</sp-button
            >
          </p>
        </div>
      </sp-global-styles>
    `;
  }
}
