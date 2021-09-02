$(function() {
	const get = $.get("http://localhost:3000/buildlist");
	get.done(showItems);
	get.fail(itemRetrieveError);
});

$(function() {
	const get = $.get("http://localhost:3000/loginout");
	get.done(showNavLogin);
	get.fail(console.error());
});

function showItems(rows, status, xhr) {
	let wrapper = `
	<table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>`;
	for (let i = 0; i < rows.length; i++) {
		wrapper += `
		<tr>
            <td>${rows[i].name}</td>
            <td>${rows[i].itemType}</td>
            <td>${rows[i].quantity}</td>
            <td>
              <a class="delete" title="Delete" data-toggle="tooltip" onClick="deleteItem(${rows[i].name})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg></a>
          </td>
          </tr>`;
	}
	wrapper += `</tbody>
			</table>`;
	$("#shopping-list").empty();
	$(wrapper).appendTo("#shopping-list");
  $("#formNewItem").validate({
    rules: {
      itemName: {
        required: true,
        minlength: 3,
        maxlength: 50,
        string: true
      },
      itemType: {
        required: true
      },
      quantity: {
        required: true,
        number:true,
        min: 1
      }
    },
    messages: {
      itemName: {
          required: 'Item name can not be empty.',
          minlength: 'Item name must be at least 3 characters long.',
          maxlength: 'Item name too long.'
      },
      itemType: {
        required: "You must select an item type."
      },
      quantity: {
        required: "You must enter the quantity.",
        number: "The quantity must be a number.",
        min: "The quantity has to be at least 1."
      }
  },
    submitHandler: addItem,
  });
  
  $("#btnSubmit").click(function() {
    $("#formNewItem").submit();
  });
}

function showNavLogin(response, status, xhr) {
	$(response.navtext).appendTo("#navigation");
}

function addItem() {
  data = {
    name: $("#itemName").val(),
    itemType: $("#item-type option:selected").text(),
    quantity: $("#quantity").val()
  }
  const add = $.post("http://localhost:3000/addItem", data);
  add.done(showItems);
  add.fail(itemModifyError);
}

$("#search-items").keyup(function() {
	const searchdata = {
		search: $("#search-items").val()
	}
	const post = $.post("http://localhost:3000/findItem", searchdata);
	post.done(showItems);
	post.fail(itemRetrieveError);
});

function itemRetrieveError(response, status, xhr) {
    console.log("An error occured when retrieving the list. The stacktrace is as follows: " + response);
}

function itemModifyError(response, status, xhr) {
  console.log("An error occured when modifying the shopping list. The stacktrace is as follows: " + response);
}

$('#btnClear').click(function() {
  location.reload();
});