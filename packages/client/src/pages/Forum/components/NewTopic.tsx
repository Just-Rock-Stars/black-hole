import { FC, useState } from 'react';

import { INewTopicProps } from '../types';

export const NewTopic: FC<INewTopicProps> = ({ setIsNewTopicOpen, idTopicList }) => {
  const [inputValue, setInputValue] = useState('');

  // const publicNewTopic = function () {

  //   let user = JSON.parse(localStorage.getItem("user"))
  //   user = JSON.parse(user)
  //   // if(localStorage.getItem("user") != null){

  //   //   let user: object = JSON.parse(localStorage.getItem('user'))

  //   // }

  //   // let resData = {
  //   //   forumId: idTopicList,
  //   //   name: inputValue,
  //   //   yaId: user.id,
  //   //   authorName: 'Ahikyoshi',
  //   // };

  //   // console.log(resData);

  // };

  return (
    <div className="w-full h-full absolute top-0 left-0 bg-white flex flex-col items-center justify-center">
      <div className=" text-3xl text-center mb-5">Создание нового топика</div>
      <input
        className="w-1/2 h-9 border border-slate-300 rounded indent-1 mb-3"
        id="newTopicInput"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Опишите вашу проблему"
        type="text"
        value={inputValue}
      />
      {/* <button className="w-1/2 h-11 btn-primary" onClick={() => publicNewTopic()}>
        Создать
      </button> */}
      <div
        className=" absolute top-5 right-5 hover:cursor-pointer"
        onClick={() => setIsNewTopicOpen(false)}
      >
        X
      </div>
    </div>
  );
};
