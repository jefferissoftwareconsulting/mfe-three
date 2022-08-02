import * as _ from 'lodash'
const { range } = _

// const { range } = lodash

function truncateEnds(currentPage: number, noOfSiblings: number, totalPages: number) {
  return [1, null, ...range(currentPage - noOfSiblings, currentPage + noOfSiblings + 1), null, totalPages]
}

/**
 * 3 accounts for the first page, ellipsis and last page
 */
function truncateLeft(totalPages: number, viewRange: number) {
  return [1, null, ...range(totalPages - (viewRange - 3), totalPages + 1)]
}

function truncateRight(totalPages: number, viewRange: number) {
  return [...range(1, viewRange - 1), null, totalPages]
}

function inTheMiddle(currentPage: number, noOfSiblings: number, totalPages: number) {
  return currentPage > 1 + 1 + noOfSiblings * 2 && currentPage < totalPages - 1 - noOfSiblings * 2
}

export function paginate(totalPages: number, currentPage = 1, noOfSiblings = 1) {
  /**
   * This is how many pages appear for pagination. 5 is the number of elements that take up
   * space in the UI (First and last page, 2 ellipsis and the current page)
   */
  const totalViewableItems = 5 + noOfSiblings * 2

  /**
   * If we don't need any truncation just show all the available pages
   */
  if (totalPages <= totalViewableItems) {
    return range(1, totalPages + 1)
  }

  /**
   * Check if we are in the middle of the range
   */
  if (inTheMiddle(currentPage, noOfSiblings, totalPages)) {
    return truncateEnds(currentPage, noOfSiblings, totalPages)
  }

  /**
   * We are at the end of the range. 3 accounts for the first page, ellipsis and last page
   */
  if (currentPage + (totalViewableItems - 3) >= totalPages) {
    return truncateLeft(totalPages, totalViewableItems)
  }
  /**
   * We are at the start of the range
   */
  if (currentPage < totalViewableItems) {
    return truncateRight(totalPages, totalViewableItems)
  }
}
