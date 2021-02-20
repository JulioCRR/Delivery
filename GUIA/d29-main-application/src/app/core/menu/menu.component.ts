import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UserSessionData, MenuTree, Usuario} from '../../app.service';
import {Router, ActivatedRoute} from '@angular/router';
declare var jQuery: any;


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
    private userSessionData: any;
    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngAfterViewInit() {

        var setContentHeight = function () {
            // reset height
            jQuery('.right_col').css('min-height', jQuery(window).height());

            var bodyHeight = jQuery('body').outerHeight(),
                footerHeight = jQuery('body').hasClass('footer_fixed') ? -10 : jQuery('footer').height(),
                leftColHeight = jQuery('.left_col').eq(1).height() + jQuery('.sidebar-footer').height(),
                contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

            // normalize content
            //contentHeight -= jQuery('.nav_menu').height() + footerHeight;
            contentHeight -= jQuery('.nav_menu').height() - 6;

            jQuery('.right_col').css('min-height', contentHeight);
        };

        var CURRENT_URL = window.location.href.split('#')[1].split('?')[0];

        // /Sidebar
        jQuery('#sidebar-menu').find('a[href="#' + CURRENT_URL + '"]').parent('li').parent("ul").slideDown(function () {
            setContentHeight();
        });

        // check active menu
        //        jQuery('#sidebar-menu').find('a[href="#' + CURRENT_URL + '"]').parent('li').addClass('current-page');



        //        jQuery('#sidebar-menu').find('a').filter(function () {
        //            return this.href == CURRENT_URL;
        //        }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
        //            setContentHeight();
        //        }).parent().addClass('active');




        jQuery('#sidebar-menu').find('a').on('click', function () {

            if (jQuery(this).parent().is('.active')) {
                jQuery(this).parent().removeClass('active active-sm');
                jQuery(this).parent().find('.fa-chevron-up').addClass('fa-chevron-down').removeClass('fa-chevron-up');
                jQuery('ul:first', jQuery(this).parent()).slideUp(function () {
                    setContentHeight();
                });
            } else {
                // prevent closing menu if we are on child menu
                if (!jQuery(this).parent().parent().is('.child_menu')) {
                    jQuery('#sidebar-menu').find('li').removeClass('active active-sm');
                    jQuery('#sidebar-menu').find('li ul').slideUp();
                    jQuery('#sidebar-menu').find('li .fa-chevron-up').addClass('fa-chevron-down').removeClass('fa-chevron-up');
                }

                jQuery(this).parent().addClass('active');
                jQuery(this).parent().find('.fa-chevron-down').addClass('fa-chevron-up').removeClass('fa-chevron-down');

                jQuery('ul:first', jQuery(this).parent()).slideDown(function () {
                    setContentHeight();
                });
            }
        });
    }

    ngOnInit() {
        this.userSessionData = JSON.parse(localStorage.getItem('user_session_data'));
        var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
            $BODY = jQuery('body'),
            $MENU_TOGGLE = jQuery('#menu_toggle'),
            $SIDEBAR_MENU = jQuery('#sidebar-menu'),
            $SIDEBAR_FOOTER = jQuery('.sidebar-footer'),
            $LEFT_COL = jQuery('.left_col'),
            $RIGHT_COL = jQuery('.right_col'),
            $NAV_MENU = jQuery('.nav_menu'),
            $FOOTER = jQuery('footer');
        // Sidebar

        // TODO: This is some kind of easy fix, maybe we can improve this
        var setContentHeight = function () {
            // reset height
            jQuery('.right_col').css('min-height', jQuery(window).height());

            var bodyHeight = jQuery('body').outerHeight(),
                footerHeight = jQuery('body').hasClass('footer_fixed') ? -10 : jQuery('footer').height(),
                leftColHeight = jQuery('.left_col').eq(1).height() + jQuery('.sidebar-footer').height(),
                contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

            // normalize content
            //contentHeight -= jQuery('.nav_menu').height() + footerHeight;
            contentHeight -= jQuery('.nav_menu').height() - 6;

            jQuery('.right_col').css('min-height', contentHeight);
        };



        // toggle small or large menu
        jQuery('#menu_toggle').on('click', function () {
            if (jQuery('body').hasClass('nav-md')) {
                jQuery('#sidebar-menu').find('li.active ul').hide();
                jQuery('#sidebar-menu').find('li.active').addClass('active-sm').removeClass('active');
            } else {
                jQuery('#sidebar-menu').find('li.active-sm ul').show();
                jQuery('#sidebar-menu').find('li.active-sm').addClass('active').removeClass('active-sm');
            }

            jQuery('body').toggleClass('nav-md nav-sm');

            setContentHeight();
        });



        // recompute content when resizing
        jQuery(window).smartresize(function () {
            setContentHeight();
        });

        setContentHeight();

        // fixed sidebar
        if (jQuery.fn.mCustomScrollbar) {
            jQuery('.menu_fixed').mCustomScrollbar({
                autoHideScrollbar: true,
                theme: 'minimal',
                mouseWheel: {preventDefault: true}
            });
        }


    }

}
