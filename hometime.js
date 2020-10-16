console.log('cool');

var partiallyInViewport = function (elem)
{
	var bounding = elem.getBoundingClientRect();
	var height = (window.innerHeight || document.documentElement.clientHeight);
	console.log(height, bounding.top, bounding.bottom);
	return (
		(bounding.top >= 0 && bounding.top <= height) ||
		(bounding.bottom >= 0 && bounding.bottom <= height)
	);
};

var iframe = document.getElementsByTagName('iframe')[0];
var player = new Vimeo.Player(iframe);

var ____startedVideo = false;

var scrollListener = function (e)
{
	if (partiallyInViewport(iframe) && !____startedVideo)
	{
		console.log('Playing video!');
		// can throw
		player.play()
		____startedVideo = true;
		window.removeEventListener('scroll', scrollListener);
	}
}

window.addEventListener('scroll', scrollListener);

var cloneNativeMouseEvent = function (original)
{
	var copy;
	try
	{
		copy = new MouseEvent(original.type, original);
	}
	catch (stupidInternetExplorer)
	{
		copy = document.createEvent('MouseEvent');
		copy.initMouseEvent(original.type, original.bubbles, original.cancelable, original.view,
			original.detail, original.screenX, original.screenY, original.clientX, original.clientY,
			original.ctrlKey, original.altKey, original.shiftKey, original.metaKey, original.button,
			original.relatedTarget)
	}
	return copy;
};

document.getElementsByTagName('button')[0].onclick = function (e)
{
	e.preventDefault();
	var emailVal = document.querySelector('input[type="email"]').value
	if (!!emailVal & emailVal.indexOf("@") !== -1)
	{
		var originalEventClone = cloneNativeMouseEvent(e.originalEvent);
		e.target.dispatchEvent(originalEventClone);
		window.open('https://hometimedevelopments.com/contact-home-time?email=' + emailVal, '_self')
	}
}
