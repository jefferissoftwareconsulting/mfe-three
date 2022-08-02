// Storybook uses `store2` for its localStorage - this hack overwrites
// store2's set function to namespace per storybook

import store from 'store2'

const _get = store._.get
const _set = store._.set
store._.get = (area, key, ...args) => _get.apply(this, [area, `platform-ui-${key}`, ...args])
store._.set = (area, key, ...args) => _set.apply(this, [area, `platform-ui-${key}`, ...args])
