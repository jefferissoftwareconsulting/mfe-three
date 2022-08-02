import { icons, IconKey, transformIcon } from './icons'
import { LitElement, css, html, customElement, property } from 'lit-element'
import { JSXProps } from '../../types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-icon': JSXProps<
        Icon,
        {
          icon: IconKey
          size?: number
        }
      >
    }
  }

  interface HTMLElementTagNameMap {
    'sp-icon': Icon
  }
}

@customElement('sp-icon')
export class Icon extends LitElement {
  static styles = css`
    :host {
      /* to get rid of extra height caused by white space */
      line-height: 0;
    }

    svg {
      fill: currentColor;
    }
  `

  static properties = {
    size: { type: Number, reflect: true },
    icon: { type: String }
  }

  size = 18
  icon: IconKey = 'close'

  render() {
    const { svg, viewBox } = transformIcon(icons[this.icon])

    return html`<svg width=${this.size} height=${this.size} viewBox=${viewBox}>${svg}</svg>`
  }
}
