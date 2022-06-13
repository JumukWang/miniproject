import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'


function Main({ 가게이름 }) {
    const navigate = useNavigate(); 
    
 
    return (
        <div>
          <button onClick={()=>{navigate('/LogIn')}} > Log in  </button>
          <Line/>
    <div>
    
    
    <div>
      {
        가게이름.map((a, i) => {
          return (
            <div style={{ background: 'gray', height: '300px', width: '300px', color: 'white' }}>
              <p>{a.name}</p>
              <p>{a.location}</p>
              <button onClick={() => {
                navigate(`/Detail/${i}/`)
              }}>{a.image}</button>
              <tr></tr>
            </div>
          )
        })
      }
    </div>
            
            
            
        
           
          </div>
    
          
  
        </div>
    );
}

const Line = styled.hr`
`


export default Main