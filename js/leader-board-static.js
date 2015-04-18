<!DOCTYPE html>
<html ng-app="leaderboard">
    <head>
        <title>AngularJS Leader Board</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <!-- Bootstrap -->
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="css/leaderboard.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container" ng-controller="MainCtrl as main">
            <div class="well">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Player</th>
                        <th>Hits</th>
                        <th>Ships Left</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="contestant in main.contestants">
                        <td>{{contestant.lane}}</td>
                        <td>{{contestant.name}}</td>
                        <td>{{contestant.score}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="container" ng-controller="Ocean as ocean">
            <div class="ocean">
                <div class="btn-group" role="group" aria-label="First group" ng-repeat="r in [1,2,3,4,5,6,7,8,9,10]">
                    <div class="btn-group" role="group" aria-label="First group" ng-repeat="c in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']">
                        <button type="button" id="{{c}}{{r}}" class="btn btn-default" ng-click="ocean.fireMissile(r, c)">&nbsp;{{hits}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" ng-controller="MyOcean as myOcean">
            <div class="myOcean">
                <div class="btn-group" role="group" aria-label="First group" ng-repeat="r in [1,2,3,4,5,6,7,8,9,10]">
                    <div class="btn-group" role="group" aria-label="First group" ng-repeat="c in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']">
                        <button type="button" id="{{c}}{{r}}" class="btn btn-default {{hits}}">&nbsp;</button>
                    </div>
                </div>
            </div>
        </div>

        <script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/sugar/1.4.1/sugar-full.min.js"></script>

        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
        <script src="//cdn.firebase.com/js/client/2.2.4/firebase.js"></script>
        <script src="//cdn.firebase.com/libs/angularfire/1.0.0/angularfire.min.js"></script>

        <script src="js/leader-board.js"></script>
    </body>
</html>