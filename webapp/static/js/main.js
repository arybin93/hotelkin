"use strict";

const MAIN_URL = window.location.protocol + "//" + window.location.host + "/";
var user_id = 0;
const DEVELOP = true;

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


function gen_wish_item(value) {

    var div = document.createElement("div");
    div.className = "well wish-item";

    var title = document.createElement("h4");
    title.textContent = value['text'];

    var text = document.createElement("p");
    text.textContent = value['description'];

    var link = document.createElement("a");
    link.href = value['link'];
    link.textContent = 'Cсылка';

    div.appendChild(title);
    div.appendChild(text);
    div.appendChild(link);

    return div
}


function gen_my_wish_item(value) {
    var div = document.createElement("div");
    div.className = "well wish-item";

    var title = document.createElement("h4");
    title.textContent = value['text'];

    var text = document.createElement("p");
    text.textContent = value['description'];

    div.appendChild(title);
    div.appendChild(text);

    console.log(value['link']);
    if (value['link']) {
        var link = document.createElement("a");
        link.href = value['link'];
        link.textContent = 'Cсылка';
        div.appendChild(link);
    }

    // add buttons
    var control_span = document.createElement("span");
    control_span.style = "float:right";

    var edit_a = document.createElement("a");
    edit_a.className = "icon";
    edit_a.href = value['id'];
    edit_a.title = "Редактировать хотелку";
    var span_edit = document.createElement("span");
    span_edit.className = "fa fa-pencil glyphicon glyphicon-pencil";
    edit_a.appendChild(span_edit);

    var delete_a = document.createElement("a");
    delete_a.className = "icon";
    delete_a.href = value['id'];
    delete_a.title = "Удалить хотелку";
    var span_delete = document.createElement("span");
    span_delete.className = "fa fa-trash glyphicon glyphicon-trash";
    delete_a.appendChild(span_delete);

    control_span.appendChild(edit_a);
    control_span.appendChild(delete_a);

    div.appendChild(control_span);

    return div
}

if (!DEVELOP) {
    VK.init(function() {
        console.log('done');
        }, function() {
        console.log('fail');
    }, '5.71');
}

function get_friends() {
    VK.api("friends.getAppUsers", {fields: "photo_medium", "test_mode": 1}, function(data) {
        console.log(data);
        console.log($("#list_friends"));
    });
}

function get_list_of_wishes(user_id) {
    console.log('get_list_of_wishes');
    var wish_list = $("#list_wishes");

    // clear list
    $('.wish-item').remove();

    // fill list
    $.ajax({
        url: MAIN_URL + 'api/v1/user/' + user_id.toString() + '/wishes' ,
        type: "get",
        success:function(data) {
            $.each(data.result, function( index, value ) {
                if (value['vk_id'].toString() == user_id) {
                    console.log('my list');
                    $(wish_list).append(gen_my_wish_item(value));
                } else {
                    console.log('friends');
                    $(wish_list).append(gen_wish_item(value));
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
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
});

$(document).ready(function() {
    // get info about current user
    user_id = $.getUrlVar('viewer_id');
    if (DEVELOP) {
        user_id = 1234;
    }

    console.log(user_id);

    // get list of wishes for current user
    get_list_of_wishes(user_id);

    // get list of friends
    if (!DEVELOP) {
        get_friends();
    }

    $("#add_wish_btn").click(function(event) {
        console.log('add wish');

        var name = $('#id_name').val();
        var description = $('#id_description').val();
        var link = $('#id_link').val();

        $.ajax({
            url: MAIN_URL + 'api/v1/user/' + user_id.toString() + '/wishes',
            type: "post",
            data: {
                'name': name,
                'description': description,
                'link': link
            },
            success:function(data) {
                // get actual list
                get_list_of_wishes(user_id);
            }
        });
    });

    // listener for if click on friend, get list of wish for friend
    $("#list_friends").click(function() {
        console.log('click friend');
        console.log('test');
    });
});
