'use strict';
//既存情報の読み込みを行います
const BASE_CHAR_BUTTON = document.getElementById('base_char_select_button');
const ADD_CARD_INPUT = document.getElementById('add_card_input');
const ADD_CARD_BUTTON = document.getElementById('add_card_button');
const CARD_LIST = document.getElementById('card_list');
const CARD_TITLE = document.getElementById('title');
const CARD_LIST_NAME = document.getElementById('card_name');
const CARD_LIST_COUNT = document.getElementById('maisu');

CARD_TITLE.style.backgroundColor = 'dimgrey';




//初期デッキの決定ボタンの挙動
BASE_CHAR_BUTTON.addEventListener('click', ()=>{
      // 初期カードの配列を作ります
    const ST_CARD = {
     NOA: 'ストライク', NOB: '防御',
     NO_AR1: '強撃', 
     NO_SI1: '無力化', NO_SI2: 'サバイバー', 
     NO_DE1: '消去プログラム', NO_DE2: '二連開放',
     NO_WA1: '噴火', NO_WA2: '警戒',
    };
    const AR_ST = [];
    const SI_ST = [];
    const DE_ST = [];
    const WA_ST = [];
    // 関数を設定します。()内で枚数、追加するデッキ、追加するカードを指定
    function ST_DECK_CRT(CNT, CHARCT, CRADNO){
      for (let Co = 0; Co < CNT; Co += 1) {
        CHARCT.push(CRADNO);
       };
    };
    ST_DECK_CRT(5, AR_ST, ST_CARD.NOA);
    ST_DECK_CRT(4, AR_ST, ST_CARD.NOB);
    ST_DECK_CRT(1, AR_ST, ST_CARD.NO_AR1);

    ST_DECK_CRT(5, SI_ST, ST_CARD.NOA);
    ST_DECK_CRT(5, SI_ST, ST_CARD.NOB);
    ST_DECK_CRT(1, SI_ST, ST_CARD.NO_SI1);
    ST_DECK_CRT(1, SI_ST, ST_CARD.NO_SI2);

    ST_DECK_CRT(4, DE_ST, ST_CARD.NOA);
    ST_DECK_CRT(4, DE_ST, ST_CARD.NOB);
    ST_DECK_CRT(1, DE_ST, ST_CARD.NO_DE1);
    ST_DECK_CRT(1, DE_ST, ST_CARD.NO_DE2);  

    ST_DECK_CRT(4, WA_ST, ST_CARD.NOA);
    ST_DECK_CRT(4, WA_ST, ST_CARD.NOB);
    ST_DECK_CRT(1, WA_ST, ST_CARD.NO_WA1);
    ST_DECK_CRT(1, WA_ST, ST_CARD.NO_WA2);
    const CHA_ = document.querySelector('select');
    function OUTPUT(decklist){
        for(let t = 0; t < decklist.length; t +=1){
        ADD_CARD(decklist[t]);
        }
    }
    //名前欄の色を変える
    CHA_.value == 'ar' && (OUTPUT(AR_ST), CARD_TITLE.style.backgroundColor = 'maroon');
    CHA_.value == 'si' && (OUTPUT(SI_ST), CARD_TITLE.style.backgroundColor = 'green');
    CHA_.value == 'de' && (OUTPUT(DE_ST), CARD_TITLE.style.backgroundColor = 'navy');
    CHA_.value == 'wa' && (OUTPUT(WA_ST), CARD_TITLE.style.backgroundColor = 'purple');
})
//追加カードの決定ボタンの挙動
ADD_CARD_BUTTON.addEventListener('click', ()=>{
    if(ADD_CARD_INPUT.value ==''){
        alert('カード名を入れてください');
        }else{ADD_CARD(ADD_CARD_INPUT.value)};
});
//テキストボックスでエンターを押したときの挙動
ADD_CARD_INPUT.addEventListener('keydown', (KeyPress)=>{
    if(KeyPress.key =='Enter'){
        if(ADD_CARD_INPUT.value ==''){
            alert('カード名を入れてください');
           }else{ADD_CARD(ADD_CARD_INPUT.value)};
    }
});
//カードが追加される時の動き
//CN：追加するカードの名前
function ADD_CARD(CN){
    //カード名の項目
    //入力されたカード名と同じ名前のカードがリストに存在する場合、枚数に+1して処理を中断する
    const CHECK_NAME_LIST = document.getElementsByClassName('card_name');
    for(let i=0; i < CHECK_NAME_LIST.length; i +=1){
        if(CHECK_NAME_LIST[i].textContent ==CN){
            const CHECK_COUNT_LIST = document.getElementsByClassName('card_count')[i];
            ++CHECK_COUNT_LIST.textContent;
            //入力フォームのリセット
            ADD_CARD_INPUT.value ='';
            return false;//中断
        }
    }

    //列を作成してカードリストに付属させる
    const tr = document.createElement('tr');
    tr.className = 'CL_tr';
    CARD_LIST.appendChild(tr);
    //カード位置の入れ替え
    //１：カードリストにある既存カード中、+がついているモノがインプットされたらその後ろに挿入
    //２：カードリストにある既存カード中、+がついていないモノがインプットされたらその前に挿入
    const tr_list= document.getElementsByClassName('CL_tr');
    for(let i=0; i < CHECK_NAME_LIST.length; i +=1){
        if(CHECK_NAME_LIST[i].textContent+'+' ==CN){
           CARD_LIST.insertBefore(tr,tr_list[i+1]);//どこになにをどの前に
        }
        const INP = CN;
        const TEXTMAP = CHECK_NAME_LIST[i].textContent;
        const MAP = Array.prototype.map;
        const newName = MAP.call(TEXTMAP, eachLetter => {
        return eachLetter;
        })
        const newName_INP = MAP.call(INP, eachLetter => {
        return eachLetter;
        })
        newName.pop();
        if(newName.toString() == newName_INP.toString() ){
            CARD_LIST.insertBefore(tr,tr_list[i]);//どこになにをどの前に
        } 
    }

    //カード名
    const td1 = document.createElement('td');
    td1.className = 'card_name';
    td1.textContent = CN;
    tr.appendChild(td1);
    //カード名に+が入ってる場合に色を変える記述
    const INP_Name= CN;
    for(const INP_Name_search of INP_Name){
        INP_Name_search == '+' && (td1.style.backgroundColor='lightgreen');
       }
    //枚数
    const td2 = document.createElement('td');
    td2.className = 'card_count';
    td2.textContent = 1;
    tr.appendChild(td2);

    //アップグレードボタン
    const td3 = document.createElement('td');
    td3.className = 'td_upg_btn';
     const upg_btn = document.createElement('button');
     upg_btn.className = 'upg_btn';
     upg_btn.textContent = 'アップグレード';
     td3.appendChild(upg_btn);
    tr.appendChild(td3);
    //アップグレードボタンの挙動
    const upg_btn_list = document.getElementsByClassName('upg_btn');
    for(let i=0; i < CHECK_NAME_LIST.length; i +=1){
        for(let h=0; h < upg_btn_list.length; h +=1){
            if(i == h){
            const UPG_BTN_CLICK = upg_btn_list[h];
            UPG_BTN_CLICK.addEventListener('click', UPG_CARD);
            }
        }
    }
    //削除ボタン
    const td4 = document.createElement('td');
    td4.className = 'td_del_btn';
     const del_btn = document.createElement('button');
     del_btn.className = 'del_btn';
     del_btn.textContent = '削除';
     td4.appendChild(del_btn);
    tr.appendChild(td4);
    //削除ボタンの挙動
    const del_btn_list = document.getElementsByClassName('del_btn');
    for(let i=0; i < CHECK_NAME_LIST.length; i +=1){
        for(let h=0; h < del_btn_list.length; h +=1){
            if(i == h){
            const DEL_BTN_CLICK = del_btn_list[h];
            DEL_BTN_CLICK.addEventListener('click', DEL_CARD);
            }
        }
    }
    //入力フォームのリセット
    ADD_CARD_INPUT.value ='';
    

}


//削除ボタンが押された時の挙動
//trのリスト、枚数リスト、削除ボタンのリストをhtmlコレクションで取得
//削除ボタンの配列を展開して、thisで照合
//合致したi番目のtrと枚数の部分に変更を加える

function DEL_CARD(){
    const tr_list= document.getElementsByClassName('CL_tr');
    const card_count_list = document.getElementsByClassName('card_count');
    const del_btn_list = document.getElementsByClassName('del_btn');
    for(let i = 0; i < del_btn_list.length; i +=1){
        if(del_btn_list[i] == this){
            --card_count_list[i].textContent;
            card_count_list[i].textContent <= 0 &&(tr_list[i].remove());
        }
    }
}

//アップグレードボタンが押された時の挙動
function UPG_CARD(){
    const tr_list= document.getElementsByClassName('CL_tr');
    const card_name_list = document.getElementsByClassName('card_name');
    const card_count_list = document.getElementsByClassName('card_count');
    const upg_btn_list = document.getElementsByClassName('upg_btn');
    for(let i = 0; i < upg_btn_list.length; i +=1){
        if(upg_btn_list[i] == this){
            ADD_CARD(card_name_list[i].textContent+'+');
            --card_count_list[i].textContent;
            card_count_list[i].textContent <= 0 &&(tr_list[i].remove());
        }
    }
}

//総枚数確認ボタン（仮）
const ALL_COUNT = document.getElementById(`card_all_count`);
ALL_COUNT.addEventListener('click', ()=>{
    const card_count_list = document.getElementsByClassName('card_count');
    let output_nanmai = 0
    for(const arr of card_count_list){
        output_nanmai -= arr.textContent*-1;
    console.log(arr.textContent);
    }
    ALL_COUNT.textContent = output_nanmai;
})
