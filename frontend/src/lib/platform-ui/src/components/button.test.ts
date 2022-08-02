import './buttons'
import '../styles/global-styles'
import { html, expect, fixture } from '@open-wc/testing'

describe('button', () => {
  it('should be registered', () => {
    expect(customElements.get('sp-button')).to.not.be.undefined
  })

  it('renders', async () => {
    const el = await fixture(html`<sp-global-styles><sp-button>Hello world!</sp-button></sp-global-styles>`)

    expect(el).lightDom.to.contain.text('Hello world')
  })

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<sp-button>My button</sp-button>`)

    await expect(el).shadowDom.to.be.accessible()
  })
})
