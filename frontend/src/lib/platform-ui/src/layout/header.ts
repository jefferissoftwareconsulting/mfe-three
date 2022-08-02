import { LitElement, html, customElement, css } from 'lit-element'
import type { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-header': JSXProps<Header>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-header': Header
  }
}

@customElement('sp-header')
export class Header extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--sp-spacing-5);
      margin-bottom: var(--sp-spacing-4);
    }
  `

  render() {
    return html`<slot></slot>`
  }
}
