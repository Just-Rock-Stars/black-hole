import { FC } from 'react'

interface ErrorTypes {
  code: string
  title: string
  message: string
}

// Пример добавления страницы
// <ErrorPage code={"500"} title={"Ошибка сервера"} message={"Мы уже исправляем это"}/>

export const ErrorPage: FC<ErrorTypes> = ({ code, title, message }) => {
  return (
    <main
      className="grid min-h-full place-items-center bg-white text-base px-6 py-24 sm:py-32 lg:px-8"
      style={{ height: '100vh' }}>
      <div className="text-center">
        <p className="text-8xl font-bold text-indigo-600">{code}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">{message}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            На главную
          </a>
          <a href="#" className="text-sm font-semibold text-gray-900">
            Связаться с нами <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  )
}
