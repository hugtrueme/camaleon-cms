jQuery(function($){
    // initialize all validations for forms
    init_form_validations();
    setTimeout(page_actions, 1000);
    setTimeout(init_intro, 500);
});

// show admin intro presentation
function init_intro(){
    if($("body").attr("data-intro")) return;
    var finish = function(){
        $.get(root_url+"/admin/ajax", {mode: "save_intro"});
    }
    introJs().setOptions({exitOnEsc: false,
        exitOnOverlayClick: false,
        showStepNumbers: false,
        showBullets: false,
        disableInteraction: true
    }).oncomplete(finish).onexit(finish).onbeforechange(function(ele) {
        if($(ele).hasClass("treeview") && !$(ele).hasClass("active")) $(ele).children("a").click();
    }).start();
}

// basic and common actions
var page_actions = function(){
    // button actions
    $('#admin_content table').addClass('table').wrap('<div class="table-responsive"></div>');
    $('#admin_content a[role="back"]').on('click',function(){ window.history.back(); return false; });
    $('a[data-toggle="tooltip"], button[data-toggle="tooltip"], a[title!=""]', "#admin_content").not(".skip_tooltip").tooltip();

    /* PANELS */
    $("#admin_content").on("click", ".panel .panel-collapse", function(){
        panel_collapse($(this).parents(".panel:first"));
        $(this).parents(".dropdown").removeClass("open");
        return false;
    });
}

function panel_collapse(panel,action,callback){

    if(panel.hasClass("panel-toggled")){
        panel.removeClass("panel-toggled");
        panel.find(".panel-collapse .fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
        if(action && action === "shown" && typeof callback === "function")
            callback();
    }else{
        panel.addClass("panel-toggled");
        panel.find(".panel-collapse .fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
        if(action && action === "hidden" && typeof callback === "function")
            callback();
    }
}

/* PLAY SOUND FUNCTION */
function playAudio(file){
    if(file === 'alert')
        document.getElementById('audio-alert').play();

    if(file === 'fail')
        document.getElementById('audio-fail').play();
}
/* END PLAY SOUND FUNCTION */

/* NEW OBJECT(GET SIZE OF ARRAY) */
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
/* EOF NEW OBJECT(GET SIZE OF ARRAY) */