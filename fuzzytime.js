/**
 * A jQuery-free verison of the popular 'TimeAgo' plugin, configured as an AngularJS filter.
 * @version v1.0.0
 * @link https://github.com/matt-neill/angular-fuzzytime
 * @author Matt Neill <matt@poetretail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function ( window, angular, undefined ) {
'use strict';

angular.module('angular.fuzzytime', [])
 .filter('fuzzytime', function () {
   return function (date, prefix, suffix, capitalize) {
     var FuzzyTime;
     date = date.replace(/-/g, '/'); //replace any hyphens (MySQL time) with slashes as not to break iOS devices
     prefix = prefix !== undefined ?     prefix || false : 'updated';
     suffix = suffix !== undefined ? ' '+suffix || false : ' ago';
     var d   = { };
     var now = new Date();
     date    = new Date(date);

     if (date){ //calculate number of days have passed
       d.date = Math.round((now-date)/(1000*60*60*24));

     //years
       if (d.date > 360){
         var leftovers = d.date % 360;
         d.date = Math.floor(d.date/360);//round down
         if (leftovers >= 90 && leftovers < 300) {
           FuzzyTime = 'over '+ (d.date == 1 ? 'a' : d.date) + ' year'+ (d.date == 1 ? '' : 's') + (suffix ? suffix : '');
         }
         else if (leftovers >= 300){
           d.date++;
           FuzzyTime = d.date + ' years' + (suffix ? suffix : '');
         }
         else {
           FuzzyTime = (d.date == 1 ? 'a' : d.date) + ' year'+ (d.date == 1 ? '' : 's') + (suffix ? suffix : '');
         }
       }

     // months
       else if ( d.date >= 24 ){ //if the number of days is over 20, it's about more than a month
         var leftovers = d.date % 28;
         d.date = Math.floor(d.date/28);//round down
         if (leftovers > 24) {
           FuzzyTime = (d.date == 1 ? 'a' : d.date) + ' month'+ (d.date == 1 ? '' : 's') + (suffix ? suffix : '');
         }
         else {
           d.date++;
           FuzzyTime = (d.date == 1 ? 'a' : d.date) + ' month'+ (d.date == 1 ? '' : 's') + (suffix ? suffix : '');
         }
       }

    //weeks
       else if (d.date < 24 && d.date >= 7) { //if more than 7 days, but less than 24
         d.date = Math.floor(d.date/7); // calculate weeks
         FuzzyTime = (d.date == 1 ? 'a' : d.date) + ' week'+ (d.date == 1 ? '' : 's') + (suffix ? suffix : '');
       }

   //days
       else if (d.date >= 1 && d.date < 7){
         if (d.date === 1){  // if only one day has elapsed
           FuzzyTime = 'yesterday';
         }
         else {
           FuzzyTime = ' '+ d.date + ' days' + (suffix ? suffix : '');
         }
       }

   //hours
       else if (d.date === 0 ){ //if no days have passed
         d.date = Math.floor((now-date)/(1000*60*60)); //calculate hours
         FuzzyTime = ''+ (d.date == 1 ? 'an' : d.date) + ' hour'+ (d.date == 1 ? '' : 's') + (suffix ? suffix : '');

         if (d.date === 0 ){ //if no hours have passed
           d.date = Math.round((now-date)/(1000*60));  // calculate minutes

   //minutes
           FuzzyTime = (d.date >= 50 ? 'an hour' : '' + d.date + ' minutes') + (suffix ? suffix : '');

           if (d.date > 25 && d.date < 40){
             FuzzyTime = 'half an hour' + (suffix ? suffix : '');
           }

           if (d.date <= 4){
             FuzzyTime = d.date < 1 ? 'just now' : 'a couple of minutes' + (suffix ? suffix : '');
           }
         }
       }
     }

     if ( prefix ) { FuzzyTime = prefix+' '+FuzzyTime; }
     if ( capitalize ) { FuzzyTime = FuzzyTime.charAt(0).toUpperCase() + FuzzyTime.slice(1); }

     return FuzzyTime;
   };
 });


 /**
  * @ngdoc module
  * @name fuzzytime
  * @description
  * 'Fuzzy' time as an AngularJS filter
  */

 angular.module('fuzzy-time', ['angular.fuzzytime',]);
 })( window, window.angular );
