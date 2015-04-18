var app = angular.module('leaderboard', ['firebase']);

app.constant('FIREBASE_URI', 'https://udhack.firebaseio.com/');

app.controller('Ocean', function (HitService) {
    var ocean = this;
    ocean.fireMissile = function (row, col) {
        console.log('missile fired at', row, col);
        // check if issile already fired here
        HitService.recordResult(row, col);

    };
    
    ocean.update = function (row, col) {
        console.log('updating Ocean for missile at', row, col);
        if (position[row*10+col]) {
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

app.controller('MyOcean', function ($scope) {
    var myOcean = this;
    $scope.position = 
[
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,8,8,8,8,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,2,3,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,4,0,0,0,0,
    0,0,0,0,0,4,0,0,0,0,
    0,0,0,0,0,4,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
];

        $scope.evalIndex = function (index) {
            console.log(index);
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
        if (position[row*10+col]) {
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

app.service('HitService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var results = $firebaseArray(ref);

    service.recordResult = function (row, col) {        
        console.log('missile result sent', row, col);
        return;
    };

});

app.controller('MainCtrl', function (ContestantsService) {
    var main = this;
    main.newContestant = {lane: '', name: '', score: ''};
    main.currentContestant = null;
    main.contestants = ContestantsService.getContestants();

    main.addContestant = function () {
        ContestantsService.addContestant(angular.copy(main.newContestant));
        main.newContestant = {lane: '', name: '', score: ''};
        console.log('adding');
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