import { LitElement, html, css, customElement } from 'lit-element'
import { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-responsive-columns': JSXProps<ResponsiveColumns>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-responsive-columns': ResponsiveColumns
  }
}

@customElement('sp-responsive-columns')
export class ResponsiveColumns extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      width: 100%;
      box-sizing: border-box;
      padding: var(--sp-padding, var(--sp-spacing-8));
    }

    ::slotted(*) {
      flex: 1;
    }

    ::slotted(*:not(:last-child)) {
      margin-right: var(--sp-padding, var(--sp-spacing-8));
    }

    @media (max-width: 60rem) {
      :host {
        flex-direction: column;
      }

      ::slotted(*) {
        flex: none;
      }

      ::slotted(*:not(:last-child)) {
        margin-right: 0;
        margin-bottom: var(--sp-padding, var(--sp-spacing-8));
      }
    }
  `

  render() {
    return html`<slot></slot>`
  }
}
