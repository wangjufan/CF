
/* Copyright 2010-2019 The MathWorks, Inc. */

window.JST = window.JST || {};

$(document).ready(function() {
    $.getScript('/help/search/plugin/underscore-min.js', function () {
        $.ajax({
            url: '/help/search/js/views/templates/suggestions_helpcenter.txt?ts=20200101',
            method: 'get',
            dataType: 'html',
            success: function(data) {
                var $data = $(data);
                JST['pagesuggestion'] = _.template($.trim($data.filter('#pagesuggestion').html()));
                JST['wordsuggestion'] = _.template($.trim($data.filter('#wordsuggestion').html()));
                JST['morepages'] = _.template($.trim($data.filter('#morepages').html()));
                JST['morewords'] = _.template($.trim($data.filter('#morewords').html()));
                JST['suggestionsdropdown'] = _.template($.trim($data.filter('#suggestionsdropdown').html()));
            }
        });
    });
    var searchField = getSearchField();
    searchField.keyup(function(evt) {
        validateSearchForm($(this));
        // Show suggestions whenever the search text has changed or the user hits the down arrow.
        if (isSearchFieldChanged(searchField) || (!$("#suggestions").is(':visible')) && evt.keyCode == 40) {
            searchField.data('last', searchField.val());
            findSuggestions(searchField);
        }
    });

    // Hide the suggestions for any click in the document, except clicks in the search field.  Later we will also
    // exempt clicks in the suggestion area itself.
    $(document).click(function() {
        hidePopups(false);
    });
    searchField.click(function(evt) {
        validateSearchForm($(this));
        evt.stopPropagation();
    });

    $("#submitsearch").prop('disabled', true);

    $(window).resize(function() {
        var tokenizedDiv = searchField.closest('.tokenized');
        //Resize the div only if it has been tokenized, and the nuggets have been applied.
        if (tokenizedDiv.find('.tokens:first').children().length > 0) {
            tokenizedDiv.trigger('token.resize');
        }
    });
});

function validateSearchForm(searchField) {
    var val = searchField.val();
    if (val.length === 0) {
        $("#submitsearch").prop('disabled', true);
    } else {
        $("#submitsearch").prop('disabled', false);
    }
}

function isSearchFieldChanged(searchField) {
    return searchField.data('last') != searchField.val();
}

function findSuggestions(searchField) {
    var searchText = searchField.val();
    if (isValidSuggestionsText(searchText) || searchText.match(/[^\w\s]+/)) {
        var source = getSource();
        var params = {
            'q':searchText,
            'selectedsource':source
        };
        switch (source) {
            case '3p':
                getSuggestionsFromMessageService(searchField, params);
                break;
            default:
                getSuggestionsFromWebApp(searchField, params);
        }
    } else {
        hidePopups(false);
    }
}

function getSuggestionsFromWebApp(searchField, params) {
    var url = getSuggestionsUrl('suggest', params);
    $.get(url, function(data) {
        displaySuggestionHtml(searchField, data);
    });
}

function getSuggestionsFromMessageService(searchField, params) {
    var services = {"messagechannel":"suggest"};
    requestHelpService(params, services, function(data) {
        displaySuggestionHtml(searchField, data);
    });
}

function displaySuggestionText(index, value) {
    if (value.length > 0) {
        if (index % 2 === 0) {
            return value;
        } else {
            return "<span class=\"suggestion_highlight\">" + value + "</span>";
        }
    } else {
        return "";
    }
}


function formatSuggestions(json) {
    var viewHelpers = {
        displaySuggestionText: displaySuggestionText,
        pageSuggestionTemplate: JST['pagesuggestion'],
        wordSuggestionTemplate: JST['wordsuggestion'],
        morePagesTemplate: JST['morepages'],
        moreWordsTemplate: JST['morewords']
    };
    _.extend(json, viewHelpers);
    return $(JST['suggestionsdropdown'](json));
}

function displaySuggestionHtml(searchField, json) {
    if ($.isEmptyObject(json) || !suggestionsFound(json)) {
        hidePopups(true);
        return;
    }
    var searchText = json.searchtext;
    var currentSearchText = searchField.data('last');
    if (searchText === currentSearchText) {
        var html = formatSuggestions(json);
        var suggestionsElt = getCleanSuggestionsElement();
        if (html.length > 0) {
            suggestionsElt.append(html);
            if (suggestionsElt.is(':hidden')) {
                showSuggestions();
            }
            suggestionsElt.attr('suggestfor', searchField.val());
        } else {
            hidePopups(false);
        }
    }
}

function suggestionsFound(data) {
    return (data.pages && data.pages.length > 0) || (data.words && data.words.wordlist.length > 0);
}

function getCleanSuggestionsElement() {
    var suggestionsElt = $('#suggestions');
    suggestionsElt.data('selectionMode', 'keyboard');
    if (suggestionsElt.length == 0) {
        suggestionsElt = $('<div id="suggestions" class="typeahead_v2"></div>');
        $(getSearchForm()).after(suggestionsElt);
        if (addSuggestionHandlers) {
            addSuggestionHandlers(suggestionsElt);
        }
    } else {
        suggestionsElt.empty();
    }

    var searchField = getSearchField();
    var availablePopupWidth = getPopupWidth(searchField);
    suggestionsElt.width(availablePopupWidth);

    return suggestionsElt;
}

function showSuggestions() {
    var suggestionsElt = $('#suggestions');
    suggestionsElt.slideDown('fast');
    getSearchField().unbind('keydown.searchfield-suggestions');
    if (typeof handleKeyDown === "function") {
        getSearchField().bind('keydown.searchfield-suggestions', function (evt) {
            return handleKeyDown(evt);
        });
    }
}

function hidePopups(focusSearchField) {
    $('#suggestions').remove();
    var sf = getSearchField();
    sf.unbind('keydown.searchfield-suggestions');
    if (focusSearchField) {
        sf.get(0).focus();
    }

    var allCats = $('#all-categories');
    if (allCats.is(':visible')) {
        allCats.hide();
    }
    var allProds = $('#all-products');
    if (allProds.is(':visible')) {
        allProds.hide();
    }
}

function getSearchForm() {
    return document.forms['docsearch_form'];
}

function getSearchField() {
    var searchField = $('#docsearch');
    if (searchField.length == 0) {
        searchField = $('#searchfield');
    }
    return searchField;
}

function getSource() {
    var sourceField = $('#selected_source');
    var source = sourceField ? sourceField.val() : "mw";
    if (!source || source.length == 0) {
        source = 'mw';
    }
    return source;
}

function go(page) {
    document.location = setPageSuggestionTracking(page);
}

function setPageSuggestionTracking(pageuri) {
    if (pageuri !== null && pageuri.indexOf("?") !== -1) {
        return pageuri + "&s_tid=doc_ta";
    } else {
        return pageuri + "?s_tid=doc_ta";
    }
}

function search(q) {
    var sf = getSearchField();
    sf.val(q);
    var form = getSearchForm();
    $(form).append('<input type="hidden" name="s_tid" value="doc_ta" />');
    $(form).trigger('submit');
    form.submit();
    hidePopups(false);
}

function getSuggestionsUrl(action, params) {
    var docSet = getDocSet();
    var suggestUrl = "/help/search/" + action +  "/" + docSet;
    var lang = $('#docsearch_form').data('language');
    var release = $('#docsearch_form').data('release');
    suggestUrl += "/" + lang + "/" + release;
    params.width = getPopupWidth(getSearchField());
    suggestUrl = suggestUrl + '?' + $.param(params);
    return getRequestArchiveParameter(suggestUrl);
}

function getRequestArchiveParameter(searchUrl) {
    var pageLocation = window.location.href;
    if (isRequestFromArchiveArea(pageLocation)) {
        return searchUrl + "&requestfromarchive=true";
    }
    return searchUrl;

}

function isRequestFromArchiveArea(pageUrl) {
    return /.*\/help\/releases\/R20\d\d[ab]\/.*/.test(pageUrl);
}

function getDocRoot() {
    if (!window.docroot) {
        window.docroot = getDocLocationInfo().docRoot;
    }
    return window.docroot;
}

function getDocSet() {
    return getDocLocationInfo().docSetName;
}

function getDocLocationInfo() {
    var pageLoc = $(location).attr("href");
    
    var release = "R2020a";
    var helpDirMappings = [{"helpDir":"","docSetName":"doccenter"}];

    for (var i = 0; i < helpDirMappings.length; i++) {
        var mapping = helpDirMappings[i];
        var urlPattern = new RegExp("/help(/releases/" + release + ")?" + mapping.helpDir + "(?=/|$)");
        var result = urlPattern.exec(pageLoc);
        if (result && result.length > 0) {
            return {"docSetName" : mapping.docSetName, "docRoot" : result[0] + "/"};
        }
    }

    return {"docSetName" : "doccenter", "docRoot" : "/help/"};
}

function more(q, type) {
    var params = {'q':q, 'type':type, 'start':5};
    var url = getSuggestionsUrl('suggestmore', params);
    $.get(url, function(data) {
        $('#more' + type).remove();
        displayMoreSuggestions(type, data);
    });
}

function displayMoreSuggestions(type, json) {
    var template = type !== "word" ? JST['pagesuggestion'] : JST['wordsuggestion'];
    _.extend(json, {displaySuggestionText: displaySuggestionText});
    var html = $($.trim(template(json)));
    $('#' + type + 'list').append(html);
}

function isValidSuggestionsText(searchText) {
    if (!searchText) {
        return false;
    }
    var words = searchText.split(/\s+/);
    for (var i = 0; i < words.length; i++) {
        if(!words[i].match(/\w+/)) {
            return false;
        }
    }
    return true;
}

function getPopupWidth(searchField) {
    var width = searchField.outerWidth();
    var parentDiv = searchField.closest('.input-group');
    if (parentDiv.length > 0) {
        // For the helpcenter suggestions dropdown we want the width to be 100px wider than it was in doccenter.
        // The doccenter value is 2 pixels less than the outer width of the search field parent div, so here we add 98.
        width = parentDiv.outerWidth() + 98;
    }
    return width;
}

function addSuggestionHandlers(suggestionsElt) {
    suggestionsElt.on('keydown', handleKeyDown);
    suggestionsElt.on('click', function(evt) {
        evt.stopPropagation();
    });
}

function handleKeyDown(evt) {
    var key = evt.keyCode ? evt.keyCode : evt.charCode;
    if (key === 27) {
        hidePopups(false);
    } else if (key === 13) {
        var selectedLink = $(".selected-suggestion").find("a");
        if (selectedLink.size() > 0) {
            evt.preventDefault();
            selectedLink[0].click();
        }
    } else if (key === 40 || key === 38) {
        handleArrowKey(key);
    }
}

function handleArrowKey(key) {
    var selected = $('.selected-suggestion');
    var suggestionarea = selected.closest('.suggestionarea');
    if (selected.length > 0) {
        var newselection;
        if (key === 40) {
            newselection = selected.nextAll('.suggestion:first');
        } else if (key === 38) {
            newselection = selected.prevAll('.suggestion:first');
        }
        newselection.addClass('selected-suggestion');
        if (newselection.length === 0) {
            // We're at the end of a section, jump to the next.
            var newareaselectionparent = suggestionarea.parent();
            var newareaselection;
            if (key === 40) {
                newareaselection = newareaselectionparent.next().find('.suggestion:first');
            } else if (key === 38) {
                newareaselection = newareaselectionparent.prev().find('.suggestion:last');
            }
            selected.removeClass('selected-suggestion');
            return newareaselection.addClass('selected-suggestion');
        } else {
            selected.removeClass('selected-suggestion');
        }
        suggestionarea.scrollTop(suggestionarea.scrollTop() + (selected.offset().top - suggestionarea.offset().top));
    } else {
        if (key === 40) {
            return $('.suggestion:first').addClass('selected-suggestion');
        } else if (key === 38) {
            return $('.suggestion:last').addClass('selected-suggestion');
        }
    }
}