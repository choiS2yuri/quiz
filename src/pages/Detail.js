import React, { useState } from 'react'




function Detail({quisList, userName}) {
 
   const [current, setCurrent] = useState(0);
   const [userAnswer, setAnswer] = useState([
   ]);

   const setUserAnswer = (data) =>{
    setAnswer([...userAnswer, data])
   }

   const _score = quisList.filter((e,i)=>{
    return e.answer === userAnswer[i]
   }).length
  
   const currentPer = Math.floor(((current + 1) / quisList.length)*100)
  return (
    <>
      <div className="w-full flex items-center h-full">
        <div className="mx-auto basis-11/12 lg:10/12 flex flex-wrap items-center h-full">
          <div className="basis-full text-center">
            {
              current < quisList.length
              ?
              <>
                <h4 className="font-bold text-indigo-500 sm:text-2xl lg:text-3xl text-xl mb-5 bg-white rouned-lg p-5 border">{userName}님 반갑습니다!</h4>
                <div className="w-full h-5 bg-gray-50 rounded-full mb-5 relative">
                  <div className="absolute h-full bg-indigo-400 left-0 top-0 rounded-full translate-all duration-1000" style={{width: `${currentPer}%`}}></div>
                </div>
                <div className="flex flex-wrap justify-between p-5 border rounded-lg bg-white">
                  <p><span className='border w-full bg-slate-200 rounded-full'>{currentPer}%</span>{quisList[current].question}</p>
                  <span>{current + 1} / {quisList.length}문제</span>

                </div>
                <div className="flex flex-wrap justify-between border rounded-lg bg-white mt-5">
                  <ul className='text-center basis-full'>
                    <li className='border-b py-2.5 cursor-pointer hover:bg-gray-50 flex justify-between' onClick={()=>{setCurrent(current+1); setUserAnswer(quisList[current].view.number1)} }>
                      <span className='border-r basis-1/12'>1번</span>
                      <span className='basis-11/12'>{quisList[current].view.number1}</span>
                    </li>
                    <li className='border-b py-2.5 cursor-pointer hover:bg-gray-50 flex justify-between' onClick={()=>{setCurrent(current+1); setUserAnswer(quisList[current].view.number2)} }>
                      <span className='border-r basis-1/12'>2번</span>
                      <span className='basis-11/12'>{quisList[current].view.number2}</span>
                    </li>
                    <li className='border-b py-2.5 cursor-pointer hover:bg-gray-50 flex justify-between' onClick={()=>{setCurrent(current+1); setUserAnswer(quisList[current].view.number3)} }>
                      <span className='border-r basis-1/12'>3번</span>
                      <span className='basis-11/12'>{quisList[current].view.number3}</span>
                    </li>
                    <li className='border-b py-2.5 cursor-pointer hover:bg-gray-50 flex justify-between' onClick={()=>{setCurrent(current+1); setUserAnswer(quisList[current].view.number4)} }>
                      <span className='border-r basis-1/12'>4번</span>
                      <span className='basis-11/12'>{quisList[current].view.number4}</span>
                    </li>
                  </ul>
                </div>
              </>



              : 
              <>
                <div>
                  <p className='text-lg'>총 <span className="font-bold text-indigo-400 text-xl">{quisList.length}</span>문제 중<span className="font-bold text-indigo-400 text-xl">{_score}</span>문제를 맞추셨으며, 점수는<span className="text-indigo-400 font-bold text-xl">{Math.floor((_score / quisList.length)*100)}</span>점입니다.</p>
                  <p className="flex items-center mt-4">
                    정답맞춤: <span className='bg-red-400 w-5 h-5 block mr-5 ml-2'></span>
                    선택한답: <span className='bg-indigo-500 w-5 h-5 block mr-5 ml-2'></span>
                    오답일경우정답: <span className='bg-indigo-300 w-5 h-5 block mr-5 ml-2'></span>
                  </p>
                </div>
                {
                  quisList.map((e,i)=>{
                    return (
                      <ul key={i} className='mt-5 bg-white rounded-2xl'>
                        <li className="flex justify-between flex-wrap">
                          <p className="bg-gray-50 font-bold basis-full border text-base py-4 rounded-lg">{e.question}</p>
                          {
                            Object.entries(e.view).map((el,index)=>{
                              return(
                                <p key={index} className={`font-bold border text-base py-4 rounded-lg mt-5 basis-[49.5%] ${e.answer === el[1] && userAnswer[i]===e.answer ? 'bg-red-400' : e.answer === el[1] ? 'bg-indigo-300' : el[1] === userAnswer[i] ? 'bg-indigo-500' : 'bg-white'}`}>{el[1]}</p>
                                // {el[1]}번을 히는 이유는 QuisList의 배열값에서 1번만출력
                              )
                            })
                          }
                        </li>
                      </ul>
                    )
                  })
                }
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail