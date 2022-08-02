import { LitElement, html, customElement, css, PropertyValues } from 'lit-element'
import { JSXProps } from '../../types'
import '../../layout/flex'
import { Tab } from './tab'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-tab-bar': JSXProps<TabBar, { selected?: string; controlled?: boolean }>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-tab-bar': TabBar
  }
}

export class TabSelectedEvent extends CustomEvent<{ name: string }> {
  constructor(name: string) {
    super('sp-tab-selected', { bubbles: true, detail: { name } })
  }
}

@customElement('sp-tab-bar')
export class TabBar extends LitElement {
  static styles = css`
    #tabbar {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      box-shadow: inset 0 -1px 0 0 var(--sp-color-neutral-400);
      padding: 0 var(--sp-spacing-6);
    }

    :host {
      --sp-row-spacing: var(--sp-spacing-2);

      background-color: inherit;
      display: block;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `

  static properties = {
    controlled: { type: Boolean },
    selected: { type: String }
  }
  controlled = false
  selected = ''

  tabs: Tab[] = []

  handleSlotChange() {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | undefined
    if (!slot) {
      this.tabs = []
      return
    }

    let elements = Array.from(slot.assignedElements())
    while (elements[0] instanceof HTMLSlotElement) {
      elements = Array.from(elements[0].assignedElements())
    }

    this.tabs = elements.filter((element): element is Tab => element instanceof Tab && !!element.name)

    if (!this.controlled) {
      if (!this.selected) {
        // Find the first selected tab
        this.selected = this.tabs.find(tab => tab.selected)?.name ?? ''
      }

      if (!this.selected && this.tabs.length) {
        this.selected = this.tabs[0].name
        this.tabs[0].selected = true
      }
    }

    this.updateSelectedTab()
  }

  handleClick(event: MouseEvent) {
    if (event.target instanceof Tab) {
      const { name } = event.target
      if (name) {
        if (!this.controlled) {
          this.selected = name
        }
        this.dispatchEvent(new TabSelectedEvent(name))
      }
    }
  }

  updated(changed: PropertyValues<TabBar>) {
    if (changed.has('selected')) {
      this.updateSelectedTab()
    }
  }

  updateSelectedTab() {
    this.tabs.forEach(tab => {
      const selected = tab.name === this.selected
      if (selected !== tab.selected) {
        tab.selected = selected
      }
    })
  }

  render() {
    return html`
      <sp-row id="tabbar" @click=${this.handleClick}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </sp-row>
    `
  }
}
