import { Dispatch, FC, SetStateAction } from 'react'

interface TestStateTypes {
  mode: string
}

interface ForumListProps {
  setTestRoute: Dispatch<SetStateAction<TestStateTypes>>
}

export const ForumList: FC<ForumListProps> = ({ setTestRoute }) => {
  const testList = [
    {
      title: 'Обсуждение игровых моментов',
      discribe:
        'Зарегистрируйтесь на форуме сообщества Apex Legends для обсуждения информации об игре, кодов предзаказа, обновлений и списков изменений.',
      countOfThemes: 2358,
      countOfAnswers: 18649,
    },
    {
      title: 'Технические вопросы',
      discribe:
        'Проблема с активацией кода или подключением? Низкая производительность? Сбой, зависание или ошибка? Ищите решения проблем в нашем сообществе.',
      countOfThemes: 8114,
      countOfAnswers: 34412,
    },
    {
      title: 'Сообщения об ошибках',
      discribe: 'Рассказывайте об ошибках, чтобы получить помощь сообщества.',
      countOfThemes: 2341,
      countOfAnswers: 7808,
    },
  ]

  return (
    <main className="font-mono" style={{ width: 1280, margin: '50px auto' }}>
      <div className="w-full h-11 text-3xl text-state-800">
        Сообщество Blackhole
      </div>

      <div className="border-y-2 py-1 border-black">
        <div className="flex font-bold h-6 uppercase">
          <div className="w-10/12">Название и описание форума</div>
          <div className="w-1/12 text-center">темы</div>
          <div className="w-1/12 text-center">ответы</div>
        </div>

        <div>
          {testList.map((item, index) => {
            return (
              <div
                className="py-2.5 border-black border-y flex hover:bg-slate-100 cursor-pointer"
                onClick={() => setTestRoute({ mode: 'theme' })}
                key={index}>
                <div className="w-10/12">
                  <div className="text-indigo-600 text-2xl">{item.title}</div>
                  <div className="forum-item-discribe">{item.discribe}</div>
                </div>
                <div className="w-1/12 flex justify-center items-center font-bold">
                  {item.countOfThemes}
                </div>
                <div className="w-1/12 flex justify-center items-center font-bold">
                  {item.countOfAnswers}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
