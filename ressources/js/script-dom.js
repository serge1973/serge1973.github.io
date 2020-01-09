"use strict";

window.onload = function(){

    // masque du personnage principal
    var masquePerso = document.getElementById('dinoContainer'); 
    masquePerso.style.bottom = "10px";  
    masquePerso.style.left = "20px";   

    // sprite du personnage principal
    var sprite = document.getElementById('dino');
    sprite.style.bottom = "0px";
    sprite.style.left = "0px";
    
    // bouton play - lancement du jeu
    var btnPlay = document.getElementById('btn-play');

    // nuages en arrière plan
    var bgClouds = document.getElementById('background-clouds');
    bgClouds.style.left = "0px";
    bgClouds.style.top = "0px";  

    // sol en arrière plan
    var bgGround = document.getElementById('background-ground');
    bgGround.style.left = "0px";
    bgGround.style.bottom = "0px";

    // cactus simple
    var cactusSimple = document.getElementById('cactus-simple');
    cactusSimple.style.left = "552px";
    cactusSimple.style.bottom = "11px";

    // cactus double
    var cactusDouble = document.getElementById('cactus-double');
    cactusDouble.style.left = "752px";
    cactusDouble.style.bottom = "11px";

    // conversion en nombres entiers des valeurs en pixels correspondant à la position absolue des différents éléments défilants
    var defilementClouds = parseInt(bgClouds.style.left);
    var defilementCactusSimple = parseInt(cactusSimple.style.left);
    var defilementCactusDouble = parseInt(cactusDouble.style.left);
    var defilementGround = parseInt(bgGround.style.left);
    var defilementImagesSpriteDino = parseInt(sprite.style.left);

    // gestion du score
    var score = 0; 
    var affichageScore = document.getElementById('div-score');

    // etat collision par defaut
    var collision = false;

    // affichage des textes "GAME OVER" & "BRAVO"
    var gameOverText = document.getElementById('game-over');
    var greetingsText = document.getElementById('greetings');

    // affichage de l'icone Bouton Play
    var btnPlay = document.getElementById('btn-play');

    // animation du dino
    var animationDino = function() {
        if (Math.abs(defilementImagesSpriteDino) == (120)) {
            defilementImagesSpriteDino = 0;
        };
        sprite.style.left = defilementImagesSpriteDino + "px";
        defilementImagesSpriteDino = defilementImagesSpriteDino - 40;
    };

    // defilement des cactus simple
    var animationCactus = function(defilementCactus,sortieEcran,boucleDefilement,scrollCactus,typeCactus){
        if (defilementCactus < sortieEcran) {
            defilementCactus = boucleDefilement;
            score = score + 10;
            affichageScore.innerHTML = 'score : ' + score;
        }; 
        defilementCactus = defilementCactus - scrollCactus;
        typeCactus.style.left = defilementCactus + 'px';
        return defilementCactus;
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
    var animationGround = function(){
        if (defilementGround < -(1552 - 552)) { // somme (largeur totale image Ground - largeur ecran)
            defilementGround = 0;
        };
        defilementGround = defilementGround - 5;
        bgGround.style.left = defilementGround + 'px';
    };

    // gestion des collisions
    var gestionCollisions = function(){

        // mise en place game over & rechargement page
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
    // var affichageH2TableauCompetences = document.getElementById('competences');
    var affichageIconJS = document.getElementById('javascript');
    var affichageIconJquery = document.getElementById('jquery');
    var affichageIconHtml = document.getElementById('html');
    var affichageIconCss = document.getElementById('css');
    var affichageIconBootstrap = document.getElementById('bootstrap');
    var affichageIconAngular = document.getElementById('angular');
    var affichageIconMongoDB = document.getElementById('mongodb');
    var affichageIconNodeJS = document.getElementById('nodejs');
    var affichageIconExpressJS = document.getElementById('expressjs');
    var affichageIconMeteorJS = document.getElementById('meteorjs');

    // Mise en place de la structure conditionnelle permettant l'affichage des compétences
    var affichageCompetences = function(){

        if (score == 30) {
            // affichageH2TableauCompetences.style.display = "block";
            affichageIconJS.style.display = "block";
        } else {
            if (score == 60) {
                affichageIconJquery.style.display = "block";                    
            }
            if (score == 90) {
                affichageIconHtml.style.display = "block";                     
            }
            if (score == 120) {  
                affichageIconCss.style.display = "block";                    
            }
            if (score == 150) {
                affichageIconBootstrap.style.display = "block";                    
            }
            if (score == 180) {
                affichageIconAngular.style.display = "block";                    
            }
            if (score == 210) {
                affichageIconMongoDB.style.display = "block";                    
            }
            if (score == 240) {
                affichageIconNodeJS.style.display = "block";                    
            }
            if (score == 270) {
                affichageIconExpressJS.style.display = "block";                    
            }
            if (score == 300) {
                affichageIconMeteorJS.style.display = "block";  
                btnPlay.style.display = "block";
                greetingsText.style.display = "block";               
            }
        };

    };

    // gestion du saut
    var sautDino = false;
    var autorisationSautDino = true;
    var calculSautDino = parseInt(masquePerso.style.bottom);
    var sautDinoPixels = function(pixels) {
        calculSautDino = calculSautDino + pixels;
        masquePerso.style.bottom = calculSautDino + "px";   
    };

    var sautDinoComplet = function(){

        if ((sautDino) && (calculSautDino < 100)) {
            sautDinoPixels(10);
        } 
        else {
            if ((sautDino) && (calculSautDino < 40)) {
                sautDinoPixels(6);
            };
            if ((sautDino) && (calculSautDino < 70)) {
                sautDinoPixels(2);
            };
        }
        if ((sautDino) && (calculSautDino == 100)) {
            setTimeout(function(){ sautDino = false; }, 175);
        };
        if ((sautDino == false ) && (calculSautDino > 10)) {
            sautDinoPixels(-10);
        } else {
            if ((sautDino == false ) && (calculSautDino > 40)) {
                sautDinoPixels(-6);
            };
            if ((sautDino == false ) && (calculSautDino > 70)) {
                sautDinoPixels(-2);
            };
        }; 

    };

    // Lancement du jeu
    btnPlay.onclick = function(){

        if(collision){
            location.reload();
        } else {
            if(score == 300){
                location.reload();
            };
        };

        btnPlay.style.display = "none";

        var boucleAnimation = function(){
            animationDino();
            defilementCactusSimple = animationCactus(defilementCactusSimple,-23,552,5,cactusSimple);
            defilementCactusDouble = animationCactus(defilementCactusDouble,-23,552,5,cactusDouble);
            animationClouds();
            animationGround();
            affichageCompetences();
            sautDinoComplet();
            gestionCollisions();
            // inversionFiltreCouleur();
            if ((collision) || (score == 300)) {
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