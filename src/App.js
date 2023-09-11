import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Detail from './pages/Detail';
import { useEffect, useState } from 'react';
import QuisList from './components/QuisList';

function App() {

  const [userName, setUserName] = useState("");
  const [quisList, setQuisList] = useState(QuisList);
  const quiz = [...QuisList]
  const [selected, setSelected] = useState(3);
  const [quizCnt, setQuizCnt] = useState(QuisList.length);
  const [typeTxt, setTypetxt] = useState("전체");
    const ChangeEvent = (data) =>{
    const classValue = data.target.className;
    const dataValue = data.target.value;

    switch(true){
      //includes("값") > 해당 문자열이 있는지 체크
      case classValue.includes("name") :
        setUserName(dataValue)
      break;
      case classValue.includes("count") :
        setSelected(dataValue);
      break;
      case classValue.includes("random") :
        (dataValue === "1" ? setQuisList([...QuisList].sort(()=>{
          return Math.random() - 0.5}).slice(0, selected)
        )
        : setQuisList([...QuisList]).slice(0,selected))
        // 0~1 사이의 값을 반환 > 0.5의 평균값을 얻게 되어 -0.5 ~ 0.5값으로 렌덤출력
        // 배열초기화하고 랜덤돌려야함 배열초기화안하면2배가됨
      break;
      case classValue.includes("type") :
        (dataValue === "전체" 
          ?
          setQuisList([...QuisList].slice(0,selected))
          :
          setQuisList([...QuisList].filter((e)=>{
            return e.type === dataValue
          }).slice(0,selected))
        )
        setTypetxt(dataValue);
        
      break;
      default:
        console.log("데이터가 없습니다.")
    }
  }
  // 'changename'이라는 함수를 실행시킴 setusername(data)에 이름이 입력되면 username으로 입력되는 원리
  
//재렌더링할때 로딩이되고 실행되는 것(무언가가 바뀌게되면 계속 실행됨)
  useEffect(()=>{
    setQuisList([...QuisList].slice(0,selected));
    setQuizCnt([...QuisList].filter((e)=>{
      return typeTxt === "전체" ? true : e.type === typeTxt;
    }).length);
  },[typeTxt, selected])
  //로딩이 될때 딱 1번만 실행되는 문법은 ,[]을 넣기
  //재렌더링되야 할 state 값을 넣으면 useEffect실행,[userName, quisList]
  console.log(quizCnt,typeTxt, selected)

  return (
      <Routes>
        <Route path="/" element={<Main ChangeEvent={ChangeEvent} userName={userName} quiz={quiz} selected={selected} quisList={quisList} quizCnt={quizCnt} />} />
        <Route path="/quis" element={<Detail quisList={quisList} userName={userName}/>} />
      </Routes>
  
  );
}

export default App;
