import React from 'react'

type HourlyMessage = {
  startingHour: number
  message: string
}

const Greeting = () => {
  function getGreetingMessage() {
    const data: HourlyMessage[] = [
        {
          startingHour: 22,
          message: 'Working late 🌙',
        },
        {
          startingHour: 18,
          message: 'Good evening 🌇',
        },
        {
          startingHour: 11,
          message: 'Great day! ☀️',
        },
        {
          startingHour: 8,
          message: 'Good morning 🌞',
        },
        {
          startingHour: 4,
          message: 'Whoa, early bird 🌅',
        },
      ],
      hour = new Date().getHours()

    for (const entry of data) {
      if (hour >= entry.startingHour) {
        return entry.message
      }
    }
  }

  const greetingMessage = getGreetingMessage()

  return (
    <div>
      <h2
        id="greeting"
        className="text-lg text-gray-700 dark:text-gray-100 font-bold mt-3 mb-3"
      >
        {greetingMessage}
      </h2>
    </div>
  )
}

export default Greeting
