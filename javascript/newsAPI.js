google.load("search", "1");

var newsSearch;

function searchComplete() {
    $("#newsBox").html("");

    console.log(newsSearch.results);
    console.log(newsSearch.results.length);
    if (newsSearch.results && newsSearch.results.length > 0) {
        var newArticle = $("<a>")
            .attr("href", newsSearch.results[i].url)
            .html(newsSearch.results[i].title);
        $("#newsBox").append(newArticle);
    }
}

function onLoad() {

    // Create a News Search instance.
    newsSearch = new google.search.NewsSearch();
    console.log(newsSearch);

    // Set searchComplete as the callback function when a search is 
    // complete.  The newsSearch object will have results in it.
    newsSearch.setSearchCompleteCallback(this, searchComplete, null);

    // Specify search quer(ies)
    newsSearch.execute('Barack Obama');

    // Include the required Google branding
    // google.search.Search.getBranding('branding');
}

// Set a callback to call your code when the page loads
google.setOnLoadCallback(onLoad);
console.log("GOOGLE NEWS");