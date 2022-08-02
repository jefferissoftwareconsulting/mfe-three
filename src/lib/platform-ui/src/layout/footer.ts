import { LitElement, html, customElement, css } from 'lit-element'
import type { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-footer': JSXProps<Footer>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-footer': Footer
  }
}

@customElement('sp-footer')
export class Footer extends LitElement {
  static styles = css`
    .container {
      border-top: 1px solid var(--sp-color-neutral-400);
      display: flex;
      justify-content: space-between;
      padding: var(--sp-spacing-3) var(--sp-spacing-4);
    }
  `

  render() {
    return html`<div class="container">
      <slot name="left"></slot>
      <slot name="middle"></slot>
      <slot name="right"></slot>
    </div> `
  }
}
