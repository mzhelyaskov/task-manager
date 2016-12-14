document.onclick = function (event) {
    var target = event.target;
    while (target != document && target.classList && !target.classList.contains('dialog-close-btn')) {
        target = target.parentNode;
    }
    if (target instanceof HTMLElement && target.classList.contains('dialog-close-btn')) {
        console.log('in');
        var messageWindow = target.parentNode;
        messageWindow.parentNode.removeChild(messageWindow);
    }
};