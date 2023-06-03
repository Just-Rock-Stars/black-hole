import { Dispatch, FC, SetStateAction } from 'react'

interface TestStateTypes {
  mode: string
}

interface TopicListProps {
  setTestRoute: Dispatch<SetStateAction<TestStateTypes>>
}

export const TopicList: FC<TopicListProps> = props => {
  const testTopicList = [
    {
      title: 'Некоректное начисление бонусов за матч',
      author: 'FlexK1ngN1TTV',
      answers: 1,
      lastPublic: {
        time: '4 часа назад',
        author: 'Техническая поддержка',
      },
    },
    {
      title: 'Баг в меню, не работает кнопка играть',
      author: 'Falepton',
      answers: 5,
      lastPublic: {
        time: '5 часа назад',
        author: 'Техническая поддержка',
      },
    },
    {
      title: 'Как пройти финальный уровень?',
      author: 'Dalsem',
      answers: 2,
      lastPublic: {
        time: '10 часов назад',
        author: 'Пользователь: Falepton',
      },
    },
    {
      title: 'Персонаж телепортируется во время игры',
      author: 'Copatich',
      answers: 0,
      lastPublic: {
        time: '1 день назад',
        author: '',
      },
    },
    {
      title: 'Люблю вашу игру',
      author: 'Piligrim',
      answers: 1,
      lastPublic: {
        time: '2 дня назад',
        author: 'Техническая поддержка',
      },
    },
  ]

  return (
    <main className="font-mono" style={{ width: 1280, margin: '50px auto' }}>
      <h1 className="w-full py-2 text-3xl text-slate-800 border-y border-black">
        Раздел: (название раздела)
      </h1>
      <nav className="flex text-xl">
        <div className="w-6/12">тема</div>
        <div className="w-2/12 text-center">ответы</div>
        <div className="w-4/12 text-center">последняя публикация</div>
      </nav>

      {testTopicList.map(item => {
        return (
          <div
            className="flex py-1 px-1 cursor-pointer odd:bg-slate-200"
            onClick={() => props.setTestRoute({ mode: 'topic' })}>
            <div className="w-6/12">
              <div className="text-lg h-20 mt-1">{item.title}</div>
              <div className="text-sm">Автор: {item.author}</div>
            </div>
            <div className="w-2/12 flex items-center justify-center text-2xl">
              {item.answers}
            </div>
            <div className="w-4/12 flex flex-col items-center justify-center">
              <div className="">{item.lastPublic.time}</div>
              <div className="">{item.lastPublic.author}</div>
            </div>
          </div>
        )
      })}
    </main>
  )
}
