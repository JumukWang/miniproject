import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'
import { emailCheck, passwordCheck, DoubleCheck } from "../shared/Validate";


function SignUp() {
    const navigate = useNavigate();

    const profile_ref= React.useRef(null);
    const id_ref = React.useRef(null);
    const pw_ref = React.useRef(null);
    const pw_check_ref = React.useRef(null);

    const [myprof,serMypro]=React.useState("");
    const [username, setUserName] = React.useState("");
    const [password, setPwd] = React.useState("");
    const [pwdCheck, setPwdCheck] = React.useState("");

    const [id_check, checkId] = React.useState(false);
    const [pwd_check, checkPwd] = React.useState(false);
    const [pwd_double_check, checkPwdCheck] = React.useState(false);

    
   
    const signupdata = () => {
        if(!emailCheck(id_ref.current.value)){
            checkId(true);
            window.alert("이메일 형식이 맞지 않습니다!");
        };

        if(!passwordCheck(pw_ref.current.value)){
            checkPwd(true);
            window.alert("비밀번호 형식이 맞지 않습니다!")
            return;
        };

        if(!DoubleCheck(pw_ref.current.value, pw_check_ref.current.value)){
            checkPwdCheck(true);
            window.alert("비밀번호가 같지 않습니다!")
            return;
        };
        if (
            emailCheck(id_ref.current.value) &&
            passwordCheck(pw_ref.current.value) &&
            DoubleCheck(pw_ref.current.value, pw_check_ref.current.value)
        ){
        axios.post("http://localhost:3000/api/SignUp",{
            // "profile":profile_ref.current.value,
            "userId" : id_ref.current.value,
            "password": pw_ref.current.value,
            // "passwordCheck": pw_check_ref.current.value
        }).then(function(response){
            alert("회원가입을 축하드립니다!!")
            navigate('/');

        })
        }
    }
        

    return (
        <div>

            <div>


                <div style={{}}>
                    <Container>
                       <input
                            type="file"
                            label="파일선택"
                             onChange={(e) => serMypro(e.target.value)}
                            
                            ref={profile_ref} /><br />
                        <input
                            label="아이디"
                             onChange={(e) => setUserName(e.target.value)}
                            placeholder="이메일 형식 아이디를 입력해주세요."
                            ref={id_ref} /><br />

                        <input
                            label="비밀번호"
                             onChange={(e) => setPwd(e.target.value)}
                            type="Password"
                            placeholder="7자리이상 비밀번호 입력해주세요"
                            ref={pw_ref} /><br />

                        <input
                            label="비밀번호 확인"
                             onChange={(e) => setPwdCheck(e.target.value)}
                            type="Password"
                            placeholder="비밀번호를 다시 한번 입력해주세요." 
                            ref={pw_check_ref}/><br />
                        <Signupbutton>
                            <button
                                onClick={signupdata} type="submit" 
                                bgcolor="#f49a28" color="white" >회원가입</button>

                            <button onClick={() => { navigate('/') }} 
                                bgcolor="#007356" color="white" > 취소</button>
                        </Signupbutton>

                       

                    </Container>

                </div>


            </div>
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

text-align: center;


`
const Signupbutton = styled.div`
  margin: auto;
  width: 220px;
  padding: 20px;

  &button {
      margin-left: 10px;
  }
`;



export default SignUp