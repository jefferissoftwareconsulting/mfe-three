import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import eventBus from './lib/event-bus.js';
import config from './config.js';

const configSchema = ({ id, name, bgColor }: any) => ({
  componentId: id,
  componentName: name,
  fields: [
    {
      label: 'Name',
      name: 'name',
      value: name,
    },
    {
      label: 'Background color',
      name: 'bgColor',
      value: bgColor,
      placeholder: 'Enter hex, rgba, color name etc',
    },
  ],
});

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

  @property({ type: String }) id = '';

  @property({ type: String }) name = 'MFE-THREE';

  @property({ type: String }) editing = 'false';

  @property({ type: String }) bgColor = 'transparent';

  @property({ type: Number }) counter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.eventBus = eventBus();

    this.eventBus.addListener((event: any) => {
      console.log('in MFE-THREE event', event);

      switch (event.topic) {
        case 'mfe3:increment':
          if (event.payload.id === this.id) this.counter += 1;
          break;

        default:
          break;
      }
    });
  }

  __increment() {
    this.eventBus.emit({
      topic: 'mfe3:increment',
      payload: { id: this.id },
    });
  }

  __configure() {
    if (!this.id) return;
    this.eventBus.emit({
      topic: 'config',
      payload: configSchema(this),
    });
  }

  render() {
    return html`
      <sp-global-styles>
        <div class="container" style="background-color: ${this.bgColor}">
          <sp-split-row>
            <div slot="left">
              <h2>${this.name}</h2>
            </div>
            <div slot="right">
              ${this.editing === 'true' && this.id
                ? html`<sp-button
                    leading-icon="edit"
                    button-type="transparent"
                    @click=${this.__configure}
                  ></sp-button>`
                : ''}
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
