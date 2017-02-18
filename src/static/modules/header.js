/*
 *********************************************************************************
 *                     Copyright (C) 2017 wystan
 *
 *       filename: header.js
 *    description:
 *        created: 2017-02-18 16:22:28
 *         author: wystan
 *
 *********************************************************************************
 */

define(function () {
    return  {
        init: function () {
            var header = $('#header');
            header.find("a").unbind('click').click(function(){
                header.find('a[current="true"]').removeAttr('current');
                $(this).attr('current', 'true');
            });;
        }
    }
});




/************************************* END **************************************/
