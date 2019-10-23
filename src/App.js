import React, { useRef, useState, useEffect } from 'react'
import partition from 'lodash.partition'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {LexoRank} from 'lexorank'
function App() {
  const [tags, setTags] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const items1 = (new Array(100)).fill(null).map((_, idx) => ({ key: `1-${idx}`}))
  const items2 = (new Array(100)).fill(null).map((_, idx) => ({ key: `2-${idx}`}))
  const items3 = (new Array(100)).fill(null).map((_, idx) => ({ key: `3-${idx}`}))
  const items = (new Array(100)).fill(null).reduce((partitions, obj, index) => ({...partitions, [index % 3]: [...partitions[index % 3] || [], obj]}),{})
  console.log(items)
  let a = LexoRank.middle()

  new Array(100000).fill(null).forEach(() => {
    a = a.between(a.genNext())
  })
  console.log(a)
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
        <DragDropContext onDragEnd={r => console.log(r)}>
        <div className="container">
          <div className="columns is-multiline">
            <div className="column">
              <Droppable droppableId="droppable-3">
              {
              (provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {
                    items1.map((item, idx) => (
                      <Draggable key={item.key} draggableId={item.key} index={idx}>
                        {(provided, snapshot) => (
                        <div className="card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                        >
                          <div className="card-body">
                            <p>{item.key}</p>
                          </div>
                        </div>
                      )}
                      </Draggable>
                    ))
                  }
                </div>
              )
                
              }
              </Droppable>
              
            </div>
            <div className="column">
            <Droppable droppableId="droppable-1">
            {
              (provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {
                    items2.map((item, idx) => (
                      <Draggable key={item.key} draggableId={item.key} index={idx}>
                        {(provided, snapshot) => (
                        <div className="card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                        >
                          <div className="card-body">
                            <p>{item.key}</p>
                          </div>
                        </div>
                      )}
                      </Draggable>
                    ))
                  }
                </div>
              )
                
              }
            </Droppable>
            </div>
            <div className="column">
            <Droppable droppableId="droppable-2">
            {
              (provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {
                    items3.map((item, idx) => (
                      <Draggable key={item.key} draggableId={item.key} index={idx}>
                        {(provided, snapshot) => (
                        <div className="card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                        >
                          <div className="card-body">
                            <p>{item.key}</p>
                          </div>
                        </div>
                      )}
                      </Draggable>
                    ))
                  }
                </div>
              )
                
              }
            </Droppable>
            </div>
          </div>
        </div>
        </DragDropContext>
    </div>
  );
}

export default App;
