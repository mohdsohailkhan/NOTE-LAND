let noteListRootElement = document.querySelector('.notescontainer')
noteListRootElement.className = 'notescontainer'

let notes = []
document.getElementById('new_note').addEventListener('click',()=>{
    let notepad = document.querySelector('.notepad')
    notepad.style.display = 'block'
    let footer = document.querySelector('.footer')
    let display = document.querySelector('.display')
    footer.style.display = 'none'
    display.style.display = 'none'
})

document.getElementById('create_note').addEventListener('click',()=>{
    let uniqueId = Math.floor(Math.random() * 1000)
    let note = {
      title : document.getElementById('text').value,
      content : document.getElementById('textarea').value
    }
    if(document.getElementById('text').value.length > 0 && document.getElementById('textarea').value.length > 0)
    {
      renderNoteToList(note , uniqueId)
      addNoteToLocalStorage(note , uniqueId)
    } 
    else{alert('please fill the required title and content')}
})

  function renderNoteToList(note , uniqueId){
    let noteDiv = document.createElement('div')
    let noteTitle = document.createElement('h4')
    let noteContent = document.createElement('p')
    noteDiv.classList.add('content',uniqueId)
    
    noteTitle.innerHTML = note.title
    noteContent.innerHTML = note.content

    noteDiv.appendChild(noteTitle)
    noteDiv.appendChild(noteContent)    
    noteListRootElement.appendChild(noteDiv)
    

    document.getElementById('text').value = ''
    document.getElementById('textarea').value = ''

    noteDiv.addEventListener('click',()=>{
      document.getElementById('note_title').innerHTML = note.title
      document.getElementById('para').innerHTML = note.content
      let footer = document.querySelector('.footer')
      let display = document.querySelector('.display')
      footer.style.display = 'block'
      display.style.display = 'block'
      let notepad = document.querySelector('.notepad')
      notepad.style.display = 'none'

      document.getElementById('delete').addEventListener('click',()=>{
        document.getElementsByClassName('content'+' '+uniqueId)[0].remove()
        notes = JSON.parse(localStorage.getItem('notes'))
        let index = notes.findIndex(note=>note.uniqueId==uniqueId)
        notes.splice(index,1)
        localStorage.setItem('notes',JSON.stringify(notes))
        let footer = document.querySelector('.footer')
        let display = document.querySelector('.display')
        footer.style.display = 'none'
        display.style.display = 'none'
      })
      
    })


    document.getElementById('note_title').innerHTML = note.title
    document.getElementById('para').innerHTML = note.content

  }

  function addNoteToLocalStorage(note , uniqueId){
     note = {...note , uniqueId}
     notes.push(note)
     localStorage.setItem('notes',JSON.stringify(notes))
  }

  renderElementsToScreen()

  function renderElementsToScreen(){
    if(localStorage.getItem('notes')){
      notes = JSON.parse(localStorage.getItem('notes'))
      notes.forEach(note=> {
          renderNoteToList(note,note.uniqueId)
      });
    }
  }

  document.getElementById('new_task').addEventListener('click',()=>{
    let task = document.getElementById('task')
    task.style.display = 'block'
    let header = document.querySelector('.header')
    header.style.filter = 'blur(12px)'
    let footer = document.querySelector('.footer')
    footer.style.filter = 'blur(12px)'
    let display = document.querySelector('.display')
    display.style.filter = 'blur(12px)'
  })

  document.getElementById('create_task').addEventListener('click',()=>{
    let create_task = document.getElementById('create_task')
    create_task.style.display = 'block'
    let create_text = document.getElementById('create_text').value
    document.getElementById('taskheading').innerHTML = create_text
    let header = document.querySelector('.header')
    header.style.filter = 'blur(0px)'
    let footer = document.querySelector('.footer')
    footer.style.filter = 'blur(0px)'
    let display = document.querySelector('.display')
    display.style.filter = 'blur(0px)'
    let task = document.getElementById('task')
    task.style.display = 'none'
    let task_list = document.querySelector('#task_list')
    task_list.style.display = 'block'
  })
  