$(document).ready(function () {
    registerMatlabCommandDialogAction();
    registerOpenExampleAction();
});

function registerOpenExampleAction() {
  var openExampleButtons = $('.examples_short_list a.btn[href^="matlab:"]');
  $.each(openExampleButtons, function() {
    var href = $(this).attr('href');
    $(this).removeClass();
    $(this).closest('.panel').addClass('panel-default');
    $(this).closest('.panel-body').removeAttr('style').addClass('add_padding_10');
    var inBox = false;
    if ($(this).closest('.panel-body').find('.example_product_list').length >= 1) {
      inBox=true;
    }
    var parentDiv = $(this).parent();
    var parentPara = $('<p class="text-center add_margin_0"></p>')
    parentDiv.append(parentPara);
    parentPara.append($(this));
    $(this).html('View MATLAB Command');
    addOpenExampleLinkClickHandler($(this));
    var matlabCommand = getMatlabCommand(href);
    var openWithCommand = getOpenWithCommand(matlabCommand);
    if (window.ow !== undefined &&  openWithCommand) {
      var component = openWithCommand.split("/")[0];
      var exampleName = openWithCommand.split("/")[1];
      var config = getOpenWithConfig(component, exampleName);
      var containerOptions = getOpenWithContainerOptions();
      ow.doesExampleExist(config, function (status) {
        var matlabLink = $('a[href="matlab:openExample(\'' + openWithCommand+ '\')"]');
        if (status === 'true') {
          var dropDown = $('<button class="btn btn_color_blue btn-block add_margin_10 hidden-xs analyticsOpenWith">'+ getOpenWithLabel() + '</button>');
          parentDiv.prepend(dropDown);
          $(dropDown).on('click', function(e) {
            e.preventDefault();
            ow.load(config, containerOptions);
          });
          matlabLink.css('display', 'inline-block');
        } else {
          matlabLink.css('display', 'inline-block');
          if (inBox) {
            matlabLink.parent().addClass('add_padding_top_15 add_border_top');
          }
        }

      });
    } else {
      if (inBox) {
        $(this).parent().addClass('add_padding_top_15 add_border_top');
      }
      $(this).css('display', 'inline-block');
    }
  });
}

function addOpenExampleLinkClickHandler(link) {
    $(link).on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var matlabCommand = getMatlabCommand(href);
        showMatlabDialog(matlabCommand);
    });

}


$(window).on('popover_added', function() {
    $(document).on("click", ".no-matlab", function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var matlabCommand = getMatlabCommand(href);
    showMatlabDialog(matlabCommand);
    });   
}); 


$(window).bind('examples_cards_added', function(e) {
    $('.card_container a[href^="matlab:"]').hide();
});

function registerMatlabCommandDialogAction() {
    $('a[href^="matlab:"]').not('.card_container a[href^="matlab:"], .examples_short_list a.btn[href^="matlab:"]').on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var matlabCommand = getMatlabCommand(href);
        showMatlabDialog(matlabCommand);
    });
}

function getMatlabCommand(href) {
    var matlabCommand = null;
    var match = href.match(/matlab:(.*)/);
    if (match) {
        matlabCommand = match[1];
    }
    return matlabCommand;
}

function getOpenWithCommand(matlabCommand) {
    var openWithCommand = null;
    var match = matlabCommand.match(/openExample\('(.*)'\)/);
    if (match) {
        openWithCommand = match[1];
    }
    return openWithCommand;
}

function showMatlabDialog(matlabCommand) {
    if (matlabCommand) {
        $("#matlab-command-dialog #dialog-body #dialog-matlab-command").text(matlabCommand);
    } else {
        $("#matlab-command-dialog #dialog-body #dialog-matlab-command").hide();
    }
    $("#matlab-command-dialog").modal();
}