var app = angular.module('battleshipgame', ['firebase']);

// The ocean database
app.constant('FIREBASE_URI', 'https://udhack.firebaseio.com/');
// The player database
app.constant('FIREBASE_URI2', 'https://crackling-heat-88.firebaseio.com')

app.controller('Ocean', function ($scope, HitService) {
    $scope.ocean = this;
    $scope.position =
    [
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
    ];

    $scope.evalIndex = function (index) {
        if ($scope.position[index] == 0) {
            return "target-hole"
        } else {
            return "target-hole-hit"
        }
    }

    $scope.ocean.fireMissile = function (row, col) {
        console.log('missile fired at', row, col);
        // check if missile already fired here
        HitService.recordResult(row, col);
        $scope.ocean.update(row, col);

    };

    $scope.ocean.update = function (row, col) {
        console.log('updating Ocean for missile at', row, col);
        var letters = ['A','B','C','D','E','F','G','H','I','J'];
        if ($scope.position[((row.toNumber()-1)*10)+letters.indexOf(col)] == 0) {
            $scope.position[((row.toNumber()-1)*10)+letters.indexOf(col)]= 1
        }
         console.log($scope.position);

    };

});

app.controller('MyOcean', function ($scope) {
    var myOcean = this;
    $scope.position =
    [
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,8,9,8,8,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,2,3,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,4,0,0,0,0,
        0,0,0,0,0,4,0,0,0,0,
        0,0,0,0,0,5,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
    ];

    $scope.evalIndex = function (index) {
        if ($scope.position[index] == 0) {
            return "target-hole";
        }
        if ($scope.position[index]%2 == 0) {
            return "ship";
        } else {
            return "target-hole-hit";
        }
    };

    myOcean.update = function (row, col) {
        console.log('updating my for missile at', row, col);
        if (position[row*10+col] == 0) {
            ++position[row*10+col]
        }

        function contains(a, obj) {
            return a.some(function(element){return element == obj;})
        }

        if (contains(position, 2)) {
            // you sunk my ship
            // dec players ship conter
        }
        if (contains(position, 4)) {
            // you sunk my ship
            // dec players ship conter
        }
        if (contains(position, 8)) {
            // you sunk my ship
            // dec players ship conter
        }

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

    service.recordResult = function (row, col) {
        console.log('missile result sent', row, col);
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
