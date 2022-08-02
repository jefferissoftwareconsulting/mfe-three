import { css } from 'lit-element'

export const shadows = css`
  :host {
    // TODO: These names currently match the design system but should probably be more generic (based on elevation instead of specific components)
    --sp-box-shadow-info-window: 0px 5px 10px rgba(28, 46, 72, 0.15);
    --sp-box-shadow-menu: 0 3px 5px var(--sp-color-shadow-150);
    --sp-box-shadow-modal: 0 3px 12px var(--sp-color-shadow-100);
  }
`
