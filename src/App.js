import React from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import Detail from './pages/Detail';
import styled from 'styled-components'



function App() {
  const [가게이름, 가게이름변경] = React.useState([
    { id: 0,
      name: '가게이름',
      location: '위치0',
      image: '사진0',
      content: '음식정보0'
    },
    { id: 1,
      name: '핫도그가게',
      location: '의정부',
      image: '사진1',
      content: '음식정보1'
    },
    { id: 2,
      name: '김밥가게',
      location: '김포',
      image: '사진2',
      content: '음식정보2'
    },
    { id: 3,
      name: '우동가게',
      location: '마포',
      image: '사진3',
      content: '음식정보3'
    },
  ])

 
  const navigate = useNavigate();
  return (
    <div className="App">
      <Title onClick={()=> {navigate('/') }}>🛣고속도로  로 '맛' 으 </Title>
      <Routes>
        <Route path="/" element={<Main 가게이름={가게이름}/>} />             
        <Route path="/SignUp" element={<SignUp />} />   
        <Route path="/LogIn" element={<LogIn />} />
        <Route path='/Detail/:id' element={<Detail 가게이름={가게이름}/>}/>
      </Routes>
    </div>
  );
}

const Title = styled.h1`
font-family: 'Yeongdo-Rg';

`

export default App;
