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

I don't really want to explain it right now, since I'm the only one using this,
so here's an example:

    registerPlugin("nav", {
        start() {},
        set(name, html) {}, // null html means remove
    });

    // ====================== //

    registerPlugin("cart", {

        init() {
            await plug("nav", "set", "cart", await plug("cart", "render"));
        },

        render() {
            return `
                <span onclick="plug('cart', 'open', event)">Cart</span>
            `;
        },

    });

I want to point out 3 key points:

1. calling `plug(name, method, ...args)` will politely wait until that plugin
   is registered before making and returning the call.
2. plugins should have an `init` function, which may or may not be used.  It will be ignored if not defined.
3. Okay, so maybe there's only two key points... /shrug

### MIGRATION TO NODE JS ###

Why, why oh why are we using node js?
Because it's easy to program in, has the best ecosystem hands-down, and is getting faster all the time.

Plan:

Each page (route) is just a list of sections.  Each route is literally one
thing - the html that should be rendered at that spot.

Each section is literally just a placeholder for some html that gets stamped in. There's some conventions I follow that give structure to this paradigm:
1. Everything is contained within a `<section class="section-name">`, where section-name is the name of the section.
2. Style and script tags go within the section, usually at the top.
3. Scripts use the plugin system to make their methods available to other sections.

I follow a filesystem convention as well. Each section gets its own folder,
and each folder has a script.js, styles.css, and a section.php file that
serves as the entrypoint.

    sections/
    └── my_section/
        ├── section.php
        ├── script.js
        └── styles.css
        my_section_2/
        ├── section.php
        ├── script.js
        └── styles.css

At some point, this will all be in javascript, and the sections will be dynamically included, like this:

```js

    // define a page for a given GET route
    // pages take a map of section names to arguments.
    // sections take any kind of data that would make them useful in this
    // context. 
    page("/store", {

        // this page takes a single section, stdLayout...
        // stdLayout is a section that just wraps the child sections in a
        // header and footer.
        stdLayout: {

            sections: {

                // topItems takes three item ids and shows them off
                std_topItems: {
                    items: ["serenety", "happiness", "azure"],
                },

                // shop shows all the items and their "add to cart" buttons
                std_shop: {
                    pagination: "lazy-load",
                },

                // the cart is mostly JS that pops out a sidebar with all the
                // items you've picked, and will show preliminary item, cost, and
                // quantity information.
                std_cart: {
                    clientStorage: "localStorage",
                    expirationLength: 60 * 3, // 3 hours before the cart resets all the items.
                    max_items: 5,
                },

            },

        },

    });

```


### Server Side Modules ###

    modules/
    ├── epayments/
    │   ├── stripe_epayments_driver/
    │   │   ├── routes.js                       # all routes defined here will be in the group
    │   │   ├── lib.js                          # defines all the methods that are accessible from this library
    │   │   └── events.js                       # creates all the subscriptions to actions that are fired by the core system and the other plugins
    │   ├── paypal_epayments_driver/
    │   │   ├── lib.js
    │   │   ├── events.js
    │   │   └── routes.js
    │   ├── authorize_net_epayments_driver/
    │   │   ├── lib.js
    │   │   ├── events.js
    │   │   └── routes.js
    │   ├── ayden_epayments_driver/
    │   │   ├── lib.js
    │   │   ├── events.js
    │   │   └── routes.js
    │   └── payline_epayments_driver/
    │       ├── lib.js
    │       ├── events.js
    │       └── routes.js
    ├── inventory/
    │   └── filesystem_inventory_driver/
    │       ├── lib.js
    │       ├── events.js
    │       └── routes.js
    ├── email/
    │   ├── mailgun_email_driver/
    │   │   ├── lib.js
    │   │   ├── events.js
    │   │   └── routes.js
    │   └── sendgrid_email_driver/
    │       ├── lib.js
    │       ├── events.js
    │       └── routes.js
    ├── sms/
    │   └── twilio_sms_driver/
    │       ├── lib.js
    │       ├── events.js
    │       └── routes.js
    └── logging/
        ├── file_logging_driver/
        │   ├── lib.js
        │   ├── events.js
        │   └── routes.js
        └── sqlite_logging_driver/
            ├── lib.js
            ├── events.js
            └── routes.js

All modules, including their library functions, routes, and events will be
loaded as soon as possible.

#### Lib ####
Library functions are the most fundamental functionality of modules. These are
just function calls.

#### Routes ####
All routes defined for a module will exist under a conventional module prefix.
For instance, a driver that implements "cart" will serve only pages
prefixed with `/cart/`, like so:

    HTML GET  /cart/view
    JSON GET  /cart/contents
    JSON GET  /cart/totals
    JSON POST /cart/add/<item>/<qty>

Exceptions can be made for SEO purposes by reserving a top-level path with the
platform. This should be avoided to mitigate path collisions. If another module
has requested the same path the server will abort shortly after starting and
emit the error to the standard error stream in the environment it was running
in.

#### Events ####
Event registrations load after routes and methods are defined and are used to
hook into the logic of other modules without needing to modify them.

#### Dependency Resolution ####
Dependencies are not formally declared; instead, the absence of a dependency
will be known by the error logs given during runtime. For this reason, a plugin
can query the module loader when "modules\_loaded" fires, and make sure that
its known dependencies exist. If not, it can throw an error so the
administrator knows that a module dependency is missing.

#### Driver Selection ####

Modules can have many acceptable drivers that provide the basic interface using
a specific implementation or supporting technology. Not all installed drivers
will be used for the run. Instead, a configuration will specify all the modules
that should be loaded, and their preferred drivers. Multiple drivers may be
specified for a given module, in order of their preference.

Now, there may be several questions aimed at this design choice.

1. Why implement modules with drivers, rather than directly implementing them?  

Think of the module as an interface, and the driver as the implementation. You
may have a module to handle event logging, but whether you log it to a file
system, a database, or some other way depends on the driver that is used.
Having multiple drivers installed means you can choose which one you want when
you start the server. If one isn't working, then you can switch to one that
does.

2. Why can you configure a run to have multiple drivers for a given module?  

During runtime, if a module encounters an error, the next specified driver for
the module will be loaded as a fallback for the remainder of the run. If the
fallback driver fails, then the next specified driver will take over, and so
on. This is important for things like logging that need to record important
events SOMEWHERE. Also, if, for instance, multiple payment systems are
implemented, but one of them has failed due to an unforseen event, a fallback
payment processor can take over until the preferred driver has been fixed and
business can continue running with limited interruption.

Because modules communicate through a mediator, they can be loaded and unloaded
on a running server, without interrupting site's operation. This allows for
fixes to be patched, behavior to be modified, and features to be added, all on
a live server instance, without any other modules knowing that the driver
they're talking to has been modified.

#### Example configuration ####

This configuration specifies 3 modules that must be loaded, and the suitable
drivers that would provider their functionality.
* Epayments can be provided by stripe, but if that fails then googlepay can be
   loaded, and if both fail, paypal will serve the payment processing for the
   site.
* Logging and cart both have only one suitable driver each.

```js
    const config = {

        epayments: [
            "stripe",
            "googlepay",
            "paypal",
        ],

        logging: ["sqlite_logger"],

        cart: ["shopify_cart_integration"],

    }

```

Keep in mind the difference between installed, suitable, and active drivers.

* installed drivers are loadable by the loader.
* suitable drivers have been specified for a module in the configuration.
* active drivers are the drivers currently running in the system (one-per-module)
