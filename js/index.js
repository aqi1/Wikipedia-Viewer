$(document).ready(main);

function main() {

  // Cache selectors
  var $results = $(".results");
  var $searchBar = $("#searchBar");
  
  // Searches wikipedia and appends results
  function searchWiki(arg) {
    var jsonurl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + arg + "&callback=?";
    var handleJSON = function(json) {
      if (json.query == null) {
        $results.text("No results found");
      } else {
        var pages = Object.keys(json.query.pages);
        for (var i = 0; i < pages.length; i++) {
          var cardDiv = document.createElement("div");
          var cardTitle = document.createElement("a");
          var cardDesc = document.createElement("p");

          var cardTitleText = document.createTextNode(json.query.pages[pages[i]].title);
          var cardDescText = document.createTextNode(json.query.pages[pages[i]].extract);

          cardTitle.setAttribute("href", "https://en.wikipedia.org/?curid=" + json.query.pages[pages[i]].pageid);
          cardTitle.appendChild(cardTitleText);
          cardDesc.appendChild(cardDescText);
          cardDiv.appendChild(cardTitle);
          cardDiv.appendChild(cardDesc);
          $results.append(cardDiv);
        }
      }
    };
    $.getJSON(jsonurl, handleJSON);
  }

  // Do stuff when enter is pressed
  $searchBar.keypress(function(e) {
    if (e.which == 13) {
      $results.empty();
      searchWiki($searchBar.val());
      $results.hide().fadeIn(2000);
    }
  });
};