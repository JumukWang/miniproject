const express = require("express");
const router = express.Router();
const request = require("request");
const Main = require("../schemas/main");
const dotenv = require("dotenv"); 
dotenv.config();


const url = 'http://data.ex.co.kr/openapi/restinfo/restBestfoodList'
const KEY = process.env.KEY;
const TYPE = 'json';
const NUMOFROWS=99; //총 4315개, 최대row 99 개, 44개 page

// let pageNo=1;

let isInsert= false;
// let requestUrl = `${url}?key=${KEY}&type=${TYPE}&numOfRows=${NUMOFROWS}&pageNo=${pageNo}`

//* OpenAPI로 휴게소 음식점 정보 조회해서 DB에 저장해서 넣기 
if(isInsert) {
    for (let pageNo=1;pageNo<45;pageNo++){
        requestUrl = `${url}?key=${KEY}&type=${TYPE}&numOfRows=${NUMOFROWS}&pageNo=${pageNo}`
        console.log(requestUrl);
        request(requestUrl, async(err, response, body) => {
            if(err) throw Error(err);
            let info = JSON.parse(body)
        
            // console.log(info['list']);
        
            let stdRestCd = '' //휴게소코드
            let stdRestNm = '' //휴게소/주유소명
            let svarAddr = '' //휴게소주소
            let routeCd = '' //노선코드
            let routeNm = '' //노선명
            let seq ='' //음식 시퀀스
            let foodNm ='' //음식 이름
            let foodImg ='' //음식 사진
            let foodCost =''    //음식 가격
            let recommendyn ='' //추천메뉴 구분
            let bestfoodyn =''  //베스트푸드 구분
            let etc ='' //상세내역
            let likeNum=0;    //좋아요수
            let commentNum=0;    //커멘트수
            let score=0;    //종합평가 점수
        
            // 콘솔로 확인. DB에 넣기
            for (i in info['list']) {
                // console.log("음식이름 "+info['list'][i]['foodNm']);

                stdRestCd = info['list'][i]['stdRestCd'] //휴게소코드
                stdRestNm = info['list'][i]['stdRestNm'] //휴게소/주유소명
                svarAddr = info['list'][i]['svarAddr'] //휴게소주소
                routeCd = info['list'][i]['routeCd'] //노선코드
                routeNm = info['list'][i]['routeNm'] //노선명
                foodId = info['list'][i]['stdRestCd'] +"_"+info['list'][i]['seq']   //음식id(휴게소코드_음식시퀀스)
                seq =info['list'][i]['seq'] //음식 시퀀스
                foodNm =info['list'][i]['foodNm']//음식 이름
                foodCost =info['list'][i]['foodCost'].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");    //음식 가격
                recommendyn =info['list'][i]['recommendyn'] //추천메뉴 구분
                bestfoodyn =info['list'][i]['bestfoodyn']  //베스트푸드 구분
                etc =info['list'][i]['etc'] //상세내역

                const createMenu = await Main.create ({
                    stdRestCd,
                    stdRestNm,
                    svarAddr,
                    routeCd,
                    routeNm,
                    foodId,
                    seq,
                    foodNm,
                    foodCost,
                    recommendyn,
                    bestfoodyn,
                    etc, 
                    likeNum,
                    commentNum,
                    score,  
                });
     
            }                       
        });
        console.log(pageNo);
    }
    isInsert=true;
}

// main화면 조회 (좋아요 수, comment 수)
router.get("/main", async (req, res, next) => {
    const mains = await Main.find();
    mains.sort((a,b)=> (a.routeCd > b.routeCd) ? 1: -1)  //노선코드 오름차순으로
    // console.log(mains);
    res.json({ 
        list : mains.map((main) => {
            return {
                stdRestCd: main.stdRestCd, //휴게소코드
                stdRestNm: main.stdRestNm, //휴게소/주유소명
                routeCd: main.routeCd, //노선코드
                routeNm: main.routeNm, //노선명
                foodId: main.foodId, //음식 id (pk)
                seq: main.seq, //음식 시퀀스
                foodNm: main.foodNm, //음식 이름
                foodCost: main.foodCost, //음식 가격
                foodImg : main.foodImg, // 음식img url
            }
        })
    });
});



module.exports = router;