import React from 'react'
import { useNavigate } from 'react-router-dom';


function Main({userName, ChangeEvent, quisList, quiz, selected, quizCnt}) {

  let navigate = useNavigate();

  const type = quiz.map(item => item.type);
  // 중복을 방지하는 코드
  const typeSelect = [...new Set(type)];

  const nameChk = () =>{
    (userName === "" 
    ? function(){
      alert("이름을 입력해주세요");
      document.querySelector("input").focus();
    }()
    : 
    navigate("/quis")
    )
  }

 
  return (
    <>
      <div className='w-full flex items-center h-full'>
        <div className='mx-auto basis-11/12 lg:basis-10/12'>
          <div className='bg-white rounded-lg p-5 pb-0'>
            <div className='text-center flex flex-wrap justify-between'>
              <input defaultValue={userName} className='name border pl-4 py-2 rounded-md shadow-md outline-none basis-full sm:basis-8/12' type='text' onChange={ChangeEvent} placeholder='이름을 입력해주세요' />
              <button className='text-sm sm:text-base btn-primary bg-blue-400 hover:bg-blue-600 focus:ring-blue-300 sm:py-0 basis-full sm:basis-3/12 mt-5 sm:mt-0' onClick={()=> {nameChk()}}>시작하기</button>
              <h3 className="my-5 basis-full text-center">{userName !== "" && <><span className='text-indigo-500 font-bold'>{userName}님 </span> <span> 문제 유형은 기본값으로 설정되어있으며, 총 {quiz.length} 문제 중 1문제를 선택하셨습니다.</span></>}</h3>
              {/* 어떤한 변수값에 값이 있으면 나오고 그게아니라면 안나옴 */}
            </div>
          </div>
          <div className="w-full bg-white rounded-lg p-5 mt-5 flex justify-between flex-wrap items-center">
            <div className="flex justify-around items-center xl:basis-4/12 basis-full">
              <button className='btn-primary text-sm sm:text-base bg-green-700 hover:bg-green-600 focus:ring-green-300 basis-5/12'>랜덤설정</button>
              <select className='random border rounded basis-6/12 text-center py-1.5' onChange={ChangeEvent}>
                <option value="0">기본</option>
                <option value="1">랜덤</option>
              </select>
            </div>
            <div className="flex justify-around items-center xl:basis-4/12 basis-full">
            <button className='btn-primary text-sm sm:text-base bg-green-700 hover:bg-green-600 focus:ring-green-300 basis-5/12 my-5'>갯수설정</button>
            <select className='count border rounded basis-6/12 text-center py-1.5' onChange={ChangeEvent} defaultValue={selected}>
              {
                Array(quizCnt).fill().map((e,i)=>{
                  return <option value={i+1} key={i}>{i+1}문제</option>
                })
              }
            </select>
            </div>
            <div className="flex justify-around items-center xl:basis-4/12 basis-full">
              <button className='btn-primary text-sm sm:text-base bg-green-700 hover:bg-green-600 focus:ring-green-300 basis-5/12'>문제유형</button>
              <select className='type border rounded basis-6/12 text-center py-1.5' onChange={ChangeEvent}>
                <option value="전체">전체 ({quiz.length}문제)</option>
                {
                  typeSelect.map(el =>{
                    return <option value={el} key={el}>{el} ({quiz.filter(e=> el === e.type).length}문제)</option>
                  })
                }
                {/* quiz(원본)에서 필터를 돌려서 e값이 el(value=html,css,java) 중 e.type(3중하나)와 같은 length(개수) //중괄호를 쓰면 return문을 적어여하고 중괄호를 안쓰면 그냥 적음 */}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Main