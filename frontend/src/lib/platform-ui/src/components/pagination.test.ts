import './pagination'
import '../styles/global-styles'
import { html, expect, fixture, oneEvent } from '@open-wc/testing'
import { spy } from 'sinon'

describe('sp-basic-pagination', () => {
  it('should be registered', () => {
    expect(customElements.get('sp-basic-pagination')).to.not.be.undefined
  })

  it('renders', async () => {
    const el = await fixture(html`<sp-global-styles><sp-basic-pagination></sp-basic-pagination></sp-global-styles>`)

    expect(el.shadowRoot).not.to.be.null
  })

  it('pages next when the next button is pressed', async () => {
    const nextPage = spy()
    const el = await fixture(
      html`<sp-basic-pagination @sp-basic-pagination-next-page=${() => nextPage()} has-next-page></sp-basic-pagination>`
    )
    const nextButton = el.shadowRoot?.querySelector<HTMLElement>('sp-button[leading-icon="chevronRight"]')

    setTimeout(() => nextButton?.click())
    await oneEvent(el, 'sp-basic-pagination-next-page')

    expect(nextButton).to.not.have.attribute('disabled')
    expect(nextPage.called).to.be.true
  })

  it('pages previous when the previous button is pressed', async () => {
    const prevPage = spy()
    const el = await fixture(
      html`<sp-basic-pagination
        has-previous-page
        @sp-basic-pagination-previous-page=${() => prevPage()}
      ></sp-basic-pagination>`
    )
    const prevButton = el.shadowRoot?.querySelector<HTMLElement>('sp-button[leading-icon="chevronLeft"]')

    setTimeout(() => prevButton?.click())
    await oneEvent(el, 'sp-basic-pagination-previous-page')

    expect(prevButton).to.not.have.attribute('disabled')
    expect(prevPage.called).to.be.true
  })

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<sp-basic-pagination></sp-basic-pagination>`)

    await expect(el).shadowDom.to.be.accessible()
  })
})
