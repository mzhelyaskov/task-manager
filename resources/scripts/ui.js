
function closeFormErrorMessageWindow(event) {
    var target = event.target;
    while (target && target != document && target.classList && !target.classList.contains('dialog-close-btn')) {
        target = target.parentNode;
    }
    if (target instanceof HTMLElement && target.classList.contains('dialog-close-btn')) {
        console.log('in');
        var messageWindow = target.parentNode;
        messageWindow.parentNode.removeChild(messageWindow);
    }
}
document.addEventListener('click', closeFormErrorMessageWindow);

// Delete help blocks after input field change
var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    input.addEventListener("input", function(event) {
        var target = event.target;
        var inputParent = target.parentNode;
        var helpBlock = inputParent.querySelector('.help-block');
        if (helpBlock) inputParent.removeChild(helpBlock);
    });
}