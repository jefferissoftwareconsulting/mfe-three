import { LitElement, css, html, customElement } from 'lit-element'
import { ifDefined } from 'lit-html/directives/if-defined'
import { JSXProps } from './../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-link': JSXProps<
        Link,
        {
          'link-type'?: LinkTypes
          'is-external'?: boolean
          target?: string
          rel?: string
          href?: string
          virtual?: boolean
        }
      >
      'sp-link-button': JSXProps<
        LinkButton,
        {
          'link-type'?: LinkTypes
        }
      >
    }
  }

  interface HTMLElementTagNameMap {
    'sp-link': Link
    'sp-link-button': LinkButton
  }
}

const linkStyles = css`
  :host {
    display: inline-flex; /* Avoids the custom element wrapper "padding" the link in some cases */
    align-items: center;
    color: var(--sp-color-primary-850);
    font-weight: var(--sp-font-weight-bold);
  }

  :host sp-icon {
    padding-left: var(--sp-spacing-1);
  }

  :host(:hover) {
    cursor: pointer;
    color: var(--sp-color-primary-600);
  }

  :host([link-type='secondary']) {
    color: var(--sp-color-neutral-850);
    text-decoration: underline;
    font-weight: var(--sp-font-weight-normal);
  }

  :host([link-type='secondary']:hover) {
    text-decoration: none;
  }
`

const resetLinkStyle = css`
  a {
    color: inherit;
    text-decoration: inherit;
  }
`

const resetButtonStyles = css`
  button {
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--sp-font-weight-normal);
    line-height: inherit;
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    cursor: pointer;
  }
`

type LinkTypes = 'primary' | 'secondary'

@customElement('sp-link')
export class Link extends LitElement {
  static styles = [resetLinkStyle, linkStyles]

  static properties = {
    linkType: { type: String, attribute: 'link-type', reflect: true },
    isExternal: { type: Boolean, attribute: 'is-external', reflect: true },
    target: { type: String, reflect: true },
    rel: { type: String, reflect: true },
    href: { type: String, reflect: true },
    virtual: { type: Boolean, reflect: true }
  }

  linkType: LinkTypes = 'primary'
  target?: string
  rel?: string
  href?: string
  virtual = false
  isExternal = false

  handleClick(event: Event) {
    if (this.virtual) event.preventDefault()
  }

  connectedCallback() {
    super.connectedCallback()

    if (this.isExternal) {
      this.target = '_blank'
    }
  }

  render() {
    return html`
      <a
        href="${ifDefined(this.href)}"
        target="${ifDefined(this.target)}"
        rel="${ifDefined(this.rel)}"
        @click="${this.handleClick}"
      >
        <slot></slot>
      </a>
      ${this.isExternal ? html`<sp-icon icon="openLink" size="12"></sp-icon>` : ''}
    `
  }
}

@customElement('sp-link-button')
export class LinkButton extends LitElement {
  static styles = [resetButtonStyles, linkStyles]

  static properties = { linkType: { type: String, attribute: 'link-type', reflect: true } }
  linkType: LinkTypes = 'primary'

  render() {
    return html` <button><slot></slot></button>`
  }
}
