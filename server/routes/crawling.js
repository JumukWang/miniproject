const express = require('express');
const router = express.Router();
const request = require('request');
const Main = require('../schemas/main');
const dotenv = require('dotenv');
dotenv.config();

const url = 'http://data.ex.co.kr/openapi/restinfo/restBestfoodList';
const KEY = '3217743800';
const TYPE = 'json';
const NUMOFROWS = 99; //총 4315개, 최대row 99 개, 44개 page

// let requestUrl = `${url}?key=${KEY}&type=${TYPE}&numOfRows=${NUMOFROWS}&pageNo=${pageNo}`

//* OpenAPI로 휴게소 음식점 정보 조회해서 DB에 저장해서 넣기

i = 0;

for (let pageNo = 1; pageNo < 45; pageNo++) {
  requestUrl = `${url}?key=${KEY}&type=${TYPE}&numOfRows=${NUMOFROWS}&pageNo=${pageNo}`;
  // console.log(requestUrl);
  request(requestUrl, async (err, response, body) => {
    if (err) throw Error(err);
    let data = JSON.parse(body);

    for (i in data['list']) {
      console.log('---------------------------');

      // console.log(data['list'][i]['seq'])
      console.log(data['list'][i]['foodNm'], data['list'][i]['stdRestNm']);

      let foodNm = data['list'][i]['foodNm'];
      let stdRestNm = data['list'][i]['stdRestNm'];

      await Main.create({ foodNm, stdRestNm });
    }

    // 콘솔로 확인. DB에 넣기
    // for (i in data['list']) {
    // console.log("음식이름 "+data['list'][i]['foodNm']);

    // stdRestCd = data['list'][i]['stdRestCd']; //휴게소코드
    // stdRestNm = data['list'][i]['stdRestNm']; //휴게소/주유소명
    // svarAddr = data['list'][i]['svarAddr']; //휴게소주소
    // foodId = data['list'][i]['stdRestCd'] + '_' + data['list'][i]['seq']; //음식id(휴게소코드_음식시퀀스)
    // seq = data['list'][i]['seq']; //음식 시퀀스
    // foodNm = data['list'][i]['foodNm']; //음식 이름
    // foodCost = data['list'][i]['foodCost'].replace(
    //     /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    //     ','
    // ); //음식 가격
    // recommendyn = data['list'][i]['recommendyn']; //추천메뉴 구분
    // bestfoodyn = data['list'][i]['bestfoodyn']; //베스트푸드 구분
    // etc = data['list'][i]['etc']; //상세내역
  });
}
