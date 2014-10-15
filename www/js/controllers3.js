'use strict';
/**
 * Created by Costas Zarifis on 10/12/14.
 */


angular.module('controllers',[]).controller('MapCt', function ($scope) {


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




        $scope.model = {hasChecked:true, keyID: undefined, currLat: 0, currLong: 0};


        // mention the difference here if we don't use model the two way databinding doesn't work
        // more info here: http://stackoverflow.com/questions/13632042/angularjs-two-way-data-binding-fails-if-element-has-ngmodel-and-a-directive-wit
        // and here:
        // http://stackoverflow.com/questions/9682092/databinding-in-angularjs
        $scope.isChecked = true;
//        $scope.keyID = 1;
//        $scope.randomMarkers[15];

        //var dummyVar = true;
        $scope.pushNotificationChange = function(key) {

            console.log('Push Notification Change');
//            console.log('was isChecked:',dummyVar);
            var variab = $scope.randomMarkers[key];

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


        





    }
);
