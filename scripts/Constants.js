'use strict';
/**
 * Created by jonathanunsworth on 15/02/12.
 */
angular.module('familyCarsApp').constant('cfg',{
  baseUrl : 'http://10.0.0.9:3000/',
  imageUrl : 'images/',
  imageUploadUrl : 'images/upload/'
}).constant('UserType', {
    Admin: 1,
    Staff: 2,
    User: 3
})
