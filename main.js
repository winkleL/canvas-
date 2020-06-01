var ads=[
    '0D0100005E0DB3591241923143384738.jpg',
    '0D0100005E2EF493395059357930375A.jpg',
    '0D0100005E4DDCB31126293290574D55.jpg',
    '0D0100005E5DD1A639505936024C5356.jpg',
    '0D0100005E40CB833950593579383235.jpg',
    '0D0100005E254C951831383513533435.jpg',
    '0D0100005E4149B13950593579363944.jpg'

];
var videoEle=document.getElementById("video");
videoEle.addEventListener('canplaythrough',()=>{
    document.getElementById("totaltime").innerHTML=videoEle.duration;
    document.getElementById("currentTime").innerHTML=videoEle.currentTime;
});
videoEle.addEventListener('timeupdate',()=>{
    document.getElementById("currentTime").innerHTML=videoEle.currentTime;
    document.getElementById("progress").style.width=(videoEle.width*(videoEle.currentTime)/videoEle.duration)+'px';
});
videoEle.addEventListener('play',()=>{
    document.getElementById("ad").style.display='none';
});
videoEle.addEventListener('pause',()=>{
    var url=ads[Math.floor(Math.random()*ads.length)];
    document.getElementById('ad').getElementsByTagName('img')[0].src='resource/ad/'+url;
    document.getElementById("ad").style.display='block';
});
//空格也能控制播放
document.addEventListener('keydown',(e)=>{
    if(e.keyCode==32){
        playandstop();
    }
});

function playandstop(){
    var videoEle=document.getElementById("video");
    var btn=document.getElementById("btn1");
    videoEle.paused=!videoEle.paused;
    if(videoEle.paused){
        videoEle.play();
    }else{
        videoEle.pause();
    }
    //按钮失去焦点，不然空格不能控制播放
    btn.blur();
}
function increvol(){
    var videoEle=document.getElementById("video");
    console.log(videoEle.volume);
    if(videoEle.volume>0.99) return;
    videoEle.volume+=0.1;
}
function changePlayRate(speed){
    var videoEle=document.getElementById("video");
    videoEle.playbackRate=speed;
}
var canvasEle=document.getElementById("canvas");
var messages = [
    '身无彩凤双飞翼，心有灵犀一点通，那就叫彩凤吧',
    '纯元信用卡透支完毕',
    '左右都是哀家的皇孙，这波不亏',
    '这个剧情很好,谁可以剧透一下呀',
    '姐姐去刷个野~'
];
var ctx=canvasEle.getContext('2d');
var barrages=[];
messages.forEach((item)=>{
    var obj={};
    obj.text=item;
    obj.color='#666';
    obj.speed=Math.floor(Math.random() * 3)+2;
    obj.x=canvasEle.width-ctx.measureText(item.text).width;
    obj.size=Math.ceil(Math.random() * 15)+8+"px";
    obj.y=Math.floor(Math.random()*canvasEle.height);
    barrages.push(obj);
});
var timeID;
function draw(){
    ctx.clearRect(0,0,canvasEle.width,canvasEle.height);
    barrages.forEach((item)=>{
        ctx.fillStyle=item.color;
        ctx.fillText(item.text,item.x,item.y);
        //每次绘制时调整x坐标
        item.x-=item.speed;
        ctx.font=item.size+" Microsoft Yahei";
        //获取文本宽度，保证能走完
        if(item.x<-ctx.measureText(item.text).width){
            item.x=canvasEle.width;
            
        }
    });
    timeID=window.requestAnimationFrame(draw);
}

draw();
var isBarrage=true;//默认正在播放
function barrageToggle(){
    if(!isBarrage){
        canvasEle.style.visibility="visible";
        isBarrage=true;
    }else{
        canvasEle.style.visibility="hidden";
        isBarrage=false;
    }
}
function send(){
    var obj={};
    obj.text=document.getElementById("text").value;
    obj.color=document.getElementById("color").value;
    obj.speed=Math.ceil(Math.random()*3)+2;
    obj.x=750;
    obj.y=Math.floor(Math.random()*canvasEle.width);
    ctx.font=document.getElementById("size").value+" Microsoft Yahei";
    barrages.push(obj);
    //if(barrages.)
}