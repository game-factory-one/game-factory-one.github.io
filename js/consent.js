const gaProperty = "UA-164628568-1";
const disableString = "ga-disable-" + gaProperty;

const consent = {
    set newValue(response) {
        document.cookie = `consent=${response}; Expires=Thu, 31 Dec 2099 23:59:59 UTC; path =/`;
    },
    get currentValue() {
        let value = document.cookie;
        if (value === "")
            return value
        else {
            value = document.cookie
                .split('; ')
                .find(row => row.startsWith('consent'))
                .split('=')[1];
            return value;
        }
    }
}

function updateConsent(response) {
    consent.newValue = response;
    console.log("New value of consent: " + consent.currentValue)
    if (consent.currentValue === "false") {
        gaOptOut();
    }
    checkConsent();
    location.reload();
}

function checkConsent() {
    if (consent.currentValue === "false")
        window[disableString] = true;
    else if (consent.currentValue === "true") {
        window[disableString] = false;
        initGoogleAnalytics();
        initFacebookPixel();
    }
    else {
        triggerConsentPopUp();
    }
}

function triggerConsentPopUp() {
    document.getElementsByClassName("consent")[0].style.visibility = "visible";
}

// Google Analytics

function initGoogleAnalytics() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        
    ga('create', gaProperty, 'auto');
    ga('send', 'pageview');
}

function gaOptOut() {
    window[disableString] = true;
}

// Facebook Pixel

function initFacebookPixel() {
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '305700117185200');
    fbq('track', 'PageView');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', (event) => {
    checkConsent();
})


function triggerBadgeAction(value) {
    ga('send', {
        hitType: 'event',
        eventCategory: 'StoreVisited',
        eventAction: 'BadgeClicked',
        eventLabel: value
    });
    fbq("trackCustom", "StoreVisited", { platform: value });
}

