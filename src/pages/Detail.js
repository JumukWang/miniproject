import React from 'react';
import {useNavigate,useParams} from 'react-router-dom'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux';
import {createPost,deletePost} from "../redux/modules/Post";






function Detail() {
    const [rate, setRate] = React.useState(0);
    const commentlist = useSelector((state) => state.Post.list);
    
    const dispatch = useDispatch();
    const text = React.useRef(null);
    const addCommentList = () => {
       
        dispatch(createPost(text.current.value));
        };

    
    const delCommentList = () => { 
        dispatch(deletePost(text.current.index))
    }
    return (
        <div>
            <Dbox>
        {Array.from({ length: 5 }, (item, idx) => {
           return (
           <div
              key={idx}
           onClick={() => { setRate(idx + 1);
              }}
              style={{
              width: "40px",
              height: "40px",
              margin: "5px",
             marginTop: "20px",                   
             backgroundColor: rate < idx + 1 ? "#ddd" : "#ffeb3b",
              }}
          ></div>
          );
        })}
        <button>별점 매기기</button>
        </Dbox>
        <div>
            <input type="text" ref={text}/>
            <button onClick={addCommentList}>추가하기</button>
        </div>
        <ListStyle>
            {commentlist.map((list, index) => {
                return (
                <ItemStyle
                    className="list_item"
                    key={index}
                    >
                    {list}
                    <button onClick={delCommentList}>삭제하기</button>
                </ItemStyle>
                );
                })}
                
     </ListStyle>
            
        </div>
        
     
    )
}


const Dbox = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const ListStyle = styled.div`
display: flex;
flex-direction: column;
height: 100%;
overflow-x: hidden;
overflow-y: auto;
`;

const ItemStyle = styled.div`
padding: 16px;
margin: 8px;
background-color: aliceblue;
`;


export default Detail;



