import React, { useRef, useState, useEffect } from 'react';
import TagsInput from 'react-tagsinput'
import AutosizeInput from 'react-input-autosize'
import 'react-tagsinput/react-tagsinput.css'
function App() {
  const carousel = useRef(null)
  const [canSwipeRight, setCanSwipeRight] = useState(true)
  const [canSwipeLeft, setCanSwipeLeft] = useState(false)
  const [tags, setTags] = useState([])

  const checkCanSwipe = (offset = 0) => {
    setCanSwipeLeft(!!carousel.current && carousel.current.scrollLeft + offset > 0)
    setCanSwipeRight(!!carousel.current && carousel.current.scrollLeft + offset < carousel.current.scrollWidth - carousel.current.offsetWidth)
  }

  useEffect(() => {
    checkCanSwipe()
  }, [carousel])

  

  const swipe = (offset) => {
    checkCanSwipe(offset)
    carousel.current.scrollLeft += offset
  }

  const items = (new Array(100)).fill(null)
  return (
    <div className="App" style={{paddingLeft: 50, paddingRight: 50}}>
      {
        canSwipeLeft &&
        <button onClick={() => {
          swipe(-carousel.current.offsetWidth)
        }} className="button">prev</button>
      }
      <div ref={carousel} className="columns is-mobile carousel" style={{marginTop: 30, scrollBehavior: 'smooth', overflowX: 'auto',}}>
        {
          items.map((_, idx) => (
            <div key={idx} style={{border: '1px solid black', marginLeft: 5, marginRight: 5, borderRadius: 30}} className="column is-narrow">somebody {idx}</div>
          ))
        }
      </div>
      {
        canSwipeRight && 
        <button onClick={() => {
          console.log(carousel.current.offsetWidth)
          swipe(carousel.current.offsetWidth)
        }} className="button">next</button>
      }
      
      <TagsInput
        className="input tags input-tags"
        focusedClassName={null}
        inputProps={{placeholder: 'Add a tag'}}
        value={tags} onChange={setTags} 
        renderTag={({ getTagDisplayValue, tag, onRemove, key}) => (
            <span class="tag">
              {getTagDisplayValue(tag)}
            <button onClick={() => onRemove(key)} class="delete is-small"></button>
          </span>
        )}
        />
    </div>
  );
}

export default App;
