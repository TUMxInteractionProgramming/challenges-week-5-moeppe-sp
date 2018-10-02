/* #6 start the #external #action and say hello */
console.log("App is alive");

var currentChannel = SevenContinents;
var currentLocation = {
    latitude: 48.186948,
    longitude: 11.574883,
    what3words: 'schwellen.zeit.lippe'
};
var currentMessage;

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channelObject) {
    currentChannel = channelObject;
    //Log the channel switch
    console.log("Tuning in to channel", channelObject);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = '#' + channelObject.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/' + channelObject.createdBy + '" target="_blank"><strong>' + channelObject.createdBy + '</strong></a>';

    /* #6 #liking channels on #click */
    var typeOfStar = channelObject.starred ? 'fas' : 'far';
    $('#channel-star').removeClass("fas far");
    $('#channel-star').addClass(typeOfStar);
    //$('#channel-star').attr('src', 'http://ip.lfe.mw.tum.de/sections/star-o.png');

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelObject.name + ')').addClass('selected');


}

/* #6 #liking a channel on #click */
function star() {
    currentChannel.starred = !currentChannel.starred;
    $('#channel-star').toggleClass("fas");
    $('#channel-star').toggleClass("far");
    $('#channels li:contains(' + currentChannel.name + ') span .fa-star').toggleClass("fas");
    $('#channels li:contains(' + currentChannel.name + ') span .fa-star').toggleClass("far");
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

function Message(text) {
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = Date.now();
    this.expiresOn = new Date(Date.now() + 15 * 60000);
    this.text = text;
    this.own = true;
}

function sendMessage() {
    var message = new Message($('#message-input').val());
    if (message.text==''){
      alert('Please enter a message before sending!');
    }
    currentMessage = message;
    console.log(message);
    $('#messages').append(createMessageElement(message));
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
    $('#message-input').val('');
}

function createMessageElement(messageObject) {
    var expiresIn = Math.round((messageObject.expiresOn - Date.now()) / 60000);
    var options = {
        timezone: 'MESZ'
    };
    var classes = messageObject.own ? 'message own' : 'message';
    return '<div class="' + classes + '"><h3><a href="http://w3w.co/' + messageObject.createdBy + '" target="_blank"><strong>' +
        messageObject.createdBy + '</strong></a>' + new Date(messageObject.createdOn).toLocaleString('de-DE', options) +
        '<em>' + expiresIn + ' min. left</em></h3><p style="box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);">' + messageObject.text + '</p><button class="accent">+5 min.</button><div>';
}

function listChannels() {
    createChannelElement(Yummy);
    createChannelElement(SevenContinents);
    createChannelElement(KillerApp);
    createChannelElement(FirstPersonOnMars);
    createChannelElement(Octoberfest);

}

function createChannelElement(channelObject) {
    console.log(channelObject);
    var starClasses;
    starClasses = channelObject.starred ? 'fas fa-star' : 'far fa-star';
    var liAttr;
    if (channelObject.name == 'SevenContinents') {
        liAttr = {
            'onclick': 'switchChannel(' + channelObject.name + ')',
            'class': 'selected'
        };
    } else {
        liAttr = {
            'onclick': 'switchChannel(' + channelObject.name + ')'
        };
    }
    var boxesStyle = {
        'background-color': '#3F51B5',
        'font-size': 'small',
        'color': 'white',
        'padding': '2px 4px',
        'margin': '2px',
        'border-radius': '2px',
    };

    var parentBoxesStyle = {
        'display': 'flex',
        'align-items': 'center'
    };

    $('<li>').attr(liAttr).html('#' + channelObject.name).append($('<span>').attr('class', 'channel-meta').css(parentBoxesStyle).append($('<i>').attr('class', starClasses)).append($('<span>' + channelObject.expiresIn + ' min</span>')
        .css(boxesStyle)).append($('<span>' + channelObject.messageCount + ' new</span>').css(boxesStyle)).append($('<i>').attr('class', 'fas fa-chevron-right'))).appendTo('#channel-list');
}
