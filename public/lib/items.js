export function getItems() {
    return JSON.parse(localStorage.getItem("items"));
}

export function getItem(name) {
    return JSON.parse(localStorage.getItem("items")).find(item => item.name === name);
}

export function addItem(item) {
    let items = JSON.parse(localStorage.getItem("items"));
    let old = items.find(i => i.name === item.name);
    if (old) old.qty++;
    else items.push(item);
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
    if (item) {
        item.qty = qty;
        localStorage.setItem("items", JSON.stringify(items));
    }
}
