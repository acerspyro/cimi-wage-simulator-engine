<?php
/**
 * Plugin Name:       CIMI Simulator
 * Description:       Data simulator for the Integration Index site
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Maxim Therrien (maxim@acerspyro.ca)
 * License:           PROPRIETARY
 * License URI:       https://acerspyro.ca/
 * Text Domain:       cimisim
 */

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Create shortcode to place simulator on a page
 */
function cimisim_simulator_shortcode() {
    require_once plugin_dir_path( __FILE__ ) . 'templates/app.php';
} add_shortcode("cimi_simulator", "cimisim_simulator_shortcode");

/**
 * Enqueue all necessary scripts and styles
 */
function cimisim_enqueue_scripts() {
    $content = json_decode(file_get_contents(__DIR__ . '/dist/manifest.json'), true);
    $entry = "main.tsx";
    
    foreach($content[$entry]["css"] as $cssUrl) {
        wp_enqueue_style( 'cimisim-style', plugin_dir_url( __FILE__ ) . "dist/" . $cssUrl );
    }
    
    wp_enqueue_script( 'cimisim-script', plugin_dir_url( __FILE__ ) . "dist/" . $content[$entry]["file"], array( 'wp-element' ), '1.0.0', true );
} add_action( 'wp_enqueue_scripts', 'cimisim_enqueue_scripts' );
