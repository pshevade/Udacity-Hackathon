var app = angular.module('battleshipgame', ['firebase']);

// The ocean database
app.constant('FIREBASE_URI', 'https://udhack.firebaseio.com/');
// The player database
app.constant('FIREBASE_URI2', 'https://crackling-heat-88.firebaseio.com')

app.controller('OpOcean', function ($scope, HitService) {
    $scope.opOcean = this;
    // create array of 100 zeros
    $scope.positions = Array.apply(null, new Array(100)).map(Number.prototype.valueOf,0);

    $scope.evalIndex = function (index) {
        if ($scope.positions[index] == 0) {
            return "target-hole"
        } else {
            return "target-hole-hit"
        }
    }

    $scope.opOcean.fireMissile = function (index) {
        console.log('missile fired at', index);
        // check if missile already fired here
        HitService.recordResult(index);
        $scope.opOcean.update(index);
    }

    $scope.opOcean.update = function (index) {
        console.log('updating opOcean for missile at', index);
        if ($scope.positions[index] == 0) {
            $scope.positions[index] = 1
        }
         console.log($scope.positions);

    };

});

app.controller('MyOcean', function ($scope) {
    var myOcean = this;
    $scope.positions = getMyOcean();

    $scope.evalIndex = function (index) {
        if ($scope.positions[index] == 0) {
            return "target-hole"
        }
        if ($scope.positions[index] < 0) {
            return "target-hole-hit"
        } else {
            return "ship"
        }
    }

    myOcean.update = function (index) {
        console.log('updating my for missile at', index);
        if (positions[index] == 0) {
            ++positions[index]
        }
    }

});

app.service('HitService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var results = $firebaseArray(ref);

    service.recordResult = function (index) {        
        console.log('missile result sent', index);
        return;
    };

});

app.controller('MainCtrl', function (TournamentService, ContestantsService, FiredArrayService) {
    var main = this;
    main.newContestant = {id: '', name: '', score: '', ships_left:''};
    main.currentContestant = null;

    main.tournament = TournamentService.getTournament();
    main.contestants = ContestantsService.getContestants();
    console.log("contestants are: ", main.contestants)

    main.fired_array = FiredArrayService.getFiredArray();

    main.add = 0;
    main.lockout = false;

    main.isLockout = function() {
        main.lockout = (main.tournament.total_players >= 4);
        return main.lockout;
    }

    main.canAdd = function() {
        return main.add == 0;
    }

    main.addContestant = function () {
        main.tournament.last_id += 1;
        main.newContestant.id =  main.tournament.last_id;
        main.add = main.newContestant.id;
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
        if (contestant.id == main.add) {
            main.add = 0;
        }
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

/* SERVICES:
    Business-independent logic
*/

app.service('HitService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var results = $firebaseArray(ref);

    service.recordResult = function (index) {
        console.log('missile result sent', index);
        return;
    };

});

app.service('FiredArrayService', function ($firebaseArray, FIREBASE_URI2){
    var service = this;
    var ref = new Firebase(FIREBASE_URI2 + '/tournament/fired_array');
    var fired_array = $firebaseArray(ref);

    service.getFiredArray = function () {
        return fired_array;
    };
});

app.service('TournamentService', function ($firebaseObject, FIREBASE_URI2){
    var service = this;
    var ref = new Firebase(FIREBASE_URI2 + '/tournament');
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

app.service('ContestantsService', function ($firebaseArray, FIREBASE_URI2) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI2 + '/contestants/');
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


/* DIRECTIVES:
    Custom directives to template html files

*/

// The sign-up form
app.directive('signUp', function(){
    return {
        restrict: 'E',
        templateUrl: 'sign-up.html',
    }
});

// The sign-up form for an admin - admin can also remove players
app.directive('signUpadmin', function(){
    return {
        restrict: 'E',
        templateUrl: 'sign-upadmin.html',
    }
});

// The scores will be displayed with this template
app.directive('displayScores', function(){
    return {
        restrict: 'E',
        templateUrl: 'display-scores.html',
    }
});

// The html for the attack screen
app.directive('attackOcean', function(){
    return {
        restrict: 'E',
        templateUrl: 'attack-ocean.html',
    }
});

// The html for player's part of the ocean and ships
app.directive('playerOcean', function(){
    return {
        restrict: 'E',
        templateUrl: 'player-ocean.html',
    }
});
