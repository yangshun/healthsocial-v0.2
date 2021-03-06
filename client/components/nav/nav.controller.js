'use strict';

angular.module('healthsocialDevApp').controller('NavCtrl', function ($scope, $location, Auth) {
  $scope.menu = [
    {
      title: 'Dashboard',
      icon: 'fa-dashboard',
      link: '/'
    },
    {
      title: 'Analytics',
      icon: 'fa-bar-chart-o',
      link: '/analytics'
    },
    {
      title: 'News Feed',
      icon: 'fa-newspaper-o',
      link: '/feed'
    },
    {
      title: 'Chatroom',
      icon: 'fa-comments',
      link: '/chatroom'
    },
    {
      title: 'Community',
      icon: 'fa-users',
      link: '/community'
    },
    {
      title: 'Leaderboard',
      icon: 'fa-trophy',
      link: '/leaderboard'
    }
  ];

  $scope.isCollapsed = true;
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;

  $scope.logout = function() {
    Auth.logout();
    $location.path('/login');
  };

  $scope.isActive = function(route) {
    return route === $location.path();
  };

  nav();
});

function nav () {
  (function ($) {

    $(document).ready(function () {
      /*==Left Navigation Accordion ==*/
      if ($.fn.dcAccordion) {
        $('#nav-accordion').dcAccordion({
          eventType: 'click',
          autoClose: true,
          saveState: true,
          disableLink: true,
          speed: 'slow',
          showCount: false,
          autoExpand: true,
          classExpand: 'dcjq-current-parent'
        });
      }
    });
    /*==Nice Scroll ==*/
    if ($.fn.niceScroll) {

      $(".leftside-navigation").niceScroll({
        cursorcolor: "#1FB5AD",
        cursorborder: "0px solid #fff",
        cursorborderradius: "0px",
        cursorwidth: "3px"
      });

      $(".leftside-navigation").getNiceScroll().resize();
      if ($('#sidebar').hasClass('hide-left-bar')) {
        $(".leftside-navigation").getNiceScroll().hide();
      }
      $(".leftside-navigation").getNiceScroll().show();

      $(".right-stat-bar").niceScroll({
        cursorcolor: "#1FB5AD",
        cursorborder: "0px solid #fff",
        cursorborderradius: "0px",
        cursorwidth: "3px"
      });
    }


    /*==Sidebar Toggle==*/

    $(".leftside-navigation .sub-menu > a").click(function () {
      var o = ($(this).offset());
      var diff = 80 - o.top;
      if (diff > 0)
        $(".leftside-navigation").scrollTo("-=" + Math.abs(diff), 500);
      else
        $(".leftside-navigation").scrollTo("+=" + Math.abs(diff), 500);
    });

    $('.sidebar-toggle-box .fa-bars').click(function (e) {

      // Basic debounce of resize function so it doesn't hurt performance when resizing browser.
      setTimeout(function () {
        _.each(Chart.instances, function (instance) {
          // If the responsive flag is set in the chart instance config
          // Cascade the resize event down to the chart.
          if (instance.options.responsive) {
            instance.resize(instance.render, true);
          }
        });
      }, 300);

      $(".leftside-navigation").niceScroll({
        cursorcolor: "#1FB5AD",
        cursorborder: "0px solid #fff",
        cursorborderradius: "0px",
        cursorwidth: "3px"
      });

      $('#sidebar').toggleClass('hide-left-bar');
      if ($('#sidebar').hasClass('hide-left-bar')) {
        $(".leftside-navigation").getNiceScroll().hide();
      }
      $(".leftside-navigation").getNiceScroll().show();
      $('#main-content').toggleClass('merge-left');
      e.stopPropagation();
      if ($('#container').hasClass('open-right-panel')) {
        $('#container').removeClass('open-right-panel')
      }
      if ($('.right-sidebar').hasClass('open-right-bar')) {
        $('.right-sidebar').removeClass('open-right-bar')
      }

      if ($('.header').hasClass('merge-header')) {
        $('.header').removeClass('merge-header')
      }
    });

    $('.toggle-right-box .fa-bars').click(function (e) {
      $('#container').toggleClass('open-right-panel');
      $('.right-sidebar').toggleClass('open-right-bar');
      $('.header').toggleClass('merge-header');

      e.stopPropagation();
    });

    $('.header,#main-content,#sidebar').click(function () {
      if ($('#container').hasClass('open-right-panel')) {
        $('#container').removeClass('open-right-panel')
      }
      if ($('.right-sidebar').hasClass('open-right-bar')) {
        $('.right-sidebar').removeClass('open-right-bar')
      }

      if ($('.header').hasClass('merge-header')) {
        $('.header').removeClass('merge-header')
      }
    });

    $('.panel .tools .fa').click(function () {
      var el = $(this).parents(".panel").children(".panel-body");
      if ($(this).hasClass("fa-chevron-down")) {
        $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
        el.slideUp(200);
      } else {
        $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
        el.slideDown(200); 
      }
    });

    $('.panel .tools .fa-times').click(function () {
      $(this).parents(".panel").parent().remove();
    });

    // tool tips

    $('.tooltips').tooltip();

    // popovers

    $('.popovers').popover();

  }(jQuery));
}

