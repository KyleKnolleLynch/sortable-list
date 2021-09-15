const draggableList = document.getElementById('draggable-list')
const checkBtn = document.getElementById('check-btn')

const largestCountries = [
  'Russia',
  'Canada',
  'China',
  'United States',
  'Brazil',
  'Australia',
  'India',
  'Argentina',
  'Kazakhstan',
  'Algeria',
]

const listItems = []

let dragStartIndex

//  Create list function
function createList() {
  ;[...largestCountries]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .forEach((country, i) => {
      const listItem = document.createElement('li')

      listItem.setAttribute('data-index', i)

      listItem.classList = 'bg-purples-300 display-f align-center'

      listItem.innerHTML = `
            <span class='number display-f justify-center align-center bg-neutrals-900 font-size-400'>${
              i + 1
            }</span>
            <div class='draggable-item display-f justify-space-between align-center p-1' draggable='true'>
                <p class='country-name font-size-300 mr-3'>${country}</p>
                
   
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
               
            </div>
        `

      listItems.push(listItem)

      draggableList.appendChild(listItem)
    })

  addEventListeners()
}

createList()

//  Event listener funcitons
function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index')
}

function drop() {
  const dragEndIndex = +this.getAttribute('data-index')
  swapItems(dragStartIndex, dragEndIndex)

  this.classList.remove('over')
}

//  drop helper function to swap list items that are dragged and dropped
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable-item')
  const itemTwo = listItems[toIndex].querySelector('.draggable-item')

  listItems[fromIndex].appendChild(itemTwo)
  listItems[toIndex].appendChild(itemOne)
}

function dragOver(e) {
  e.preventDefault()
}

function dragEnter() {
  this.classList.add('over')
}

function dragLeave() {
  this.classList.remove('over')
}

//  Check the order of list items
function checkOrder() {
  listItems.forEach((item, i) => {
    const country = item.querySelector('.draggable-item').innerText.trim()

    if (country !== largestCountries[i]) {
      item.classList.add('incorrect')
    } else {
      item.classList.remove('incorrect')
      item.classList.add('correct')
    }
  })
}

//  Event listeners
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable-item')
  const dragListLiItems = document.querySelectorAll('.draggable-list li')

  draggables.forEach(item => {
    item.addEventListener('dragstart', dragStart)
  })

  dragListLiItems.forEach(liItem => {
    liItem.addEventListener('dragover', dragOver)
    liItem.addEventListener('drop', drop)
    liItem.addEventListener('dragenter', dragEnter)
    liItem.addEventListener('dragleave', dragLeave)
  })
}

checkBtn.addEventListener('click', checkOrder)
