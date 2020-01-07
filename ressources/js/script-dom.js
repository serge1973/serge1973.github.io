window.onload = function(){

    // zone du jeu
    var container = document.getElementById('container');
    container.style.position = "absolute";                        

    // masque du personnage principal
    var masquePerso = document.getElementById('dinoContainer');
    // masquePerso.style.width = "40px";
    // masquePerso.style.height = "43px";
    masquePerso.style.position = "absolute";  
    masquePerso.style.bottom = "10px";  
    masquePerso.style.left = "20px"; 
    masquePerso.style.height = "43px";
    masquePerso.style.width = "40px";
    // masquePerso.style.overflow = "hidden";     

    // sprite du personnage principal
    var sprite = document.getElementById('dino');
    sprite.style.position = "absolute";
    sprite.style.bottom = "0px";
    sprite.style.left = "0px";
    sprite.style.height = "43px";
    sprite.style.width = "120px";

    // bouton play - lancement du jeu
    var btnPlay = document.getElementById('btn-play');

    // nuages en arrière plan
    var bgClouds = document.getElementById('background-clouds');
    bgClouds.style.left = "0px";
    bgClouds.style.top = "0px"; 
    bgClouds.style.width = "1552px";   

    // sol en arrière plan
    var bgGround = document.getElementById('background-ground');
    bgGround.style.left = "0px";
    bgGround.style.bottom = "0px";

    // cactus simple
    var cactusSimple = document.getElementById('cactus-simple');
    cactusSimple.style.left = "552px";
    cactusSimple.style.bottom = "11px";
    cactusSimple.style.width = "23px";
    cactusSimple.style.height = "46px";

    // cactus double
    var cactusDouble = document.getElementById('cactus-double');
    cactusDouble.style.left = "752px";
    cactusDouble.style.bottom = "11px";
    cactusDouble.style.width = "32px";
    cactusDouble.style.height = "34px";

    // conversion en nombres entiers des valeurs en pixels correspondant à la position absolue des différents éléments défilants
    var defilementClouds = parseInt(bgClouds.style.left);
    var defilementCactusSimple = parseInt(cactusSimple.style.left);
    var defilementCactusDouble = parseInt(cactusDouble.style.left);
    var defilementGround = parseInt(bgGround.style.left);
    var defilementImagesSpriteDino = parseInt(sprite.style.left);

    // gestion du score
    var score = 0; 
    var affichageScore = document.getElementById('div-score');

    var collision = false;

    // affichage du texte "GAME OVER"
    var gameOverText = document.getElementById('game-over');

    // affichage de l'icone Bouton Play
    var btnPlay = document.getElementById('btn-play');

    var animationDino = function() {
        if (Math.abs(defilementImagesSpriteDino) == (120)) {
            defilementImagesSpriteDino = 0;
        };
        sprite.style.left = defilementImagesSpriteDino + "px";
        defilementImagesSpriteDino = defilementImagesSpriteDino - 40;
        
    };

    // defilement des cactus simple
    var animationCactusSimple = function(){
        if (defilementCactusSimple < (-23)) {
            defilementCactusSimple = 552;
            score = score + 10;
            affichageScore.innerHTML = 'score : ' + score;
        }  
        defilementCactusSimple = defilementCactusSimple - 5;
        cactusSimple.style.left = defilementCactusSimple + 'px';
    };

    // defilement des cactus double
    var animationCactusDouble = function(){
        if (defilementCactusDouble < (-32)) {
            defilementCactusDouble = 552 - 9; 
            score = score + 10;
            affichageScore.innerHTML = 'score : ' + score;
        } 
        defilementCactusDouble = defilementCactusDouble - 5;
        cactusDouble.style.left = defilementCactusDouble + 'px';
    };

    // defilement des nuages
    var animationClouds = function(){
        if (defilementClouds < -(1552 - 552)) { // somme (largeur totale image Clouds - largeur ecran)
            defilementClouds = 0;
        };
        defilementClouds = defilementClouds - 1;
        bgClouds.style.left = defilementClouds + 'px';
        // score = score + 1;
        // affichageScore.innerHTML = 'score : ' + score;
    };

    // defilement du sol
    var animationGround = function(arg){
        if (defilementGround < -(1552 - 552)) { // somme (largeur totale image Ground - largeur ecran)
            defilementGround = 0;
        };
        defilementGround = defilementGround - 5;
        bgGround.style.left = defilementGround + 'px';
    };

    // gestion des collisions
    var gestionCollisions = function(){

        var gameOver = function(){
            collision = true;
            gameOverText.style.display = "block";
            btnPlay.style.display = "block";
        };

        var coordonneesMasquePerso = masquePerso.getBoundingClientRect();
        var coordonneesCactusSimple = cactusSimple.getBoundingClientRect();
        var coordonneesCactusDouble = cactusDouble.getBoundingClientRect();

        if (coordonneesMasquePerso.left < coordonneesCactusSimple.left + coordonneesCactusSimple.width &&
            coordonneesMasquePerso.left + coordonneesMasquePerso.width > coordonneesCactusSimple.left &&
            coordonneesMasquePerso.top < coordonneesCactusSimple.top + coordonneesCactusSimple.height &&
            coordonneesMasquePerso.height + coordonneesMasquePerso.top > coordonneesCactusSimple.top) {
            gameOver();
        } else {
            if (coordonneesMasquePerso.left < coordonneesCactusDouble.left + coordonneesCactusDouble.width &&
                coordonneesMasquePerso.left + coordonneesMasquePerso.width > coordonneesCactusDouble.left &&
                coordonneesMasquePerso.top < coordonneesCactusDouble.top + coordonneesCactusDouble.height &&
                coordonneesMasquePerso.height + coordonneesMasquePerso.top > coordonneesCactusDouble.top) {
                gameOver();
            };

        };
        
    };

    // affichage des competences
    var affichageH2TableauCompetences = document.getElementById('competences');
    var affichageIconJS = document.getElementById('javascript');
    var affichageIconJquery = document.getElementById('jquery');
    var affichageIconHtmlCss = document.getElementById('html-css');
    var affichageIconBootstrap = document.getElementById('bootstrap');
    var affichageIconAngular = document.getElementById('angular');
    var affichageIconMongoDB = document.getElementById('mongodb');

    // Mise en place de la structure conditionnelle permettant l'affichage des compétences
    var affichageCompetences = function(){

        if (score == 30) {
            affichageH2TableauCompetences.style.display = "inline-block";
            affichageIconJS.style.display = "inline-block";
        } else {

            if (score == 60) {
                affichageIconJquery.style.display = "inline-block";                    
            }
            if (score == 90) {
                affichageIconHtmlCss.style.display = "inline-block";                    
            }
            if (score == 120) {
                affichageIconBootstrap.style.display = "inline-block";                    
            }
            if (score == 150) {
                affichageIconAngular.style.display = "inline-block";                    
            }
            if (score == 180) {
                affichageIconMongoDB.style.display = "inline-block";                    
            }

        };

    };

    // gestion du saut
    var sautDino = false;
    var autorisationSautDino = true;
    var calculSautDino = parseInt(masquePerso.style.bottom);

    var sautDinoUp10pixels = function(){
        calculSautDino = calculSautDino + 10;
        masquePerso.style.bottom = calculSautDino + "px";   
    };
    var sautDinoUp6pixels = function(){
        calculSautDino = calculSautDino + 6;
        masquePerso.style.bottom = calculSautDino + "px";   
    };
    var sautDinoUp2pixels = function(){
        calculSautDino = calculSautDino + 2;
        masquePerso.style.bottom = calculSautDino + "px";   
    };
    var sautDinoDown10pixels = function(){
        calculSautDino = calculSautDino - 10;
        masquePerso.style.bottom = calculSautDino + "px";            
    };
    var sautDinoDown6pixels = function(){
        calculSautDino = calculSautDino - 6; 
        masquePerso.style.bottom = calculSautDino + "px";            
    };
    var sautDinoDown2pixels = function(){
        calculSautDino = calculSautDino - 2; 
        masquePerso.style.bottom = calculSautDino + "px";            
    };

    var sautDinoComplet = function(){

        if ((sautDino) && (calculSautDino < 100)) {
            sautDinoUp10pixels();
        } 
        else {
            if ((sautDino) && (calculSautDino < 40)) {
                sautDinoUp6pixels();
            };
            if ((sautDino) && (calculSautDino < 70)) {
                sautDinoUp2pixels();
            };
        }
        if ((sautDino) && (calculSautDino == 100)) {
            setTimeout(function(){ sautDino = false; }, 175);
        };
        if ((sautDino == false ) && (calculSautDino > 10)) {
            sautDinoDown10pixels();
        } else {
            if ((sautDino == false ) && (calculSautDino > 40)) {
                sautDinoDown6pixels();
            };
            if ((sautDino == false ) && (calculSautDino > 70)) {
                sautDinoDown2pixels();
            };
        }; 

    };

    // Lancement du jeu
    btnPlay.onclick = function(){

        if(collision){
            location.reload();
        }

        btnPlay.style.display = "none";
        gameOverText.style.display = "none";

        var boucleAnimation = function(){

            animationDino();
            animationCactusSimple();
            animationCactusDouble();
            animationClouds();
            animationGround();
            affichageCompetences();
            sautDinoComplet();
            gestionCollisions();

            if (collision){
                return;
            };

            requestAnimationFrame(boucleAnimation);

        };
        boucleAnimation();

        window.onkeydown = function(event){
            var code = event.keyCode;
            switch(code){
                case 32:
                if ((autorisationSautDino == true) && (calculSautDino == 10)) {
                    sautDino = true;
                } else {
                    if ((autorisationSautDino == false) && (calculSautDino > 10)) {
                        sautDino = false;
                    };
                };
                break;
            };

        };

    };

};