var app = angular.module('leaderboard', ['firebase']);

app.constant('FIREBASE_URI', 'https://crackling-heat-88.firebaseio.com/');

app.controller('MainCtrl', function (TournamentService, ContestantsService, FiredArrayService) {
    var main = this;
    main.newContestant = {id: '', name: '', score: '', ships_left:''};
    main.currentContestant = null;

    main.tournament = TournamentService.getTournament();
    main.contestants = ContestantsService.getContestants();
    console.log("contestants are: ", main.contestants)

    main.fired_array = FiredArrayService.getFiredArray();

    main.canAdd = true;
    main.canAddF = true;
    main.lockout = false;

    main.isLockout = function() {
        main.lockout = (main.tournament.total_players == 4);
        return main.lockout;
    }

    main.canAddFalse = function() {
        console.log("we are setting can Add to false without click")
        return main.canAdd === false;
    }

    main.addContestant = function () {
        main.newContestant.id =  main.tournament.total_players;
        main.newContestant.score = 0;
        main.newContestant.ships_left = 3;
        console.log("our new contestant", main.newContestant);
        ContestantsService.addContestant(angular.copy(main.newContestant));
        main.newContestant = {id: '', name: '', score: '', ships_left: ''};
        main.tournament.total_players  = main.tournament.total_players + 1;
        TournamentService.updateTournament(main.tournament);
    };

    main.updateContestant = function (contestant) {
        ContestantsService.updateContestant(contestant);
    };

    main.removeContestant = function (contestant) {
        ContestantsService.removeContestant(contestant);
        main.tournament.total_players -= 1;
        TournamentService.updateTournament(main.tournament);
    };

    main.incrementScore = function () {
        main.currentContestant.score = parseInt(main.currentContestant.score, 10) + 1;
        main.updateContestant(main.currentContestant);
    };

    main.decrementScore = function () {
        main.currentContestant.score = parseInt(main.currentContestant.score, 10) - 1;
        main.updateContestant(main.currentContestant);
    };



});

app.directive('signUp', function(){
    return {
        restrict: 'E',
        templateUrl: 'sign-up.html',
    }
});

app.directive('displayScores', function(){
    return {
        restrict: 'E',
        templateUrl: 'display-scores.html',
    }
});

app.service('FiredArrayService', function ($firebaseArray, FIREBASE_URI){
    var service = this;
    var ref = new Firebase(FIREBASE_URI + '/tournament/fired_array');
    var fired_array = $firebaseArray(ref);

    service.getFiredArray = function () {
        return fired_array;
    };
});

app.service('TournamentService', function ($firebaseObject, FIREBASE_URI){
    var service = this;
    var ref = new Firebase(FIREBASE_URI + '/tournament');
    var tournament = $firebaseObject(ref);


    console.log('tournament', tournament)

    service.updateTurn = function() {
        tournament.turn += 1;
        if (tournament.turn == 5){
            tournament.turn = 1;
        }
    }

    service.getTournament = function() {
        console.log("getting tournament", tournament);
        return tournament;
    };

    service.updateTournament = function(new_tournament) {
        console.log(new_tournament, tournament)
        tournament.$save().then(function(ref){

        })

    };

});

app.service('ContestantsService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI + '/contestants/');
    var contestants = $firebaseArray(ref);

    service.getContestants = function () {
        return contestants;
    };

    service.addContestant = function (contestant) {
        contestants.$add(contestant);
    };

    service.updateContestant = function (contestant) {
        contestants.$save(contestant);
    };

    service.removeContestant = function (contestant) {
        contestants.$remove(contestant);
    };
});



/* Template that was given

var app = angular.module('leaderboard', ['firebase']);

app.constant('FIREBASE_URI', 'https://crackling-heat-88.firebaseio.com/');
//https://udhack.firebaseio.com/

app.controller('MainCtrl', function (ContestantsService) {
    var main = this;
    main.newContestant = {lane: '', name: '', score: ''};
    main.currentContestant = null;
    main.contestants = ContestantsService.getContestants();
    main.lockout = false;

    main.isLockout = function() {
        main.lockout = (main.contestants.length == 4);
        return main.lockout;
    }

    main.addContestant = function () {
        ContestantsService.addContestant(angular.copy(main.newContestant));
        main.newContestant = {id: '', name: '', score: '', ships_left: ''};
    };

    main.updateContestant = function (contestant) {
        ContestantsService.updateContestant(contestant);
    };

    main.removeContestant = function (contestant) {
        ContestantsService.removeContestant(contestant);
    };

    main.incrementScore = function () {
        main.currentContestant.score = parseInt(main.currentContestant.score, 10) + 1;
        main.updateContestant(main.currentContestant);
    };

    main.decrementScore = function () {
        main.currentContestant.score = parseInt(main.currentContestant.score, 10) - 1;
        main.updateContestant(main.currentContestant);
    };
});

app.service('ContestantsService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var contestants = $firebaseArray(ref);

    service.getContestants = function () {
        return contestants;
    };

    service.addContestant = function (contestant) {
        contestants.$add(contestant);
    };

    service.updateContestant = function (contestant) {
        contestants.$save(contestant);
    };

    service.removeContestant = function (contestant) {
        contestants.$remove(contestant);
    };
});
*/
