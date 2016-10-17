(function game()
{

    var a = document.getElementById('a');
    var pause = document.getElementById('pause');
    var play = document.getElementById('play');
    var heartContainer = document.getElementById('heartContainer');

    var gameLoop = true;
    var startTime = Date.now();
    var endTime;

    var myEnemies = [];

    // Use arrayNum for checking the wallArray with "false" wallCheck() in keyCheck.
    var arrayNum;

    // End Vars

    this.init = function()
    {
        this.createEnemies();
        this.setStyles();
        this.createKey();
        this.createDoor();
        this.createWalls();
        this.lifeHearts();
        this.moveit();
        
    }

    this.createEnemies = function()
    {
        for (var e = 0; e < enemyArray.length; e++) 
        {
        myEnemies[e] = document.createElement('div');
        myEnemies[e].className = "enemy";
        myEnemies[e].style.top = enemyArray[e].top + "px";
        myEnemies[e].style.left = enemyArray[e].left + "px";
        myEnemies[e].style.height = enemyArray[e].height + "px";
        myEnemies[e].style.width = enemyArray[e].width + "px";
        document.body.appendChild(myEnemies[e]);
        };
    }

    this.setStyles = function()
    {
        // Starting out styles
        a.style.width = aObj.width + "px";
        a.style.height = aObj.height + "px";
    }

    this.createKey = function()
    {
        // create Key
        this.key = document.createElement('div');
        key.className = "key";
        key.style.top = keyObj.top + "px";
        key.style.left = keyObj.left + "px";
        key.style.height = keyObj.height + "px";
        key.style.width = keyObj.width + "px";
        document.body.appendChild(key);
    }

    this.createDoor = function()
    {
        // create Door
        this.door = document.createElement('div');
        door.className = "door";
        door.style.top = doorObj.top + "px";
        door.style.left = doorObj.left + "px";
        door.style.height = doorObj.height + "px";
        door.style.width = doorObj.width + "px";
        document.body.appendChild(door);
    }
    
    this.createWalls = function()
    {
        for (var i = 0; i < wallArray.length; i++) 
        {
        var wall = document.createElement('div');
        wall.className = wallArray[i].wallType;
        wall.style.top = wallArray[i].top + "px";
        wall.style.left = wallArray[i].left + "px";
        wall.style.height = wallArray[i].height + "px";
        wall.style.width = wallArray[i].width + "px";
        document.body.appendChild(wall);    
        };

    }
    

    this.moveit = function()
    {

        keyboardCheck();
        enemyCheck();
        enemyCollision();
        itemCheck();
        doorOpen();
        if(gameLoop === true)
        {
            requestAnimationFrame(moveit);  
        }    
    }
    

    this.wallCheck = function(arg)
    {
        for (var i = 0; i < wallArray.length; i++)
        {
           if(!(arg.left + arg.width < wallArray[i].left || wallArray[i].left + wallArray[i].width < arg.left || arg.top + arg.height < wallArray[i].top || wallArray[i].top + wallArray[i].height < arg.top))
            {
                arrayNum = i;
                return false;
            }
        };
        
           return true;
    }



    this.enemyCheck = function()
    {
       for (var i = 0; i < enemyArray.length; i++) 
        {

            if(enemyArray[i].moveLeft === true)
                {
                    if(wallCheck(enemyArray[i]))
                    {
                    enemyArray[i].left = enemyArray[i].left - enemyArray[i].moveSpeed;
                    }
                    if(wallCheck(enemyArray[i]) === false)
                    {
                        enemyArray[i].left = (wallArray[arrayNum].left + wallArray[arrayNum].width) + 0.1; 
                        enemyArray[i].moveLeft = false;

                        var Edir = Math.round(Math.random());
                        if(Edir == 0)
                        {
                            enemyArray[i].moveUp = true;
                        }
                        if(Edir == 1)
                        {
                            enemyArray[i].moveDown = true;
                        }
                    
                    }
                
                }
            if(enemyArray[i].moveUp === true)
                { 
                     if(wallCheck(enemyArray[i]))
                    {
                    enemyArray[i].top = enemyArray[i].top - enemyArray[i].moveSpeed;
                    }
                    if(wallCheck(enemyArray[i]) === false)
                    {
                        enemyArray[i].top = (wallArray[arrayNum].top + wallArray[arrayNum].height) + 0.1; 
                        enemyArray[i].moveUp = false;
                        var Edir = Math.round(Math.random());
                        if(Edir == 0)
                        {
                            enemyArray[i].moveRight = true;
                        }
                        if(Edir == 1)
                        {
                            enemyArray[i].moveLeft = true;
                        }
            
                    }
                
                }
            if(enemyArray[i].moveRight === true)
                {
                   
                     if(wallCheck(enemyArray[i]))
                    {
                    enemyArray[i].left = enemyArray[i].left + enemyArray[i].moveSpeed;
                    }
                    if(wallCheck(enemyArray[i]) === false)
                    {
                        enemyArray[i].left = (wallArray[arrayNum].left - enemyArray[i].width) - 0.1;
                        enemyArray[i].moveRight = false;
                        var Edir = Math.round(Math.random());
                        if(Edir == 0)
                        {
                            enemyArray[i].moveUp = true;
                        }
                        if(Edir == 1)
                        {
                            enemyArray[i].moveDown = true;
                        }
            
                    }
                     
                }
            if(enemyArray[i].moveDown === true)
                {
                    if(wallCheck(enemyArray[i]))
                    {
                    enemyArray[i].top = enemyArray[i].top + enemyArray[i].moveSpeed;
                    }
                    if(wallCheck(enemyArray[i]) === false)
                    {
                        enemyArray[i].top = (wallArray[arrayNum].top - enemyArray[i].height) - 0.1;
                        enemyArray[i].moveDown = false;
                        var Edir = Math.round(Math.random());
                        if(Edir == 0)
                        {
                            enemyArray[i].moveRight = true;
                        }
                        if(Edir == 1)
                        {
                            enemyArray[i].moveLeft = true;
                        }
            
                    }
                }
        myEnemies[i].style.top = enemyArray[i].top + "px";
        myEnemies[i].style.left = enemyArray[i].left + "px";
        }
         
        
    }


    this.keyboardCheck = function()
    {
        
        if(aObj.moveLeft === true)
            {
                if(wallCheck(aObj))
                {
                aObj.left = aObj.left - aObj.moveSpeed;
                }
                if(wallCheck(aObj) === false)
                {
                aObj.left = (wallArray[arrayNum].left + wallArray[arrayNum].width) + 0.1;     
                }


            
            }
        if(aObj.moveUp === true)
            { 
                 if(wallCheck(aObj))
                {
                aObj.top = aObj.top - aObj.moveSpeed;
                }
                if(wallCheck(aObj) === false)
                {
                aObj.top = (wallArray[arrayNum].top + wallArray[arrayNum].height) + 0.1; 
                }
            
            }
        if(aObj.moveRight === true)
            {
               
                 if(wallCheck(aObj))
                {
                aObj.left = aObj.left + aObj.moveSpeed;
                }
                if(wallCheck(aObj) === false)
                {
                aObj.left = (wallArray[arrayNum].left - aObj.width) - 0.1;  
                }
                 
            }
        if(aObj.moveDown === true)
            {
                if(wallCheck(aObj))
                {
                aObj.top = aObj.top + aObj.moveSpeed;
                }
                if(wallCheck(aObj) === false)
                {
                aObj.top = (wallArray[arrayNum].top - aObj.height) - 0.1; 
                }
            }
        
        a.style["-webkit-transform"] = "translate("+aObj.left+"px,"+aObj.top+"px)"; 
    }

    this.enemyCollision = function()
    {

        for (var i = 0; i < enemyArray.length; i++) 
        {
           
          if(!(aObj.left + aObj.width < enemyArray[i].left || enemyArray[i].left + enemyArray[i].width < aObj.left || aObj.top + aObj.height < enemyArray[i].top || enemyArray[i].top + enemyArray[i].height < aObj.top))
            {
                if(aObj.invincible === false)
                {
                   aObj.life = aObj.life - 1;
                   aObj.invincible = true;
                   heartNum = aObj.life - 1;
                   lifeHearts();

                }

                if(aObj.life == 0)
                {
                     gameEnd("loose");
                }

                
                setTimeout(function(){
                aObj.invincible = false;    
                },1000);
            } 
        }
     
        
    }

    this.lifeHearts = function ()
    {
        heartContainer.innerHTML = "";
        for(var h = 0; h < aObj.life; h++)
        {
            var heart = document.createElement('div');
            heart.className = "heart";
            heart.id = "heart"+h;
            heartContainer.appendChild(heart);
        };   
    }


    this.gameEnd = function(outcome)
    {
        if(outcome == "loose")
        {
          var sign = document.createElement('div');
            sign.className = 'gameOver';
            var signText = document.createTextNode("Game Over");
            sign.appendChild(signText);
            document.body.appendChild(sign);
            gameLoop = false;
            endTime = Date.now();
            gameTimer();  
        }
        if(outcome == "win")
        {
            var sign = document.createElement('div');
            sign.className = 'gameOver';
            var signText = document.createTextNode("You Won!");
            sign.appendChild(signText);
            document.body.appendChild(sign);
            gameLoop = false;
            endTime = Date.now();
            gameTimer();  
        }
            

    }

    this.itemCheck = function()
    {
        if(!(aObj.left + aObj.width < keyObj.left || keyObj.left + keyObj.width < aObj.left || aObj.top + aObj.height < keyObj.top || keyObj.top + keyObj.height < aObj.top))
            {
                keyObj.taken = "yes";
                key.style.display = 'none';
                door.style.display = "none";
            }
    }

    this.doorOpen = function()
    {
        for (var i = 0; i < enemyArray.length; i++) 
        {

            if(!(enemyArray[i].left + enemyArray[i].width < doorObj.left || doorObj.left + doorObj.width < enemyArray[i].left || enemyArray[i].top + enemyArray[i].height < doorObj.top || doorObj.top + doorObj.height < enemyArray[i].top))
                {
                    enemyArray[i].left = 200;
                }
        }


        if(!(aObj.left + aObj.width < doorObj.left || doorObj.left + doorObj.width < aObj.left || aObj.top + aObj.height < doorObj.top || doorObj.top + doorObj.height < aObj.top))
            {
                aObj.left = doorObj.left - aObj.width;
            }
        

        if(keyObj.taken == "yes")
        {
            if(!(aObj.left + aObj.width < doorObj.left || doorObj.left + doorObj.width < aObj.left || aObj.top + aObj.height < doorObj.top || doorObj.top + doorObj.height < aObj.top))
            {
               gameEnd('win');
            }
        }
    }


    this.pauseGame = function()
    {
        gameLoop = false;
        endTime = Date.now();
        gameTimer();
    }

    this.playGame = function()
    {
        gameLoop = true;
        moveit();
    }
     
    this.gameTimer = function()
    {
        var myTime = endTime - startTime;
        seconds=(myTime/1000)%60
        alert("You played for " + seconds + "seconds");
    }




    document.onkeydown = function (e) 
        {
            if (e.keyCode == '37') 
            {
               aObj.moveLeft = true; 
               a.style.backgroundPosition="0px -25px";

            }

            if (e.keyCode == '38') 
            {
               aObj.moveUp = true;
               a.style.backgroundPosition="0px -75px";
            }

            if (e.keyCode == '39') 
            { 
                aObj.moveRight = true;
                a.style.backgroundPosition="0px -50px";
            }

            if (e.keyCode == '40') 
            {
               aObj.moveDown = true;
               a.style.backgroundPosition="0px 0px";
            }
                
            
        };

    document.onkeyup = function (e) 
        {
            if (e.keyCode == '37') 
            {
               aObj.moveLeft = false;  
            }

            if (e.keyCode == '38') 
            {
               aObj.moveUp = false;
            }

            if (e.keyCode == '39') 
            { 
                aObj.moveRight = false;
            }

            if (e.keyCode == '40') 
            {
               aObj.moveDown = false;
            }
            
            
        };


    play.addEventListener('click',playGame);
    pause.addEventListener('click',pauseGame);

    // Start the game up
    this.init();
    
   

})();
