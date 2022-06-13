import React from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'


function LogIn() {

    const navigate = useNavigate();
    const id_ref = React.useRef(null);
    const pw_ref = React.useRef(null);

    const [username, setUserName] = React.useState("");
    const [password, setPwd] = React.useState("");

    const login = ()=> {
       axios.post('http://localhost:3000/login',{
            "ID": id_ref.current.value,
            "password": pw_ref.current.value}, {

            }).then(function(response){
                alert("로그인이 완료되었습니다!")
                navigate('/');
                

                console(response)
            }).catch(function(error){
                alert("로그인 정보가 잘못되었습니다!")
            })
  
    }
  
 
    return (
        <div>
      
    <Container>
    
    
    <div >
            <input   placeholder="아이디를 입력해주세요." 
            onChange={(e) => setUserName(e.target.value)} ref={id_ref}/>    <br/>
            <input type="Password"   placeholder="비밀번호를 입력해주세요." 
            onChange={(e) => setPwd(e.target.value)} ref={pw_ref}/>   <br/>      
      
          
            <Btn1 onClick={login} type="submit"> 로그인  </Btn1>
        
            <Btn2 onClick={()=>{navigate('/SignUp')}} > 회원가입</Btn2>
          </div>
    
          
        </Container>
        </div>
    );
}

const Container = styled.div`
background-size: cover;
background-color: ;
width: 400px;
height: 450px;
padding: 50px;
border: 2px solid black;
display: flex;
flex-direction: column;
align-content: flex-start;
float: center;
margin: 40px 20px 40px 20px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);

text-align: center;`

const Btn1 = styled.button`
margin: 10px 10px 10px 10px;
`

const Btn2 = styled.button`
margin: 10px 10px 10px 10px;
` ;



export default LogIn