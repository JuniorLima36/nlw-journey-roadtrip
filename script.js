const formatter = (data) => {
  return {
    day: {
      numeric: dayjs(data).format('DD'),
      week: {
        short: dayjs(data).format('ddd'),
        long: dayjs(data).format('dddd'),
      }
    },
    month: dayjs(data).format('MMMM'),
    time: dayjs(data).format('HH:mm')
  }
}

const activity = {
  name: "Almoço",
  date: new Date("2024-07-08 12:00"),
  completed: true
}

let activities = [
  activity,
  {
    name: 'Academia',
    date: new Date("2024-07-09 19:00"),
    completed: false
  },
  {
    name: 'Reunião da empresa',
    date: new Date("2024-07-09 16:00"),
    completed: true
  },
]

const createActivityItem = (activity) => {
  let input = `
  <input 
    onchange="completeActivity(event)"
    value="${activity.date}"
    type="checkbox" 
  `

  if (activity.completed) {
    input += 'checked'
  }

  input += '>'

  const formatted = formatter(activity.date);

  return `
    <div class="card-bg">
      ${input}
      <div>
        <img class="active" src="assets/checked.svg" alt="">
        <img class="inactive" src="assets/check.svg" alt="">
        <span>${activity.name}</span>
      </div>
      <time class="short">
        ${formatted.day.week.short}.
        ${formatted.day.numeric} <br>
        ${formatted.time}
      </time>
      <time class="full">
        ${formatted.day.week.long}, 
        dia ${formatted.day.numeric}
        de ${formatted.month} 
        às ${formatted.time}h 
      </time>
    </div>
  `
}

const updateActivityList = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  if (activities.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }

  for (let activity of activities) {
    section.innerHTML += createActivityItem(activity)
  }
}

updateActivityList()

const saveActivity = (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  const name = formData.get('atividade')
  const day = formData.get('dia')
  const time = formData.get('hora')
  const date = `${day} ${time}`

  const newActivity = {
    name,
    date,
    completed: false
  }

  const activityExists = activities.find((activity) => {
    return activity.date == newActivity.date
  })

  if (activityExists) {
    return alert('Dia/Hora não disponível')
  }

  activities = [newActivity, ...activities]
  updateActivityList()
}

const createDaySelection = () => {
  const days = [
    '2024-07-08',
    '2024-07-09',
    '2024-07-10',
    '2024-07-11',
    '2024-07-12',
    '2024-07-13',
    '2024-07-14',
  ]

  let daySelection = ''

  for (let day of days) {
    const formatted = formatter(day)
    const formattedDay = `
      ${formatted.day.numeric} de 
      ${formatted.month}
    `
    daySelection += `
      <option value="${day}">${formattedDay}</option>
    `
  }

  document.querySelector('select[name="dia"]').innerHTML = daySelection
}

createDaySelection()


const createTimeSelection = () => {
  let availableTimes = ''

  for (let i = 6; i < 23; i++) {
    const hour = String(i).padStart(2, '0')
    availableTimes += `
    <option value="${hour}:00">${hour}:00</option>`
    availableTimes += `
    <option value="${hour}:30">${hour}:30</option>`
  }

  document.querySelector('select[name="hora"]').innerHTML = availableTimes
}

createTimeSelection()

const completeActivity = (event) => {
  const input = event.target
  const dateForThisInput = input.value

  const activity = activities.find((activity) => {
    return activity.date == dateForThisInput
  })

  if (!activity) {
    return
  }

  activity.completed = !activity.completed
}
