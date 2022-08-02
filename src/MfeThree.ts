import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import eventBus from './lib/event-bus.js';
import config from './config.js';
import '../src/lib/platform-ui/src/index.js';

interface Settings {
  bgColor?: string;
}

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
    // @ts-ignore
    this.settingsMode = false;
    fetch(config.settingsUrl)
      .then(res => res.json())
      .then(settings => {
        this.settings = settings;
      })
      .catch(err => console.error(err));
  }

  @property({ type: Object }) settings: Settings = {};

  @property({ type: String }) settingsFieldBgColor = '';

  @property({ type: Boolean }) settingsMode = false;

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

        default:
          break;
      }
    });
  }

  __increment() {
    this.eventBus.emit({ topic: 'mfe3:increment' });
  }

  __showSettings() {
    this.settingsMode = true;
  }

  __setBgColor(e: { target: { value: string } }) {
    this.settingsFieldBgColor = e.target.value;
  }

  __saveSettings() {
    const updatedSettings = {
      ...this.settings,
      bgColor: this.settingsFieldBgColor,
    };

    fetch(config.settingsUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSettings),
    })
      .then(res => res.json())
      .then(settings => {
        this.settings = settings;
      });
    this.settingsMode = false;
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
      <p><button @click=${this.__showSettings}>Settings</button></p>
    `;
  }

  settingsTemplate() {
    return html`
      <h2>Settings | ${this.title}</h2>
      <div>
        <label>Background colour</label>
        <input type="text" @input="${this.__setBgColor}" />
      </div>
      <p><button @click=${this.__saveSettings}>Done</button></p>
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
          ${this.settingsMode ? this.settingsTemplate() : this.mainTemplate()}
        </div>
      </sp-global-styles>
    `;
  }
}
