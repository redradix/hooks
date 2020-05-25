import {
  useRef,
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react'

const calculateScrollEnds = (target, margins) => ({
  top: target.scrollTop <= margins.top,
  left: target.scrollLeft <= margins.left,
  right:
    target.scrollLeft >=
    target.scrollWidth - target.offsetWidth - margins.right,
  bottom:
    target.scrollTop >=
    target.scrollHeight - target.offsetHeight - margins.bottom,
})

// Input:
//
// - `margins = { top, right, bottom, left }`
//   - How many pixels to have as margin to detect if it's on end.
//
// Output:
//
// - `handleScroll`
//   - Handler for scroller `onScroll`
// - `scrollEnds = { top, right, bottom, left }`
//   - Booleans. True if scroll is near the end.
const useScrollEnds = (margins = {}) => {
  // Component input. Uses useState instead of useRef because we want to
  // re-render depending on the component itself
  const [scrollerElement, setScrollerRef] = useState()

  // Memoize margins based on their values to avoid infinite updates if caller
  // creates the object every render
  const { top = 0, right = 0, bottom = 0, left = 0 } = margins

  const memoizedMargins = useMemo(() => ({ top, right, bottom, left }), [
    top,
    right,
    bottom,
    left,
  ])

  // Output
  const [scrollEnds, setScrollEnds] = useState({
    top: true,
    right: true,
    bottom: true,
    left: true,
  })

  // Recalculate when scroller element changes
  useLayoutEffect(() => {
    if (scrollerElement) {
      setScrollEnds(calculateScrollEnds(scrollerElement, memoizedMargins))
    }
  }, [scrollerElement, memoizedMargins])

  // Recalculate on resize
  const handleWindowResize = useCallback(() => {
    if (scrollerElement) {
      setScrollEnds(calculateScrollEnds(scrollerElement, memoizedMargins))
    }
  }, [scrollerElement, memoizedMargins])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize])

  // Recalculate on scroll
  const ticking = useRef(false)

  const handleScroll = useCallback(
    ({ target }) => {
      if (!ticking.current) {
        // For scroll performance. See more: https://developer.mozilla.org/es/docs/Web/API/Document/scroll_event
        window.requestAnimationFrame(() => {
          setScrollEnds(calculateScrollEnds(target, memoizedMargins))
          ticking.current = false
        })
      }

      ticking.current = true
    },
    [ticking, memoizedMargins],
  )

  return { handleScroll, setScrollerRef, scrollEnds }
}

export default useScrollEnds