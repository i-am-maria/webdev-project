$(function() {
	const get = $.get("http://localhost:3000/buildusers");
	get.done(showUsers);
	get.fail(userRetrieveError);
});

$(function() {
	const get = $.get("http://localhost:3000/loginout");
	get.done(showNavLogin);
	get.fail(console.error());
});

function showUsers(rows, status, xhr) {
	let wrapper = `
	<table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>`;
	for (let i = 0; i < rows.length; i++) {
		wrapper += `
        <tr>
            <td>${rows[i].username}</td>
            <td>${rows[i].role}</td>
        </tr>`;
	}
	wrapper += `</tbody>
			</table>`;
	$("#user-list").empty();
	$(wrapper).appendTo("#user-list");
}

$("#search-users").keyup(function() {
	const searchdata = {
		search: $("#search-users").val()
	}
	const post = $.post("http://localhost:3000/findUser", searchdata);
	post.done(showUsers);
	post.fail(userRetrieveError);
});

function showNavLogin(response, status, xhr) {
	$(response.navtext).appendTo("#navigation");
}

function userRetrieveError(response, status, xhr) {
    console.log("An error occured when retrieving the users. The stacktrace is as follows: " + response);
}