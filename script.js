"use strict";

// PDF保存
const script = document.createElement('script');

script.onload = () => {
    document.getElementById('btn-screenshot').addEventListener('click', () => {
    html2canvas(document.body).then((canvas) => {
        downloadImage(canvas.toDataURL());
    });
    });

    function downloadImage(dataUrl) {
    const name = 'approximate.png';
    const a = document.createElement('a');

    a.href = dataUrl;
    a.download = name;
    a.click();
    }
};

script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
document.body.appendChild(script);


// デフォルト小計・合計
window.addEventListener("load", defaultUnitPrice);
function defaultUnitPrice() {
    reCalc_base();
    subtotal_live = 0;
    subtotal_vod = 0;
    reCalc_total();
    reCalc_total_inTax();
    console.log(storageSize.value);
    console.log(maxAccount.value);
    console.log(streamingUse_vod.value);
    console.log(unitPrice_streamingUse_vod);
}

// エラーカウント
let error_status_live = true;
let error_status_vod = true;

////////////
// ベース //
//////////

// 月額利用料
const monthlyCost = document.getElementById('monthlyCost');
const monthlyCost_price = document.getElementById('monthlyCost_price');
let unitPrice_monthlyCost = 2200000;

monthlyCost.addEventListener('change', (event) => {
    unitPrice_monthlyCost = monthlyCost.value * 1100000;
    reCalc_base();

    // エラー表示    
    const streamingUse_vod_error = document.getElementById('streamingUse_vod_error');
    const streamingUse_vod_label = document.getElementById('streamingUse_vod_label');
    const streamingUse_vod_errorText = document.getElementById('streamingUse_vod_errorText');
    const footer_error = document.getElementById('footer_error');
    const error_mb = document.getElementById('error_mb');


    if(parseInt(monthlyCost.value) < parseInt(streamingUse_vod.value)){
        streamingUse_vod_errorText.hidden = false;
        streamingUse_vod_errorText.style.marginTop = '10px';
        streamingUse_vod.classList.add("error_select_s");
        streamingUse_vod_error.classList.add("error_content");
        streamingUse_vod_label.classList.remove("content_label");
        streamingUse_vod_label.style.fontWeight = "bold";
        footer_error.classList.add("footer_error");
        footer_error.textContent = 'エラー：赤字の項目を見直してください。';
        error_status_vod = false;

    } else {
        streamingUse_vod_errorText.hidden = true;
        streamingUse_vod.classList.remove("error_select_s");
        streamingUse_vod_error.classList.remove("error_content");
        streamingUse_vod_label.classList.add("content_label");
        error_status_vod = true;
    }

    if(vod_status === true && error_status_live === true && error_status_vod === true){
        footer_error.classList.remove("footer_error");
    }
});

// 最大登録アカウント数
const maxAccount = document.getElementById('maxAccount');
const maxAccount_price = document.getElementById('maxAccount_price');
let unitPrice_maxAccount = 550000;

maxAccount.addEventListener('change', (event) => {
    unitPrice_maxAccount = maxAccount.value * 110;
    unitPrice_streamingUse_vod = 22 * (storageSize.value * maxAccount.value) * streamingUse_vod.value;
    reCalc_base();

       // エラー表示
    const maxViewing_error = document.getElementById('maxViewing_error');
    const maxViewing_label = document.getElementById('maxViewing_label');
    const maxViewing_errorText = document.getElementById('maxViewing_errorText');
    const footer_error = document.getElementById('footer_error');
    const error_mb = document.getElementById('error_mb');
    const error_border = document.getElementById('error_border');

    if(live_status === true && parseInt(maxAccount.value) < parseInt(maxViewing.value)){
        maxViewing_errorText.hidden = false;
        maxViewing_errorText.style.marginTop = '10px';
        maxViewing.classList.add("error_select_s");
        maxViewing_error.classList.add("error_content");
        maxViewing_label.classList.remove("content_label");
        maxViewing_label.style.fontWeight = "bold";
        footer_error.classList.add("footer_error");
        footer_error.textContent = 'エラー：赤字の項目を見直してください。';
        error_status_live = false;
    } else {
        maxViewing_errorText.hidden = true;
        maxViewing.classList.remove("error_select_s");
        maxViewing_error.classList.remove("error_content");
        maxViewing_label.classList.add("content_label");
        error_status_live = true;
    }

    if(error_status_live === true && error_status_vod === true ){
        footer_error.classList.remove("footer_error");
        }    
});

// 追加管理者アカウント
const addHostAccount = document.getElementById('addHostAccount');
const addHostAccount_price = document.getElementById('addHostAccount_price');
let unitPrice_addHostAccount = 0;

addHostAccount.addEventListener('change', (event) => {
    unitPrice_addHostAccount = addHostAccount.value * 5500;
    reCalc_base();
});

// プロフィール情報（項目 1 含む）
const profile_off = document.getElementById('profile_off');
const profile_on = document.getElementById('profile_on');
const profile_price = document.getElementById('profile_price');
let unitPrice_profile = 0;

profile_off.addEventListener('click', function() {
    const status_profile = document.getElementById('status_profile');
    status_profile.classList.add("status"); 
    unitPrice_profile = 0;
    addProfile.disabled = true;
    addProfile.value = 0;
    unitPrice_addProfile = 0;
    reCalc_base();
});

profile_on.addEventListener('click', function() {
    const status_profile = document.getElementById('status_profile');
    status_profile.classList.remove("status");   
    unitPrice_profile = 55000;
    addProfile.disabled = false;
    reCalc_base();
});

const addProfile = document.getElementById('addProfile');
const addProfile_price = document.getElementById('addProfile_price');
let unitPrice_addProfile = 0;

// 追加プロフィール項目数
addProfile.addEventListener('change', (event) => {
    unitPrice_addProfile = addProfile.value * 5500;
    reCalc_base();
});

// メールアドレス制限
const mailLimit_off = document.getElementById('mailLimit_off');
const mailLimit_on = document.getElementById('mailLimit_on');
const mailLimit_price = document.getElementById('mailLimit_price');
let unitPrice_mailLimit = 0;

mailLimit_off.addEventListener('click', function() {
    unitPrice_mailLimit = 0;
    reCalc_base();
});

mailLimit_on.addEventListener('click', function() {
    unitPrice_mailLimit = 55000;
    reCalc_base();
});

// ログインの2段階認証
const login2step_off = document.getElementById('login2step_off');
const login2step_on = document.getElementById('login2step_on');
const login2step_price = document.getElementById('login2step_price');
let unitPrice_login2step = 0;

login2step_off.addEventListener('click', function() {
    const status_login2step = document.getElementById('status_login2step');
    status_login2step.classList.add("status");  
    unitPrice_login2step = 0;
    login2step_mail.checked = "checked";

    reCalc_base();
});

login2step_on.addEventListener('click', function() {
    const status_login2step = document.getElementById('status_login2step');
    status_login2step.classList.remove("status");       
    unitPrice_login2step = maxAccount.value *  (monthlyCost.value * 30 / 7 / 3 * 2) * 11;
    unitPrice_login2step = Math.round(unitPrice_login2step);
    reCalc_base();
});

login2step_mail.addEventListener('click', function() {
    unitPrice_login2step = maxAccount.value *  (monthlyCost.value * 30 / 7 / 3 * 2) * 11;
    unitPrice_login2step = Math.round(unitPrice_login2step);
    reCalc_base();
});

login2step_sms.addEventListener('click', function() {
    unitPrice_login2step = maxAccount.value *  (monthlyCost.value * 30 / 7 / 3 * 2) * 22;
    unitPrice_login2step = Math.round(unitPrice_login2step);
    reCalc_base();
});

login2step_mail_sms.addEventListener('click', function() {
    unitPrice_login2step = maxAccount.value * (monthlyCost.value * 30 / 7 / 3 * 2) * 33;
    unitPrice_login2step = Math.round(unitPrice_login2step);
    reCalc_base();
});

///////////////////
// 小計（ベース）////
// 再計算（ベース）//
//////////////////
let subtotal_base;
const subtotal_base_price = document.getElementById('subtotal_base_price');

function reCalc_base(){
    monthlyCost_price.innerHTML = `¥ ${unitPrice_monthlyCost.toLocaleString()}`;  
    maxAccount_price.innerHTML = `¥ ${unitPrice_maxAccount.toLocaleString()}`;
    addHostAccount_price.innerHTML = `¥ ${unitPrice_addHostAccount.toLocaleString()}`;
    profile_price.innerHTML = `¥ ${unitPrice_profile.toLocaleString()}`;  
    addProfile_price.innerHTML = `¥ ${unitPrice_addProfile.toLocaleString()}`;  
    mailLimit_price.innerHTML = `¥ ${unitPrice_mailLimit.toLocaleString()}`; 
    login2step_price.innerHTML = `¥ ${unitPrice_login2step.toLocaleString()}`;  

    subtotal_base = 
    unitPrice_monthlyCost +
    unitPrice_maxAccount +
    unitPrice_addHostAccount +
    unitPrice_profile +
    unitPrice_addProfile +
    unitPrice_mailLimit +
    unitPrice_login2step;
    subtotal_base_price.innerHTML = `¥ ${subtotal_base.toLocaleString()}`; 

    reCalc_total();
    reCalc_total_inTax();
};   

////////////
// ライブ //
//////////

// ライブ配信の利用
const liveHidden = document.getElementById('liveHidden');
let live_status = false;

live_off.addEventListener('click', function() {
    error_status_live = true;
    live_status = false;
    liveHidden.hidden = true;
    subtotal_live = 0;
    reCalc_total();
    reCalc_total_inTax();

    // エラー表示
    if(error_status_vod === true){
        footer_error.classList.remove("footer_error");
        }       
});

live_on.addEventListener('click', function() {
    live_status = true;
    liveHidden.hidden = false;  
    reCalc_live();

    // エラー表示
    if(live_status === true && parseInt(maxAccount.value) < parseInt(maxViewing.value)){
        maxViewing_errorText.hidden = false;
        maxViewing_errorText.style.marginTop = '10px';
        maxViewing.classList.add("error_select_s");
        maxViewing_error.classList.add("error_content");
        maxViewing_label.classList.remove("content_label");
        maxViewing_label.style.fontWeight = "bold";
        footer_error.classList.add("footer_error");
        footer_error.textContent = 'エラー：赤字の項目を見直してください。';
        error_status_live = false;
    } else {
        maxViewing_errorText.hidden = true;
        maxViewing.classList.remove("error_select_s");
        maxViewing_error.classList.remove("error_content");
        maxViewing_label.classList.add("content_label");
        error_status_live = true;
    }
});

// 新規配信作成費（ライブ）
const newStreamingCreate_live = document.getElementById('newStreamingCreate_live');
const newStreamingCreate_live_price = document.getElementById('newStreamingCreate_live_price');
let unitPrice_newStreamingCreate_live = 55000;

newStreamingCreate_live.addEventListener('change', (event) => {
    unitPrice_newStreamingCreate_live = newStreamingCreate_live.value * 55000;
    reCalc_live();
});

// 最大同時視聴者数
const maxViewing = document.getElementById('maxViewing');
const maxViewing_price = document.getElementById('maxViewing_price');
let unitPrice_maxViewing = 110 * maxViewing.value;

maxViewing.addEventListener('change', (event) => {
    unitPrice_maxViewing =  110 * maxViewing.value;
    unitPrice_streamingUse_live = 220 * streamingUse_live.value * maxViewing.value;
    reCalc_live();

    // エラー表示
    const maxViewing_error = document.getElementById('maxViewing_error');
    const maxViewing_label = document.getElementById('maxViewing_label');
    const maxViewing_errorText = document.getElementById('maxViewing_errorText');
    const footer_error = document.getElementById('footer_error');
    const error_mb = document.getElementById('error_mb');
    const error_border = document.getElementById('error_border');

    if(parseInt(maxAccount.value) < parseInt(maxViewing.value)){
        maxViewing_errorText.hidden = false;
        maxViewing_errorText.style.marginTop = '10px';
        maxViewing.classList.add("error_select_s");
        maxViewing_error.classList.add("error_content");
        maxViewing_label.classList.remove("content_label");
        maxViewing_label.style.fontWeight = "bold";
        footer_error.classList.add("footer_error");
        footer_error.textContent = 'エラー：赤字の項目を見直してください。';
        error_status_live = false;

        } else {
        maxViewing_errorText.hidden = true;
        maxViewing.classList.remove("error_select_s");
        maxViewing_error.classList.remove("error_content");
        maxViewing_label.classList.add("content_label");
        error_status_live = true;
    }

    if(live_status === true && error_status_live === true && error_status_vod === true){
        footer_error.classList.remove("footer_error");
    }
});

// 配信利用料（ライブ配信本番期間）
const streamingUse_live = document.getElementById('streamingUse_live');
const streamingUse_live_price = document.getElementById('streamingUse_live_price');
let unitPrice_streamingUse_live = 220 * streamingUse_live.value * maxViewing.value;

streamingUse_live.addEventListener('change', (event) => {
    unitPrice_streamingUse_live = 220 * streamingUse_live.value * maxViewing.value;
    reCalc_live();
});

// ウォーターマーク（ライブ配信）
const watermark_live_off = document.getElementById('watermark_live_off');
const watermark_live_on = document.getElementById('watermark_live_on');
const watermark_live_price = document.getElementById('watermark_live_price');
let unitPrice_watermark_live = 0;

watermark_live_off.addEventListener('click', function() {
    unitPrice_watermark_live = 0;
    reCalc_live();
});

watermark_live_on.addEventListener('click', function() {
    unitPrice_watermark_live = 55000;
    reCalc_live();
});

// インフォメーション・メッセージ
const informationMessage_off = document.getElementById('informationMessage_off');
const informationMessage_on = document.getElementById('informationMessage_on');
const informationMessage_price = document.getElementById('informationMessage_price');
let unitPrice_informationMessage = 0;

informationMessage_off.addEventListener('click', function() {
    unitPrice_informationMessage = 0;
    reCalc_live();
});

informationMessage_on.addEventListener('click', function() {
    unitPrice_informationMessage = 55000;
    reCalc_live();
});

// サブ・チャンネル
const subChannel_off = document.getElementById('subChannel_off');
const subChannel_on = document.getElementById('subChannel_on');
const subChannel_price = document.getElementById('subChannel_price');
let unitPrice_subChannel = 0;

subChannel_off.addEventListener('click', function() {
    unitPrice_subChannel = 0;
    reCalc_live();
});

subChannel_on.addEventListener('click', function() {
    unitPrice_subChannel = 55000;
    reCalc_live();
});

// プレイヤー右側エリア
const rightArea_off = document.getElementById('rightArea_off');
const chat_on = document.getElementById('chat_on');
const sparkup_on = document.getElementById('sparkup_on');
const rightArea_price = document.getElementById('rightArea_price');

let unitPrice_rightArea = 0;

rightArea_off.addEventListener('click', function() {
    unitPrice_rightArea = 0;
    reCalc_live();
});

chat_on.addEventListener('click', function() {
    unitPrice_rightArea = 55000;
    reCalc_live();
});

sparkup_on.addEventListener('click', function() {
    unitPrice_rightArea = 550000;
    reCalc_live();    
});

///////////////////
// 小計（ライブ）////
// 再計算（ライブ）//
//////////////////
let subtotal_live;
const subtotal_live_price = document.getElementById('subtotal_live_price');

function reCalc_live(){
    newStreamingCreate_live_price.innerHTML = `¥ ${unitPrice_newStreamingCreate_live.toLocaleString()}`;  
    maxViewing_price.innerHTML = `¥ ${unitPrice_maxViewing.toLocaleString()}`;   
    streamingUse_live_price.innerHTML = `¥ ${unitPrice_streamingUse_live.toLocaleString()}`; 
    watermark_live_price.innerHTML = `¥ ${unitPrice_watermark_live.toLocaleString()}`; 
    informationMessage_price.innerHTML = `¥ ${unitPrice_informationMessage.toLocaleString()}`; 
    subChannel_price.innerHTML = `¥ ${unitPrice_subChannel.toLocaleString()}`; 
    rightArea_price.innerHTML = `¥ ${unitPrice_rightArea.toLocaleString()}`; 

    subtotal_live = 
    unitPrice_newStreamingCreate_live +
    unitPrice_maxViewing +
    unitPrice_streamingUse_live +
    unitPrice_watermark_live +
    unitPrice_informationMessage +
    unitPrice_subChannel +
    unitPrice_rightArea;
    subtotal_live_price.innerHTML = `¥ ${subtotal_live.toLocaleString()}`; 

    reCalc_total();
    reCalc_total_inTax();
};  


/////////////////
// オンデマンド //
///////////////

// オンデマンド配信の利用
const vodHidden = document.getElementById('vodHidden');
let vod_status = false;

vod_off.addEventListener('click', function() {
    error_status_vod = true;
    vod_status = false;
    vodHidden.hidden = true;
    subtotal_vod_price.innerHTML = `¥ ${subtotal_vod.toLocaleString()}`; 
    subtotal_vod = 0;
    reCalc_total();
    reCalc_total_inTax();

    // エラー表示
    if(error_status_live === true){
        footer_error.classList.remove("footer_error");
        }     
    
});

vod_on.addEventListener('click', function() {
    vod_status = true;
    vodHidden.hidden = false;  
    reCalc_vod();

    // エラー表示
    if(vod_status === true && parseInt(monthlyCost.value) < parseInt(streamingUse_vod.value)){
        streamingUse_vod_errorText.hidden = false;
        streamingUse_vod_errorText.style.marginTop = '10px';
        streamingUse_vod.classList.add("error_select_s");
        streamingUse_vod_error.classList.add("error_content");
        streamingUse_vod_label.classList.remove("content_label");
        streamingUse_vod_label.style.fontWeight = "bold";
        footer_error.classList.add("footer_error");
        footer_error.textContent = 'エラー：赤字の項目を見直してください。';
        error_status_vod = false;
    } else {
        streamingUse_vod_errorText.hidden = true;
        streamingUse_vod.classList.remove("error_select_s");
        streamingUse_vod_error.classList.remove("error_content");
        streamingUse_vod_label.classList.add("content_label");
        error_status_vod = true;
    }
});

// 新規配信作成費（オンデマンド）
const newStreamingCreate_vod = document.getElementById('newStreamingCreate_vod');
const newStreamingCreate_vod_price = document.getElementById('newStreamingCreate_vod_price');
let unitPrice_newStreamingCreate_vod = 55000;

newStreamingCreate_vod.addEventListener('change', (event) => {
    unitPrice_newStreamingCreate_vod = newStreamingCreate_vod.value * 55000;
    reCalc_vod();    
});

// ストレージサイズ
const storageSize = document.getElementById('storageSize');
storageSize.addEventListener('change', (event) => {
    unitPrice_streamingUse_vod = 22 * (storageSize.value * maxAccount.value) * streamingUse_vod.value;
    reCalc_vod();    
});

// 配信利用料（オンデマンド配信期間））
const streamingUse_vod = document.getElementById('streamingUse_vod');
const streamingUse_vod_price = document.getElementById('streamingUse_vod_price');
let unitPrice_streamingUse_vod = 22 * (storageSize.value * maxAccount.value) * streamingUse_vod.value;

streamingUse_vod.addEventListener('change', (event) => {
    unitPrice_streamingUse_vod = 22 * (storageSize.value * maxAccount.value) * streamingUse_vod.value;
    reCalc_vod();    


    // エラー表示    
    const streamingUse_vod_error = document.getElementById('streamingUse_vod_error');
    const streamingUse_vod_label = document.getElementById('streamingUse_vod_label');
    const streamingUse_vod_errorText = document.getElementById('streamingUse_vod_errorText');
    const footer_error = document.getElementById('footer_error');
    const error_mb = document.getElementById('error_mb');

    if(parseInt(monthlyCost.value) < parseInt(streamingUse_vod.value)){
        streamingUse_vod_errorText.hidden = false;
        streamingUse_vod_errorText.style.marginTop = '10px';
        streamingUse_vod.classList.add("error_select_s");
        streamingUse_vod_error.classList.add("error_content");
        streamingUse_vod_label.classList.remove("content_label");
        streamingUse_vod_label.style.fontWeight = "bold";
        footer_error.classList.add("footer_error");
        footer_error.textContent = 'エラー：赤字の項目を見直してください。';
        error_status_vod = false;
    } else {
        streamingUse_vod_errorText.hidden = true;
        streamingUse_vod.classList.remove("error_select_s");
        streamingUse_vod_error.classList.remove("error_content");
        streamingUse_vod_label.classList.add("content_label");
        error_status_vod = true;
    }

    if(error_status_live === true && error_status_vod === true ){
        footer_error.classList.remove("footer_error");
        }    
        
});


// ウォーターマーク（オンデマンド配信）
const watermark_vod_off = document.getElementById('watermark_vod_off');
const watermark_vod_on = document.getElementById('watermark_vod_on');
const watermark_vod_price = document.getElementById('watermark_vod_price');
let unitPrice_watermark_vod = 0;

watermark_vod_off.addEventListener('click', function() {
    unitPrice_watermark_vod = 0;
    reCalc_vod();
});

watermark_vod_on.addEventListener('click', function() {
    unitPrice_watermark_vod = 55000;
    reCalc_vod();
    reCalc_total();
});


/////////////////////////
// 小計（オンデマンド）////
// 再計算（オンデマンド）//
//////////////////////
let subtotal_vod;
const subtotal_vod_price = document.getElementById('subtotal_vod_price');

function reCalc_vod(){
    newStreamingCreate_vod_price.innerHTML = `¥ ${unitPrice_newStreamingCreate_vod.toLocaleString()}`;  
    streamingUse_vod_price.innerHTML = `¥ ${unitPrice_streamingUse_vod.toLocaleString()}`; 
    watermark_vod_price.innerHTML = `¥ ${unitPrice_watermark_vod.toLocaleString()}`; 

    subtotal_vod = 
    unitPrice_newStreamingCreate_vod +
    unitPrice_streamingUse_vod +
    unitPrice_watermark_vod;
    subtotal_vod_price.innerHTML = `¥ ${subtotal_vod.toLocaleString()}`; 

    reCalc_total();
    reCalc_total_inTax();
};  



////////////////
// 合計/////////
// 合計（税込）//
///////////////
let total;
let total_inTax;

function reCalc_total(){
    total = subtotal_base + subtotal_live + subtotal_vod ;
    total_price.innerHTML = `¥ ${total.toLocaleString()}`;     
};  

function reCalc_total_inTax(){
    total_inTax = total * 1.10;
    total_price_inTax.innerHTML = `¥ ${total_inTax.toLocaleString()}`; 
};  
