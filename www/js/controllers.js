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
                options: {
                    title: 'The White House',
//                    labelContent : '<br />Overlapse',
                    draggable: true

                },
                checked: true,
                title: 'marker: ' + i,

                events: {
                    dragend: function (marker, eventName, args) {
                        $log.log('marker dragend');
                        var lat = marker.getPosition().lat();
                        var lon = marker.getPosition().lng();
                        $log.log(lat);
                        $log.log(lon);

                        $scope.marker.options = {
                            draggable: true,
                            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                            labelAnchor: "100 0",
                            labelClass: "marker-labels"
                        };
                    }
                }
            };
            ret[idKey] = i;
            return ret;
        };


//        $scope.$watchCollection("randomMarkers.coords", function (newVal, oldVal) {
//            if (_.isEqual(newVal, oldVal))
//                return;
//            $scope.coordsUpdates++;
//        });
//        $timeout(function () {
//            $scope.randomMarkers.coords = {
//                latitude: 42.1451,
//                longitude: -100.6680
//            };
//            $scope.dynamicMoveCtr++;
//            $timeout(function () {
//                $scope.marker.coords = {
//                    latitude: 43.1451,
//                    longitude: -102.6680
//                };
//                $scope.dynamicMoveCtr++;
//            }, 2000);
//        }, 1000);

        $scope.randomMarkers = [];
        // Get the bounds from the map once it's loaded
        $scope.$watch(function() { return $scope.map.bounds; }, function(nv, ov) {
            console.log('creating random markers');
            // Only need to regenerate once
            if (!ov.southwest && nv.southwest) {
                var markers = [];
//                console.log($scope.map.bounds);
                for (var i = 0; i < 20; i++) {

                    $scope.mm = createRandomMarker(i, $scope.map.bounds);
                    markers.push($scope.mm);

                }
//                $scope.randomMarkers = JSON.stringify(markers);
                $scope.randomMarkers =markers;
//                console.log(JSON.stringify(markers));
            }
        }, true);


        $scope.model = {hasChecked:true, keyID: undefined, currLat: 0, currLong: 0};


        // mention the difference here if we don't use model the two way databinding doesn't work
        // more info here: http://stackoverflow.com/questions/13632042/angularjs-two-way-data-binding-fails-if-element-has-ngmodel-and-a-directive-wit
        // and here:
        // http://stackoverflow.com/questions/9682092/databinding-in-angularjs
        $scope.isChecked = true;
//        $scope.keyID = 1;
//        $scope.randomMarkers[15];

        //var dummyVar = true;
        $scope.pushNotificationChange = function() {

            console.log('Push Notification Change');
//            console.log('was isChecked:',dummyVar);
            var variab = $scope.randomMarkers[$scope.model.keyID];

            console.log('was variab.checked:',variab.checked);
            console.log(variab);

            //variab.checked = $scope.isChecked;
            if (variab.checked==true){
//                dummyVar = false;
//                $scope.model.hasChecked = false;
                variab.checked = false;
            }
            else{
//                dummyVar = true;
//                $scope.model.hasChecked = true;

                variab.checked = true;
            }
//            console.log('is isChecked:',dummyVar);
            console.log('variab now is:',variab);
            $scope.randomMarkers[$scope.model.keyID] = variab;
            //$scope.keyID = varID;

            console.log('scope.keyID now is:',$scope.model.keyID);

        };

        $scope.pushEditable = function(id){
            console.log('new input');
//            $scope.model.keyID = id;
            console.log('changed KeyID to:',$scope.model.keyID);

        };

        $scope.changeLat = function(){
            var item = $scope.randomMarkers[$scope.model.keyID];
            item.coords.latitude = $scope.model.currLat;
            console.log('item:',item);
        };

        $scope.changeLong = function(id){
            var item = $scope.randomMarkers[id];
            item.coords.longitude = $scope.model.currLong;
            console.log('item:',item);
        };


        $scope.$watch("model.keyID", function(){
            // do something
            console.log('watching something',$scope.model.keyID);



//            item.checked = 0;
            var item = $scope.randomMarkers[$scope.model.keyID];
            // Important to avoid the 'undefined checked' error at startup
            if (typeof item !== 'undefined') {
                console.log('new element:', item);
                $scope.isChecked = item.checked;
                $scope.model.hasChecked = item.checked;
                $scope.model.currLat = item.coords.latitude;
                $scope.model.currLong = item.coords.longitude;

                console.log('$scope.model.currLat',$scope.model.currLat)
            }
            else{
                console.log('undefined at startup');
            }

        });

        $scope.addRandomMarker = function(){
            console.log('add random marker');
            $scope.mm = createRandomMarker($scope.randomMarkers.length, $scope.map.bounds);
            $scope.randomMarkers.push($scope.mm);

//
        };


        $scope.deleteMarker = function(marker){
//            console.log('Deleting ',marker);

//            var Arritem = $scope.randomMarkers[marker.idKey];

            var i = $scope.randomMarkers.indexOf(marker);

//            console.log('spotted ',i, $scope.randomMarkers[i]);
            $scope.randomMarkers.splice(i, 1);
        };

        $scope.clickedOnMarker = function(selMarker){
            console.log('clicked on marker ',selMarker);
            $scope.model.hasChecked = selMarker.checked;
//            $scope.model.key = selMarker.idKey;
            $scope.model.keyID = selMarker.idKey;
            $scope.isChecked = selMarker.checked;
//            dummyVar = selMarker.checked;
            console.log('isChecked variable:',$scope.isChecked);
        };

        console.log();

        $scope.castToNumberMap = function(toBeCasted){
            $scope.map.zoom = parseInt(toBeCasted);


        }


    }
);
