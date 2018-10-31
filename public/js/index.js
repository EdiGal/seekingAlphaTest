const state = {
    users: null
}
$(document).ready(function(){
    $.get("/users").done(users => {
        state.users = users;
        buildUsers()
    })
})

function buildUsers(){
    state.users.map(buildUser)
}

function buildUser(user){
    let buttonFunction = user.follow ? stopFollow : startFollow
    let buttonText = user.follow ? 'following' : 'follow'

    let button = `<button user_id="${user.userID}" id="button_userid_${user.userID}"> ${buttonText} </button>`
    $("#users").append(`<li id="li_user_id_${user.userID}"><h3>${user.username}</h3> <h4 style="display:inline">Group ${user.groupname}</h4> ${user.followers} followers ${button}</li>`)
    $("#button_userid_"+user.userID).click(buttonFunction)
}

async function startFollow(){
    const userID = $(this).attr("user_id")
    $.post("/follow/"+userID).done(() => {
        let user = state.users.find(user => user.userID==userID)
        user.follow = true
        user.followers++
        $("#users").empty()
        buildUsers()
    })
}

async function stopFollow(){
    const userID = $(this).attr("user_id")
    $.ajax({
        url: "/follow/"+userID,
        type: "DELETE"
    }).done(() => {
        let user = state.users.find(user => user.userID==userID)
        user.follow = false
        user.followers--
        $("#users").empty()
        buildUsers()
    })
}