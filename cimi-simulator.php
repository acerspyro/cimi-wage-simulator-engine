<?php
/**
 * Plugin Name:       CIMI Wage Simulator
 * Description:       Wage simulator for the Integration Index site
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.1
 * Author:            Maxim Therrien (maxim@mtsd.ca)
 * License:           PROPRIETARY
 * License URI:       https://mtsd.ca/
 * Text Domain:       cimi-wage-simulator
 */

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Create shortcode to place simulator on a page
 */
function cimi_wage_simulator_shortcode()
{
    require_once plugin_dir_path(__FILE__) . 'templates/app.php';
}

add_shortcode("cimi_wage_simulator", "cimi_wage_simulator_shortcode");

/**
 * Enqueue all necessary scripts and styles
 */
function cimi_wage_simulator_enqueue_scripts()
{
    $assets_dir = plugin_dir_path(__FILE__) . 'dist/assets/';
    $assets_url = plugin_dir_url(__FILE__) . 'dist/assets/';

    $js_file = glob($assets_dir . 'index-*.js')[0];
    $css_file = glob($assets_dir . 'index-*.css')[0];

    wp_enqueue_script(
        'cimi-wage-simulator-spa',
        $assets_url . basename($js_file),
        array('wp-element'),
        filemtime($js_file),
        true
    );

    wp_enqueue_style(
        'cimi-wage-simulator-spa',
        $assets_url . basename($css_file),
        array(),
        filemtime($css_file)
    );

    wp_enqueue_script(
        'cimi-wage-simulator-block',
        plugins_url('block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . 'block.js'),
        true
    );
}

add_action('enqueue_block_editor_assets', 'cimi_wage_simulator_enqueue_scripts');
