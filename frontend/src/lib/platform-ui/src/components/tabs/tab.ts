import { LitElement, html, customElement, css } from 'lit-element'
import { JSXProps } from '../../types'
import { TabPanel } from './panel'

export { TabPanel }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-tab': JSXProps<Tab, { selected?: boolean; name?: string; link?: string }>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-tab': Tab
  }
}

@customElement('sp-tab')
export class Tab extends LitElement {
  static styles = css`
    #tab {
      display: block;
      font-size: 1rem;
      line-height: 1.25rem;
      color: var(--sp-color-neutral-750);
      padding: 2px var(--sp-spacing-2) 10px var(--sp-spacing-2);
      cursor: pointer;
      text-decoration: none;
    }

    :host([selected]) #tab {
      color: var(--sp-color-neutral-850);
      font-weight: 700;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--sp-color-neutral-850);
    }

    #tab:hover {
      color: var(--sp-color-neutral-850);
    }
  `
  static properties = {
    selected: { type: Boolean, reflect: true },
    name: { type: String, reflect: true },
    link: { type: String, reflect: true }
  }
  selected = false
  name = ''
  link = ''

  render() {
    if (this.link) {
      return html`<a href=${this.link} id="tab"><slot></slot></a>`
    }
    return html`<div tabindex="0" role="tab" aria-selected=${this.selected} id="tab"><slot></slot></div>`
  }
}
