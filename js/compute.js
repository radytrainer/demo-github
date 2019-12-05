
var member;
$(document).ready(function () {
    $('button').on('click', () => {
        var newMember = $('#members').val();
        if(newMember != "") {
            requestApi();
            member = newMember;
        }
    })
});

function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => getRecipe(data),
        error: () => getError(),
    });
}
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
function getError() { console.log("Error") }
function getRecipe(myData) {
    myData.recipes.forEach( item => {
        computeRecipe(item);
    });
}
function computeRecipe (recipe) {
    var result = "";
    result += `
        <tr>
            <td><img src="${recipe.iconUrl}" width="100"></td>
            <td>${recipe.name}</td>
            <td>${recipe.nbGuests * addMember(member)}</td>
        </tr>
    `;
    printOut(result);
}
function printOut(out) {
    $('#recipe').append(out);
}

function addMember(member) {
    return  parseInt(member);
}
