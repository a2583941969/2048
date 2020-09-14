//创建一个对象保存数据

window.onload=function(){
   var game={
      data:[
      ],//存放格子里的数据
       score:0,//分数
       status:1,//定义游戏状态，可以玩的时候为1
       gameover:0,//游戏结束时为0
       status_game:1,//当前游戏状态
       numColor:function(n,div){
        switch(n){
            case 2:
               div.style.background = "#F5F5DC";
               div.style.color="#666"
               break;
            case 4:
               div.style.background = "#F5DEB3";
               div.style.color="#666"
               break;
            case 8:
               div.style.background = "#F4A460";
               break;
            case 16:
               div.style.background = "#EE7942";
               break;
            case 32:
               div.style.background = "#CD6839";
               break;
            case 64:
               div.style.background = "#D2691E";
               break;
            case 128:
               div.style.background = "#EEEE00";
                break;
            case 256:
               div.style.background = "#EEC900";
               break;
            case 512:
               div.style.background = "#CD950C";
               break;
            case 1024:
               div.style.background = "#FFA500";
               break;
            case 2048:
               div.style.background = "#FF4500";
               break;
               case 4096:
                  div.style.background = "#FF0000";
                  break;
                  case 8192:
                     div.style.background = "#8B1A1A";
                     break;
                  }
       }, //数字的背景色
       
       randomNum:function(){//生成随机数函数
         // console.log(this.data)
         for(;;){//循环，生成完成停止循环
            var r = Math.floor(Math.random()*4);//生成行
            var c = Math.floor(Math.random()*4);//生成列
            // console.log(1)
            if(this.data[r][c]===0){
               var num = Math.random()>0.5? 2:4;//随机生成2或4
               this.data[r][c] = num;
               return [r,c,num];
            }
         }
      },
   };
   // 开始游戏的函数
   function startGame(){
      game.status_game = game.status;//游戏开始时状态等于可玩状态
      game.score = 0;//游戏开始时分数清零
      game.data = [
         [0,0,0,0,],
         [0,0,0,0,],
         [0,0,0,0,],
         [0,0,0,0,]
      ];
      var arr=game.randomNum();
      for(var i=0;i<4;i++){
         for (let j = 0; j < 4; j++) {
            // 执行判断前先清0
            var div=document.getElementById("gridNum"+i+j);
            div.innerHTML = "";
            div.style.background="rgb(179, 143, 64)";
            if(i ==arr[0] && j==arr[1]){
               div.innerHTML = arr[2];
               game.numColor(arr[2],div);
            }
         }
      }
      console.log(game.data)
   }
   let newgame=document.getElementById("newgame");
// 给newgame绑定点击事件
   newgame.onclick=startGame;
// 
   var keydown=function(){

      var random_arr=game.randomNum();
      for(var i=0;i<4;i++){
         for (let j=0;j<4; j++) {
            var div=document.getElementById("gridNum"+i+j);
            div.innerHTML = "";
            div.style.background="rgb(179, 143, 64)";

            if(game.data[i][j]!==0){
               var num=document.getElementById("gridNum"+i+j);
               num.innerHTML=game.data[i][j];
               game.numColor(game.data[i][j],div);
            }
            if(i == random_arr[0] && j==random_arr[1]){
               var div=document.getElementById("gridNum"+i+j);
               // setTimeout(function(){ 
                  div.innerHTML = random_arr[2];
                  game.numColor(random_arr[2],div);
               // },1000 );
            }                  
         }
      }
   }
// 左移函数
   function leftmove(){
      var arr=game.data;
      var span=document.getElementById("score");
      for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
          if(arr[i][0] == 0){
            arr[i].splice(0,1);
            arr[i].push(0);
          }
          else if(arr[i][j] == 0 ){
            arr[i].splice(j,1);
            arr[i].push(0);
          }
          else if(arr[i][j-1] == 0){
            arr[i].splice(j-1,1);
            arr[i].push(0);
          }
        }
      }
      for(let m=0;m<4;m++){
        for(let n=0;n<4;n++){
          if(arr[m][n]==arr[m][n+1]){
             arr[m][n] *=2;
             arr[m].splice(n+1,1);
             arr[m].push(0);
             game.score += arr[m][n];
             span.innerHTML=game.score
          }
        }
      }
    }
// 上移函数
   function topmove(){
      var arr=game.data;
      var span=document.getElementById("score");
      // 上边的元素为0 且该元素不是最上面的数字  最下面一列元素上移后  原下标位置上的数为0
      function move(){
        for(let i=3;i>0;i--){
          for(let j=0;j<4;j++){
            if(arr[i-1][j] == 0){
              arr[i-1][j]=arr[i][j];
              arr[i][j]=0;
            }
          }
        }
        for(let i=1;i<4;i++){
          for(let j=0;j<4;j++){
            if(arr[i-1][j] == 0){
              arr[i-1][j]=arr[i][j];
              arr[i][j]=0;
            }
          }
        }
        for(let i=3;i>0;i--){
         for(let j=0;j<4;j++){
           if(arr[i-1][j] == 0){
             arr[i-1][j]=arr[i][j];
             arr[i][j]=0;
           }
         }
       }
      }
      move();
      for(let m=1;m<4;m++){
        for(let n=0;n<4;n++){
          if(arr[m][n] == arr[m-1][n]){
            arr[m-1][n] *=2;
            arr[m][n]=0;
            game.score += arr[m-1][n];
            span.innerHTML=game.score
          }
        }
      }
      move();
   }
// 右移函数f
   function rightmove(){
      var arr=game.data;
      var span=document.getElementById("score");
     // 左边位置上的元素为0  且该元素不是最左边的数字,最右边的数字如果左移后，原下标的数字=0
     for(var i=0;i<4;i++){
       for(var j=0;j<4;j++){
         if(arr[i][3] == 0){
           arr[i].splice(3,1);
           arr[i].unshift(0);
         }
         else if(arr[i][j] == 0 ){
           arr[i].splice(j,1);
           arr[i].unshift(0);
         }
         else if(arr[i][j+1] == 0){
           arr[i].splice(j+1,1);
           arr[i].unshift(0);
         }
       }
     }
     for(let m=0;m<4;m++){
       for(let n=3;n>0;n--){
         if(arr[m][n]==arr[m][n-1]){
           arr[m][n] *=2;
           arr[m].splice(n-1,1);
           arr[m].unshift(0);
           game.score += arr[m][n];
           span.innerHTML=game.score;
         }
       }
     }

   }
   // 下移函数
   function bottom_move(){
      var arr=game.data;
      var span=document.getElementById("score");
      function move(){
        for(let i=3;i>0;i--){
          for(let j=0;j<4;j++){
            if(arr[i][j] == 0){
              arr[i][j]=arr[i-1][j];
              arr[i-1][j]=0;
            }
          }
        }
        for(let m=0;m<3;m++){
          for(let n=0;n<4;n++){
            if(arr[m+1][n]==0 ){
              arr[m+1][n]=arr[m][n];
              arr[m][n]=0;
            }
          }
        }

        for(let i=3;i>0;i--){
          for(let j=0;j<4;j++){
            if(arr[i][j] == 0){
              arr[i][j]=arr[i-1][j];
              arr[i-1][j]=0;
            }
          }
        }
      }
      move();
      for(let m=2;m>=0;m--){
        for(let n=0;n<4;n++){
          if(arr[m+1][n] == arr[m][n]){
            arr[m+1][n] *=2;
            arr[m][n]=0;
            game.score += arr[m+1][n];
            span.innerHTML=game.score
          }
        }
      }
      move();

    }
    // 判断是否游戏结束的函数
   var gameover=function(){
      
   }
   document.onkeydown=function(event){
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if(e&&e.keyCode==37){//左    game.data[x][y]  y-1
         leftmove();
         keydown();
      }
      if(e&&e.keyCode==38){//上  game.data[x][y]   x-1
         topmove();
         keydown();
      }
      if( e&&e.keyCode==39){//右  game.data[x][y]   y+1
         rightmove();
         keydown();
      }
      if(e&&e.keyCode==40 ){//下  game.data[x][y]   x+1
         bottom_move()
         keydown();
      }
    }
}