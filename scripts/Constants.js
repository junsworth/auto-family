'use strict';
/**
 * Created by jonathanunsworth on 15/02/12.
 */
angular.module('familyCarsApp').constant('cfg',{
  baseUrl : 'http://192.168.1.20:3000/',
  imageUrl : 'images/',
  imageUploadUrl : 'images/upload/',
  videoUrl : 'videos/',
  videoUploadUrl : 'videos/upload/'
}).constant('UserType', {
    Admin: 1,
    Staff: 2,
    User: 3
})
