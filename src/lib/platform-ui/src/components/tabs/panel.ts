import { LitElement, html, customElement, css } from 'lit-element'
import { JSXProps } from '../../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-tab-panel': JSXProps<TabPanel, { name: string; shown?: boolean }>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-tab-panel': TabPanel
  }
}

@customElement('sp-tab-panel')
export class TabPanel extends LitElement {
  static styles = css`
    :host(:not([shown])) #panel {
      display: none;
    }
  `

  static properties = {
    name: { type: String, reflect: true },
    shown: { type: Boolean, reflect: true }
  }
  name = ''
  shown = false

  render() {
    return html`<div id="panel"><slot></slot></div>`
  }
}
