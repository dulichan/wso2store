var updateSortUI = function () {
    $('#ul-sort-assets').find('a[data-sort="' + store.asset.paging.sort + '"]').addClass('selected-type');
};

$(function() {
    updateSortUI();
});


$( "#os-select" ).change(function() {	
	var uri = window.location.pathname + window.location.search;
	location.href = updateQueryStringParameter(uri, 'os', $(this).val());
});

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
  separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}


$(document).ready(function() {
	var os = getURLParameter('os');
	$('#os-select').val(os);

});


function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}