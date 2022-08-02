import './store-namespace'
import { html } from 'lit-html'
import '../src/styles/global-styles'
import skeduloTheme from './skedulo-theme'

export const parameters = {
  layout: 'fullscreen',
  options: {
    showPanel: false,
    storySort: {
      method: 'alphabetical',
      order: [
        'Introduction',
        ['Getting Started', 'Conventions', 'Global CSS and Theming', 'Cheatsheet', 'React'],
        'Typography',
        'Styling',
        'Components',
        'Layout',
        'Form Elements',
        ['Introduction'],
        'Animation',
        'Patterns',
        'Utilities'
      ]
    }
  },

  docs: {
    // Remove surrounding "html``" from story to show a cleaner code example
    transformSource: src => src.replace(/^(\([^)]*\)\s+=>)?\s*html`((.|\n)*)`\s*$/, (_1, _2, inner) => inner),
    theme: skeduloTheme
  }
}

export const decorators = [story => html`<sp-global-styles>${story()}</sp-global-styles>`]
