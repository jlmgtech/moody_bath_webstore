# Moody Bath E-Commerce Platform
The code that supports the moody bath co website

### Design Goals

The primary design goal is to be a successful ecommerce platform, but the
following design goals aspire to achieve those goals:

* Simplicity/Minimalism (what's the minimum required to fulfill the objectives?)
* Mobile-friendly
* Search-engine and text-browser friendly
* Ease-of-use
* User experience (the website should be fun and addictive to interact with, as if designing the mechanics of a game)
* Speed (load times _and_ runtime performance)
* Small size (including small javascript and CSS footprint, and highly optimized images and media)
    + reduce dependency on external libraries
    + reduce dependency on external css frameworks
    + server-side optimization, such as minification and image manipulation
    + use SVGs wherever possible
* Reliability
* Accessibility
    + use the auditor at accessibe.com
    + follow the checklist at https://dequeuniversity.com/checklists/web/
    + Other accessbility auditing tools or checklist?
* Compatibility
    + Compatibility auditing tools or checklist?

### TODOs

* Implement cart on frontend using localStorage or whatever's most supported.
* Integrate with some payment processors
* Implement the email subscribe feature in the footer

* (DONE) Write the Contact page.
* (DONE) Make Homepage/Store responsive
* (DONE) Write the About page.
* (GOOD ENOUGH FOR NOW) Implement policy pages for:
    + Terms and Conditions
    + (DONE) Privacy Policy
    + Cookie Policy
    + Accessibility Policy


### PLUGIN SYSTEM ###

    registerPlugin("nav", {
        start() {},
        set(name, html) {}, // null html means remove
    });

    // ====================== //

    registerPlugin("cart", {

        start() {
            await plug("nav", "set", "cart", await plug("cart", "render"));
        },

        render() {
            return `
                <span onclick="plug('cart', 'open', event)">Cart</span>
            `;
        },

    });
