#SAMPLE

```
const { handleScroll, setScrollerRef, scrollEnds } = useScrollEnds({
  top: 20,
  bottom: 20,
})

const containerClasses = cx('container-element', {
  'has-top-gradient': !scrollEnds.top,
  'has-bottom-gradient': !scrollEnds.bottom,
})

return (
  <div className={containerClasses}>
    <div
      className="scrolling-element"
      ref={setScrollerRef}
      onScroll={handleScroll}
    >
      {scrollingElementContent}
    </div>
  </div>
)
```
