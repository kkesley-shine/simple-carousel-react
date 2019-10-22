import React, { useRef, useState, useEffect } from 'react';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
function App() {
  const [tags, setTags] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  return (
    <div className="App" style={{paddingLeft: 50, paddingRight: 50}}>

        <div onClick={() => inputRef.current.focus()} className="input tags input-tags">
          {
            tags.map((tag, index) => (
              <span style={{marginBottom: 0}} class="tag is-medium">
                  {tag}
                <button onClick={() => setTags([...tags.slice(0, index), ...tags.slice(index + 1)])} class="delete is-small"></button>
              </span>
            ))
          }
          <input
            tabIndex="0"
            ref={inputRef}
            value={input}
            size={Math.max(10, input.length)} 
            onChange={e => setInput(e.target.value)}
            className="tag-input is-size-6"
            placeholder="Add a tag..."
            type="text"
            onKeyDown={e => { 
              if((e.key === 'Tab' || e.key === 'Enter') && input.length > 0) {
                setTags([...tags, input])
                setInput('')
                e.preventDefault()
              } else if (input.length === 0 && e.key === 'Backspace') {
                setTags([...tags.slice(0, tags.length - 1), ...tags.slice(tags.length - 1 + 1)])
              }
            }}
            />
        </div>
    </div>
  );
}

export default App;
