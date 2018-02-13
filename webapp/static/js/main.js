"use strict";

const MAIN_URL = window.location.protocol + "//" + window.location.host + "/";
var user_id = 0;

var wish_item_templete = '';

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name) {
    return $.getUrlVars()[name];
  }
});
/*
VK.init(function() {
    console.log('done');
    }, function() {
    console.log('fail');
}, '5.71');

function get_friends() {
    VK.api("friends.getAppUsers", {fields: "photo_medium", "test_mode": 1}, function(data) {
        console.log(data);
        console.log($("#list_friends"));
    });
}
*/
function get_list_of_wishes(user_id) {
    console.log('get_list_of_wishes');
    var wish_list = $("#list_wishes");
    // clear list
    $('#list_wishes .list-group-item').remove(":contains('wish')");
    $.ajax({
        url: MAIN_URL + 'api/v1/wishes/' + user_id.toString(),
        type: "get",
        data: {
            user_id: user_id
        },
        success:function(data) {
            console.log(wish_list);

            $.each(data.result, function( index, value ) {
                console.log(user_id);
                console.log(value['vk_id']);
                if (value['vk_id'].toString() == user_id) {
                    console.log(value['id']);
                    console.log(value['text']);
                    console.log(value['description']);
                    console.log(value['vk_id']);

                    $(wish_list).append('' +
                         '<div class="list-group-item wish">' +
                            '<div class="wish-item">' +
                                '<div class="text">' +
                                    '<h4>' + value['text'] + '</h4>' +
                                    '<p>' + value['description'] + '</p>' +
                                    '<a href=\"' + value['link'] + '\">Link</a>' +
                                '</div>' +
                                '<div> ' +
                                     '<a class="icon" href="" title="Edit wish"> '+
                                     '<span class="fa fa-pencil glyphicon glyphicon-pencil"></span>' +
                                     '</a>' +
                                     '<a class="icon" href="" title="Delete wish">' +
                                     '<span class="fa fa-trash glyphicon glyphicon-trash"></span>' +
                                     '</a>' +
                                '<div/>' +
                         '</div>' +
                        '</div>');
                } else {
                    console.log('friends');
                }
            });
            console.log(data);
        }
    });
}

function booking_wish() {
    // request to my server
    console.log('booking_wish');
}

function like_wish() {
    // request to my server
    console.log('like wish');
}

function get_top_wishes() {
    // request to my server
    console.log('get_top_wishes');
}

$(document).ready(function() {
    // get info about current user
    user_id = $.getUrlVar('viewer_id');
    user_id = '1234';
    console.log(user_id);

    // get list of wishes for current user
    get_list_of_wishes(user_id);

    // get list of friends
    /*get_friends();

    // add new friends listener
    $("#add_friend").click(function() {
        console.log('invite new friends');
         VK.callMethod("showInviteBox");
    });
    */
    // listener for if click on friend, get list of wish for friend
    // listener for add new wish
    // listener for like wish
    // listener for booking wish
});
