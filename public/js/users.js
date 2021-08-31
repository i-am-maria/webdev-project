$(function() {
	const get = $.get("http://localhost:3000/buildUsers");
	get.done(showUsers);
	get.fail(userRetrieveError);
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
	$("#users-list").empty();
	$(wrapper).appendTo("#users-list");
}

function userRetrieveError(response, status, xhr) {
    console.log("An error occured when retrieving the users. The stacktrace is as follows: " + response);
}