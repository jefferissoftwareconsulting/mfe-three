import { JSXProps } from '../../types'
import { LitElement, css, html, customElement } from 'lit-element'
import { ifDefined } from 'lit-html/directives/if-defined'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-side-navigation-item': JSXProps<
        SideNavigationItem,
        {
          target?: string
          rel?: string
          href?: string
          active?: boolean
        }
      >
    }
  }

  interface HTMLElementTagNameMap {
    'sp-side-navigation-item': SideNavigationItem
  }
}

const sideNavItemStyles = css`
  :host li {
    list-style: none;
    padding: var(--sp-spacing-2) 0;
  }

  :host a {
    color: var(--sp-color-label-text);
    text-decoration: none;
    padding: 0 0 0 var(--sp-spacing-2);
    display: block;
    border-left: 2px solid transparent;
    line-height: 24px;
    font-weight: 500;
    cursor: pointer;
  }

  :host a:hover {
    /* TODO: speak to UX and replace with something in the color palette */
    color: #0c131e;
  }

  :host([active]) a {
    color: var(--sp-color-primary-600);
    border-color: var(--sp-color-primary-600);
  }
`

@customElement('sp-side-navigation-item')
export class SideNavigationItem extends LitElement {
  static styles = [sideNavItemStyles]

  static properties = {
    target: { type: String, reflect: true },
    rel: { type: String, reflect: true },
    href: { type: String, reflect: true },
    active: { type: Boolean, reflect: true }
  }

  target?: string
  rel?: string
  href?: string

  render() {
    return html`
      <li>
        <a href="${ifDefined(this.href)}" target="${ifDefined(this.target)}" rel="${ifDefined(this.rel)}">
          <slot></slot>
        </a>
      </li>
    `
  }
}
