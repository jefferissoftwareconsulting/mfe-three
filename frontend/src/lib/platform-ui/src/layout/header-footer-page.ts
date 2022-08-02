import { LitElement, html, customElement, css } from 'lit-element'
import { JSXProps } from '../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-header-footer-page': JSXProps<HeaderFooterPage>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-header-footer-page': HeaderFooterPage
  }
}

@customElement('sp-header-footer-page')
export class HeaderFooterPage extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }

    #container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    #body {
      flex: 1 1;
      overflow-y: auto;
    }
  `

  render() {
    return html`
      <div id="container">
        <div id="header"><slot name="header"></slot></div>
        <div id="body"><slot></slot></div>
        <div id="footer"><slot name="footer"></slot></div>
      </div>
    `
  }
}
