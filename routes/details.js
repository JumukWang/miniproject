const express = require("express");
const router = express.Router();
const request = require("request");
const Main = require("../schemas/main");
const dotenv = require("dotenv"); 
dotenv.config();


// * 상세 페이지 접속

router.get('/detail/:foodId', async function (req, res) {
    const { foodId } = req.params;
    const mains = await Main.findOne({foodId});
    res.json ({
        detail: 
        {
                foodID: mains.foodID,
                stdRestCd : mains.stdRestCd, //휴게소코드
                stdRestNm : mains.stdRestNm,//휴게소/주유소명
                svarAddr : mains.svarAddr,//휴게소주소
                routeCd : mains.routeCd,//노선코드
                routeNm : mains.routeNm,//노선명
                seq : mains.seq,//음식 시퀀스
                foodNm : mains.foodNm,//음식 이름
                foodCost : mains.foodCost,//음식 가격
                foodImg: mains.foodImg,// 음식url
                ecommendyn : mains.ecommendyn, //추천메뉴 구분
                bestfoodyn : mains.bestfoodyn,//베스트푸드 구분
                etc : mains.etc,//상세내역

                likeNum : mains.likeNum,//좋아요수
                commentNum : mains.commentNum ,//커멘트수
                score : mains.score,//종합평가 점수
        }
    })
});


module.exports = router;