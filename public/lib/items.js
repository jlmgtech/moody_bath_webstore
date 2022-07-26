// for testing:
localStorage.setItem("items", JSON.stringify([
    {
        "name": "Item 1",
        "qty": "1"
    },
    {
        "name": "Item 2",
        "qty": "2"
    },
    {
        "name": "Item 3",
        "qty": "3"
    },
]));

export function getItems() {
    return JSON.parse(localStorage.getItem("items"));
}

export function getItem(name) {
    return JSON.parse(localStorage.getItem("items")).find(item => item.name === name);
}

export function addItem(item) {
    let items = JSON.parse(localStorage.getItem("items"));
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
}

export function removeItem(name) {
    let items = JSON.parse(localStorage.getItem("items"));
    items = items.filter(item => item.name !== name);
    localStorage.setItem("items", JSON.stringify(items));
}

export function updateItem(name, qty) {
    qty = qty | 0;
    if (qty === 0) {
        removeItem(name);
        return;
    }
    let items = JSON.parse(localStorage.getItem("items"));
    let item = items.find(item => item.name === name);
    item.qty = qty;
    localStorage.setItem("items", JSON.stringify(items));
}
