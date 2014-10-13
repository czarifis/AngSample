'use strict';
/**
 * Created by Costas Zarifis on 10/12/14.
 */


angular.module('controllers',[]).controller('MapCt', function ($scope) {

        $scope.map = {
            center: {
                latitude:45,
                longitude : -73
            },
            zoom:2,
            bounds: {}
        };

        $scope.marker = {
            idKey:'1' ,
            coords: {
                latitude:45,
                longitude : -73
            }
        };

        $scope.markerz = [
            {
                idKey:'1' ,
                coords: {
                    latitude:35,
                    longitude : -73
                }
            },{
                idKey:'2' ,
                coords: {
                    latitude:45,
                    longitude : -83
                }
            },{
                idKey:'3' ,
                coords: {
                    latitude:55,
                    longitude : -93
                }
            },{
                idKey:'4' ,
                coords: {
                    latitude:65,
                    longitude : -53
                }
            },{
                idKey:'5' ,
                coords: {
                    latitude:25,
                    longitude : -23
                }
            }


        ];



        var createRandomMarker = function (i, bounds, idKey) {

//            var lat_min = bounds.southwest.latitude,
//                lat_range = bounds.northeast.latitude - lat_min,
//                lng_min = bounds.southwest.longitude,
//                lng_range = bounds.northeast.longitude - lng_min;

            var lat_min = -90,
                lat_range = 90 - lat_min,
                lng_min = -180,
                lng_range = 180 - lng_min;

            if (idKey == null) {
                idKey = "id";
            }

            var latitude = lat_min + (Math.random() * lat_range);
            var longitude = lng_min + (Math.random() * lng_range);
            var ret = {
                idKey: i,
                coords: {
                    latitude: latitude,
                    longitude: longitude
                },
                checked: true,
                title: 'm' + i
            };
            ret[idKey] = i;
            return ret;
        };

        $scope.randomMarkers = [];
        // Get the bounds from the map once it's loaded
        $scope.$watch(function() { return $scope.map.bounds; }, function(nv, ov) {
            // Only need to regenerate once
            if (!ov.southwest && nv.southwest) {
                var markers = [];
//                console.log($scope.map.bounds);
                for (var i = 0; i < 20; i++) {

                    $scope.mm = createRandomMarker(i, $scope.map.bounds);
                    markers.push($scope.mm);

                }
//                $scope.randomMarkers = JSON.stringify(markers);
                $scope.randomMarkers =markers
//                console.log(JSON.stringify(markers));
            }
        }, true);


        $scope.isChecked = true;
        $scope.keyID = 15;
        $scope.randomMarkers[15];

        var dummyVar = true;
        $scope.pushNotificationChange = function() {

            console.log('Push Notification Change');
            console.log('was isChecked:',dummyVar);
            var variab = $scope.randomMarkers[15];
            console.log(variab);

            variab.checked = $scope.isChecked;
            if (dummyVar==true){
                dummyVar = false;
                variab.checked = false;
            }
            else{
                dummyVar = true;
                variab.checked = true;
            }

            $scope.randomMarkers[15] = variab;

        };

        $scope.pushEditable = function(){
            console.log('new input');
        };

        $scope.$watch("keyID", function(){
            // do something
            console.log('watching something');
        });

        console.log();

//        fruits.indexOf



    }
);
