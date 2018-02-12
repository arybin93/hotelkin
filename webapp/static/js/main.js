"use strict";

var user_id = 0;

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
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

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

function get_list_of_wishes(user_id) {
    // request to my server
    console.log('get_list_of_wishes');
    console.log($("#list_wishes"));
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
    console.log(user_id);

    // get list of wishes for current user
    get_list_of_wishes(user_id);

    // get list of friends
    get_friends();

    // add new friends listener
    $("#add_friend").click(function() {
        console.log('invite new friends');
         VK.callMethod("showInviteBox");
    });

    // listener for if click on friend, get list of wish for friend
    // listener for add new wish
    // listener for like wish
    // listener for booking wish
});
