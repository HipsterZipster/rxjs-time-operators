var moves = Rx.Observable.fromEvent(document, 'mousemove');
var DELAY_MS = 300;
var dbCount = 0,
    thrCount = 0,
    thrFCount = 0,
    samCount = 0;

var dataMap = {};

function setText(id, event, dataItem) {
    var tdOpen = '<td>',
        tdClose = '</td>';
    var rowHtml = makeColumn(id) +
        makeColumn(event.x + ', ' + event.y) +
        makeColumn(dataItem.lastUpdateDelay) +
        makeColumn(dataItem.count);
    document.getElementById(id).innerHTML = rowHtml;

    function makeColumn(text) {
        return tdOpen + text + tdClose;
    }
}

function updateItem(id) {
    if (!dataMap[id]) {
        dataMap[id] = {
            'count': 1,
            'lastUpdateTime': Date.now(),
            'lastUpdateDelay': 0
        };
    } else {
        dataMap[id].count = ++dataMap[id].count;
        dataMap[id].lastUpdateDelay = (Date.now() - dataMap[id].lastUpdateTime);
        dataMap[id].lastUpdateTime = Date.now();
    }
    return dataMap[id];
}

moves.debounce(DELAY_MS).subscribe(function(event) {
    var id = 'debounce';
    setText(id, event, updateItem(id));
});

moves.throttle(DELAY_MS).subscribe(function(event) {
    var id = 'throttle';
    setText(id, event, updateItem(id));
});

moves.throttleFirst(DELAY_MS).subscribe(function(event) {
    var id = 'throttleFirst';
    setText(id, event, updateItem(id));
});

moves.sample(DELAY_MS).subscribe(function(event) {
    var id = 'sample';
    setText(id, event, updateItem(id));
});
