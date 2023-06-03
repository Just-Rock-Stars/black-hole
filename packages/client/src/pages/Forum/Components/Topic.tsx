import { FC } from 'react'

export const Topic: FC = () => {
  const testTopic = [
    {
      author: 'BlackWood',
      message: 'Добрый день, не могу поиграть в вашу игру',
      time: '20 минут назад',
    },
    {
      author: 'Техническая поддержка',
      message:
        'Добрый день, могли бы вы детальнее описать проблему с которой вы столкнулись?',
      time: '24 минут назад',
    },
    {
      author: 'BlackWood',
      message: 'Да, я пытаюсь управлять персонажем, но он остаеться на месте.',
      time: '30 минут назад',
    },
    {
      author: 'Техническая поддержка',
      message:
        'Управление персонажем, производится с помощью нажатия на стрелочки.',
      time: '32 минут назад',
    },
    {
      author: 'BlackWood',
      message: 'Спасибо большое, теперь я могу играть',
      time: '40 минут назад',
    },
    {
      author: 'Техническая поддержка',
      message: 'В случае возникновения новых проблем обращайтесь!',
      time: '42 минут назад',
    },
  ]
  return (
    <main className="font-mono" style={{ width: 1280, margin: '50px auto' }}>
      <h1 className="w-full py-2 text-3xl text-slate-800 border-y border-black">
        {testTopic[0].message}
      </h1>
      {testTopic.map(item => {
        return (
          <div
            className="flex py-10 px-1 cursor-pointer odd:bg-slate-200"
            key={item.message}>
            <div className="text-sm w-2/12">{item.author}</div>
            <div className="w-8/12">{item.message}</div>
            <div className="w-2/12 text-end">{item.time}</div>
          </div>
        )
      })}
    </main>
  )
}
