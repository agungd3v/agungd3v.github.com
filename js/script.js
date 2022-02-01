function calculateAge(yob = 1996) {
  const year = new Date().getFullYear()
  const age = year - yob
  const elAge = document.querySelector('.age')
  return elAge.textContent = age
}

function switchTab(tab) {
  fetch('/data/info.json').then(response => response.json()).then(data => {
    pengalaman(data.pengalaman, tab)
  }).catch(err => console.error(err))
}

function pengalaman(data, type = 'profesional') {
  document.querySelector('#switch-tab').innerHTML = null
  const makeList = document.createElement('div')
  makeList.classList.add('list-group')
  makeList.setAttribute('id', 'switch-list')
  document.querySelector('#switch-tab').append(makeList)
  const switchList = document.querySelector('#switch-list')
  let lists
  switch (type) {
    case 'profesional':
      lists = data.profesional
      break
    case 'freelancer':
      lists = data.freelancer
      break
    case 'event':
      lists = data.event
      break
    default:
      lists = data.profesional
      break
  }
  lists.map(info => {
    return switchList.innerHTML += `
      <a href="#" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${info.title}</h5>
          <small class="text-muted">${info.date}</small>
        </div>
        <p class="mb-1">${info.description}</p>
        <small class="text-muted">${info.company}</small>
      </a>
    `
  })
}

(function() {
  fetch('/data/info.json').then(response => response.json()).then(data => {
    pengalaman(data.pengalaman)
  }).catch(err => console.error(err))
  calculateAge()
})()