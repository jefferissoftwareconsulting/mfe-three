import { css, customElement, html, LitElement } from 'lit-element'
import type { JSXProps } from '../../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-side-navigation': JSXProps<SideNavigation>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-side-navigation': SideNavigation
  }
}

const sideNavStyles = css`
  :host {
    display: block;
    height: 100%;
    background-color: var(--sp-color-neutral-200);
  }

  :host ul {
    list-style: none;
    margin: 0;
    padding: var(--sp-spacing-2) var(--sp-spacing-6);
  }
`

@customElement('sp-side-navigation')
export class SideNavigation extends LitElement {
  static styles = [sideNavStyles]

  render() {
    return html`<ul>
      <slot></slot>
    </ul>`
  }
}
