// ref http://www.codediesel.com/javascript/sharing-messages-and-data-across-windows-using-localstorage/
// 
// 
// todo also check out https://github.com/grevory/angular-local-storage
// 
// What's interesting / unexpected is that the storage event only fires on windows other than the one that updated the local storage
// I've added code to effectively 2-way bind
// So I guess binding to localStorage might not work on its own. you'd bind to a model that binds to localstorage
// 
// Or, in fact, using a real-time backend such as firebase or meteor might be a better option.
// 
// Next step, implement in angular!
// 

var windowId = 'window'+new Date().getTime();// unique id for the window

$(document).ready(function() {
    console.log('window '+windowId+' ready');
    // init storage listener
    init();
})

var init = function() {
    var windowListStorageKey = 'multiWindow-windows'; // where to store list of windows that are part of this app
    var storageKey = 'multiWindow-appdata'; // where to store my stuff
    var $input = $('input#data'); // input element - its value will be written to storage
    var $output = $('#event-data'); // output element - will display the storage contents
    
    
    // add window to the list. Not quite working as how do we clean up the list? How do we know when a window is closed or reloaded?
    // could perhaps find a suitable event
    if (!localStorage.getItem(windowListStorageKey)) {
        localStorage.setItem(windowListStorageKey, '');
        console.log('I am the first')
    }
    var windowList = localStorage.getItem('multiWindow-windows').split(',');
    windowList.push(windowId);
    localStorage.setItem('multiWindow-windows', windowList.join(','));
    
    var showLocalStorage = function() {
        $output.html(localStorage.getItem(storageKey));// write localStorage data to our output element
    }
    
    var onStorage = function(e) { 
        // e.storageArea === localStorage
        if (e.key == storageKey) {
            showLocalStorage();
            $input.val(e.newValue); // update this input field with the value
        }
    }
    var onInputChange = function(e) {
        localStorage.setItem(storageKey, $(this).val());
        showLocalStorage();
    }
    window.addEventListener("storage", onStorage, true);
    $input.change(onInputChange);


    showLocalStorage();
}