const mongoose = require("mongoose");

const mainSchema = mongoose.Schema({
    stdRestCd: {    //휴게소코드
        type: String,
        required: true,
    },

    stdRestNm: {    //휴게소/주유소명
        type: String,
        required: true,
    },
    
    svarAddr: {     //휴게소주소
        type: String,
    },

    routeCd: {    //노선코드
        type: String,
        required: true,
    },

    routeNm: {    //노선명
        type: String,
        required: true,
    },

    foodId: {    //음식Id
        type: String,
        required: true,
        unique: true,
    },

    seq: {    //음식 시퀀스
        type: String,
        required: true,
    },

    foodNm: {    //음식 이름
        type: String,
        required: true,
    },

    foodImg: {    //음식 사진
        type: String,
    },

    foodCost: {    //음식 가격
        type: String,
    },

    recommendyn: {    //추천메뉴 구분
        type: String,
    },

    bestfoodyn: {    //베스트푸드 구분
        type: String,
    },

    etc: {    //상세내역
        type: String,
    },

    firstTime : {   //첫등록시간
        type : Date,
        required : true,
        default: Date.now
    },

    lastTime : {   //마지막 수정시간
        type : Date,
        required : true,
        default: Date.now
    },

    likeNum : {   //좋아요수
        type : Number,
    },

    commentNum : {   //커멘트수
        type : Number,
    },

    score : {   //종합평가 점수
        type : Number,
    },

});


module.exports = mongoose.model("Main", mainSchema);