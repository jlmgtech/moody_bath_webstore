//import AsyncQueue from "/lib/AsyncQueue.js";
//import LoadableQueue from "/lib/LoadableQueue.js";

const plugins = {};
const requested = {};

export async function register(name, obj) {
    if (typeof(plugins[name]) == 'undefined') {
        // plugin not yet requested nor loaded
        plugins[name] = obj;
        await plugins[name].init();
    } else if (plugins[name] instanceof Promise) {
        // plugin is requested, but not loaded
        requested[name](obj);
        plugins[name] = obj;
        await plugins[name].init();
    } else {
        // plugin already loaded, throw error
        throw new Error(`Plugin "${name}" already loaded`);
    }
    console.info(`Plugin ${name} registered`);
}
window.register = register;

export async function plug(name, method, ...args) {
    if (typeof(plugins[name]) === 'undefined') {
        // plugin is neither loaded nor requested, set it to loading state
        plugins[name] = new Promise((resolve, reject) => {
            requested[name] = resolve;
        });
    }
    if (plugins[name] instanceof Promise) {
        // plugin is requested, wait for it to load
        plugins[name] = await plugins[name];
    }
    return plugins[name][method](...args);
}
window.plug = plug;

function tests() {
    register("immediate", {
        test() {
            return Promise.resolve("immediate test returned");
        }
    });

    (async () => {
        console.log("queuing");
        plug("immediate", "test").then(result => {
            console.log("you should see this before anything else", result);
        });

        plug("speaker", "say", "Hello World").then((result) => {
            console.log("result: ", result);
        });
        console.log("you should not see a result yet");
    })();

    setTimeout(() => {
        register("speaker", {
            say(text) {
                console.log("now you should see a result");
                return text;
            }
        });
    }, 1000);
}
