var $table = $("#users-table");
var $create = $("#create");
var $cancel = $("#cancel");
var $form = $("#form");
var $save = $("#saveChanges");
var $country =$("#country");
 $.getJSON("/user", function (users) {
    for (var i = 0; i < users.length; i++) {
        var $tr = $("<tr class='tr'></tr>")
            .appendTo($table);

        $("<td></td>")
            .text(users[i].fullName)
            .appendTo($tr);
        $("<td></td>")
            .text(users[i].profession)
            .appendTo($tr);
        $("<td></td>")
            .text(users[i].shortInfo)
            .appendTo($tr);
        var $td = $("<td></td>")
            .appendTo($tr);
       $("<button class='editBtn' >Edit</button>")
           .appendTo($td)
           .attr("data-target",users[i].id);
        var $removeBtn = $("<button class='remove'>Remove</button>")
            .appendTo($td);
        $removeBtn.attr("data-target",users[i].id);
    }
});
$create.click(function (users) {
    $(document.forms["users-edit"]).removeClass("users-edit-hidden");
    clearForm({});
    $save.text("Save changes");
    readCountry();
});

$cancel.click(function (el) {
    el.preventDefault();
    $(document.forms["users-edit"]).addClass("users-edit-hidden");

});
$table.click(function(el){
    if(el.target.className==="remove"){
       remove($(el.target).attr("data-target"));
        $(el.target).parents("tr").remove();
    } else if(el.target.className==="editBtn"){
        $(document.forms["users-edit"]).removeClass("users-edit-hidden");
        editUser($(el.target).attr("data-target"));
        $save.text("update");
        $save.click(function(e){
            e.preventDefault();
            postUser();
        })
    }
});
$form.submit(function(el){
    el.preventDefault();
    postUser();
});
function editUser(id){
       readCountry();
    $.ajax({
        url: "/user?id="+id,
        dataType: "json",
        type: "get",
        contentType: "application/json",
        success: function(thisObject){
            clearForm(thisObject);
        }
    })
}
function remove(id){
    $.ajax({
        url: "/user?id="+ id,
        dataType: "json",
        type: "delete"
    })
}
function postUser(user){
    var o={
        fullName: $("#fullname").val(),
        birthday: $("#birthday").val(),
        profession: $("#profession").val(),
        address: $("#address").val(),
        shortInfo: $("#short-info").val(),
        fullInfo: $("#full-info").val(),
        id: $("#id").val(),
        country: $("#country").val()
    };
    $.ajax({
        url: "/user",
        dataType: "json",
        type: o.id?"put":"post",
        contentType: "application/json",
        data: JSON.stringify(o),
        success: function(){
            $(document.forms["users-edit"]).addClass("users-edit-hidden");
            clearForm({});
        }
        })
}
function clearForm(user){
    $("#fullname").val(user.fullName);
    $("#birthday").val(user.birthday);
    $("#profession").val(user.profession);
    $("#address").val(user.address);
    $("#short-info").val(user.shortInfo);
    $("#full-info").val(user.fullInfo);
    $("#id").val(user.id);
    $("#country").val(user.country);
}
function readCountry(){
    $.getJSON("/user", function (users) {
        for (var i = 0; i < users.length; i++) {
            $("<option></option>")
                .text(users[i].country)
                .appendTo($country);
        }
    });
}
