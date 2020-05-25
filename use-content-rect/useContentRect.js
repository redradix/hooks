import { useEffect, useCallback, useState, useRef } from 'react'

const useContentRect = () => {
  const ref = useRef(null)
  const [contentRect, setContentRect] = useState(
    ref.current ? ref.current.getBoundingClientRect() : {}
  )
  const handleResize = useCallback(
    () =>
      setContentRect(ref.current ? ref.current.getBoundingClientRect() : {}),
    [ref]
  )

  useEffect(() => {
    const node = ref.current
    if (!node) return
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
    }
  }, [ref, contentRect])

  return [ref, contentRect]
}