import { useCallback, useMemo } from 'react'

export default function usePagination({
  page,
  onPageChange,
  totalItems,
  itemsPerPage,
}) {
  const lastPage = Math.ceil(totalItems / itemsPerPage)
  const firstItemInPage = (page - 1) * itemsPerPage + 1
  const lastItemInPage =
    lastPage === page ? totalItems : firstItemInPage + itemsPerPage - 1

  // Limit to last page
  if (totalItems && page > lastPage) {
    onPageChange(lastPage)
  }

  // Memoize actions
  const onPageClick = useCallback(
    newPage => onPageChange(Math.min(Math.max(newPage, 1), lastPage)),
    [onPageChange, lastPage]
  )
  const onFirstPageClick = useCallback(() => onPageClick(1), [onPageClick])
  const onPrevPageClick = useCallback(() => onPageClick(page - 1), [
    onPageClick,
    page,
  ])
  const onNextPageClick = useCallback(() => onPageClick(page + 1), [
    onPageClick,
    page,
  ])
  const onLastPageClick = useCallback(() => onPageClick(lastPage), [
    onPageClick,
    lastPage,
  ])

  return useMemo(
    () => ({
      lastPage,
      onPageClick,
      onFirstPageClick,
      onPrevPageClick,
      onNextPageClick,
      onLastPageClick,
      firstItemInPage,
      lastItemInPage,
    }),
    [
      lastPage,
      onPageClick,
      onFirstPageClick,
      onPrevPageClick,
      onNextPageClick,
      onLastPageClick,
      firstItemInPage,
      lastItemInPage,
    ]
  )
}