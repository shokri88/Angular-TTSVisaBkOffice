

// Function to initialize metisMenu
function initMetisMenu() {
    $("#side-menu").metisMenu();
}

// Function to handle vertical menu toggle
function toggleVerticalMenu() {
    $("#vertical-menu-btn").on("click", function (e) {
        e.preventDefault();
        $("body").toggleClass("sidebar-enable");
        if ($(window).width() >= 992) {
            $("body").toggleClass("vertical-collpsed");
        } else {
            $("body").removeClass("vertical-collpsed");
        }
    });
}

// Function to highlight active menu items
function highlightActiveMenu() {
    // Sidebar menu
    $("#sidebar-menu a").each(function () {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href === pageUrl) {
            $(this).addClass("active");
            $(this).parent().addClass("mm-active");
            $(this).parent().parent().addClass("mm-show");
            $(this).parent().parent().prev().addClass("mm-active");
            $(this).parent().parent().parent().addClass("mm-active");
            $(this).parent().parent().parent().parent().addClass("mm-show");
            $(this).parent().parent().parent().parent().parent().addClass("mm-active");
        }
    });

    // Navbar menu
    $(".navbar-nav a").each(function () {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href === pageUrl) {
            $(this).addClass("active");
            $(this).parent().addClass("active");
            $(this).parent().parent().addClass("active");
            $(this).parent().parent().parent().addClass("active");
            $(this).parent().parent().parent().parent().addClass("active");
            $(this).parent().parent().parent().parent().parent().addClass("active");
            $(this).parent().parent().parent().parent().parent().parent().addClass("active");
        }
    });
}

// Function to handle fullscreen toggle
function toggleFullscreen() {
    $('[data-toggle="fullscreen"]').on("click", function (e) {
        e.preventDefault();
        $("body").toggleClass("fullscreen-enable");
        if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        } else {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    });
}

// Function to handle fullscreen change events
function handleFullscreenChange() {
    function exitFullscreen() {
        if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            console.log("pressed");
            $("body").removeClass("fullscreen-enable");
        }
    }
    document.addEventListener("fullscreenchange", exitFullscreen);
    document.addEventListener("webkitfullscreenchange", exitFullscreen);
    document.addEventListener("mozfullscreenchange", exitFullscreen);
}

// Function to toggle right bar
function toggleRightBar() {
    $(".right-bar-toggle").on("click", function () {
        $("body").toggleClass("right-bar-enabled");
    });

    $(document).on("click", "body", function (e) {
        if ($(e.target).closest(".right-bar-toggle, .right-bar").length === 0) {
            $("body").removeClass("right-bar-enabled");
        }
    });
}

// Function to handle topnav menu
function handleTopnavMenu() {
    if (document.getElementById("topnav-menu-content")) {
        var links = document.getElementById("topnav-menu-content").getElementsByTagName("a");
        for (var i = 0, n = links.length; i < n; i++) {
            links[i].onclick = function (e) {
                if (e.target.getAttribute("href") === "#") {
                    e.target.parentElement.classList.toggle("active");
                    e.target.nextElementSibling.classList.toggle("show");
                }
            };
        }
        window.addEventListener("resize", clearActiveDropdowns);
    }
}

// Function to clear active dropdowns
function clearActiveDropdowns() {
    var links = document.getElementById("topnav-menu-content").getElementsByTagName("a");
    for (var i = 0, n = links.length; i < n; i++) {
        if (links[i].parentElement.getAttribute("class") === "nav-item dropdown active") {
            links[i].parentElement.classList.remove("active");
            links[i].nextElementSibling.classList.remove("show");
        }
    }
}

// Function to initialize tooltips
function initTooltips() {
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (el) {
        return new bootstrap.Tooltip(el);
    });
}

// Function to initialize popovers
function initPopovers() {
    [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function (el) {
        return new bootstrap.Popover(el);
    });
}

// Function to handle theme switching
function handleThemeSwitch() {
    function switchTheme(mode) {
        if (mode === "light-mode-switch" && $("#light-mode-switch").prop("checked")) {
            $("html").removeAttr("dir");
            $("#dark-mode-switch").prop("checked", false);
            $("#rtl-mode-switch").prop("checked", false);
            $("#bootstrap-style").attr("href", "assets/css/bootstrap.min.css");
            $("#app-style").attr("href", "assets/css/app.min.css");
            sessionStorage.setItem("is_visited", "light-mode-switch");
        } else if (mode === "dark-mode-switch" && $("#dark-mode-switch").prop("checked")) {
            $("html").removeAttr("dir");
            $("#light-mode-switch").prop("checked", false);
            $("#rtl-mode-switch").prop("checked", false);
            $("#bootstrap-style").attr("href", "assets/css/bootstrap-dark.min.css");
            $("#app-style").attr("href", "assets/css/app-dark.min.css");
            sessionStorage.setItem("is_visited", "dark-mode-switch");
        } else if (mode === "rtl-mode-switch" && $("#rtl-mode-switch").prop("checked")) {
            $("#light-mode-switch").prop("checked", false);
            $("#dark-mode-switch").prop("checked", false);
            $("#bootstrap-style").attr("href", "assets/css/bootstrap-rtl.min.css");
            $("#app-style").attr("href", "assets/css/app-rtl.min.css");
            $("html").attr("dir", "rtl");
            sessionStorage.setItem("is_visited", "rtl-mode-switch");
        }
    }

    if (window.sessionStorage) {
        var savedMode = sessionStorage.getItem("is_visited");
        if (savedMode) {
            $(".right-bar input:checkbox").prop("checked", false);
            $("#" + savedMode).prop("checked", true);
            switchTheme(savedMode);
        } else {
            sessionStorage.setItem("is_visited", "light-mode-switch");
        }
    }

    $("#light-mode-switch, #dark-mode-switch, #rtl-mode-switch").on("change", function (e) {
        switchTheme(e.target.id);
    });
}

// Function to handle preloader
function handlePreloader() {
    $(window).on("load", function () {
        $("#status").fadeOut();
        $("#preloader").delay(350).fadeOut("slow");
    });
}

// Function to initialize Waves effect
function initWaves() {
    Waves.init();
}

// Initialize all functions
function initApp() {
    initMetisMenu();
    toggleVerticalMenu();
    // highlightActiveMenu();
    toggleFullscreen();
    handleFullscreenChange();
    toggleRightBar();
    handleTopnavMenu();
    initTooltips();
    initPopovers();
    handleThemeSwitch();
    handlePreloader();
    initWaves();
}

// Call the initialization function

function LoadSelect2() {
  $(".select2").select2({
    width: "100%",
    placeholder: "Select the item",
  });
}

function SelectVisaReqSelectId(SelectId, Id) {
  $("#" + SelectId).val(Id);
  LoadSelect2();
}

var intervalId = window.setInterval(function () {
    initApp();
    handleDatatable();
    // renderCharts();
}, 1000);


//  setTimeout(function() {
    
//   }, 2000);