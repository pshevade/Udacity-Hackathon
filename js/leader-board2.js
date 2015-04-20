var app = angular.module('leaderboard', ['firebase']);

app.constant('FIREBASE_URI', 'https://crackling-heat-88.firebaseio.com/');

<<<<<<< HEAD
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
=======
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
>>>>>>> a2370f9a8211e981ca135f548ea5f35ab85902db

    main.incrementScore = function () {
        main.currentContestant.score = parseInt(main.currentContestant.score, 10) + 1;
        main.updateContestant(main.currentContestant);
    };

    main.decrementScore = function () {
        main.currentContestant.score = parseInt(main.currentContestant.score, 10) - 1;
        main.updateContestant(main.currentContestant);
    };
<<<<<<< HEAD
    
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
                return "target-hole"
            }
            if ($scope.position[index]%2 == 0) {
                return "ship"
            } else {
                return "target-hole-hit"
            }
        }

    myOcean.update = function (row, col) {
        console.log('updating my for missile at', row, col);
        if (position[row*10+col] == 0) {
            ++position[row*10+col]
        }
=======



});

app.directive('signUp', function(){
    return {
        restrict: 'E',
        templateUrl: 'sign-up.html',
    }
});
>>>>>>> a2370f9a8211e981ca135f548ea5f35ab85902db

app.directive('signUpadmin', function(){
    return {
        restrict: 'E',
        templateUrl: 'sign-upadmin.html',
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
