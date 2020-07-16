'use strict';

(function(window, $, undefined) {

	// Constant expressions

	var RE_LEADING_ZERO_PADDING = /^0([0-9]\:)/; // Regex for human-friendly timestamps

	var VIDEO_STREAM_DELAY_MS = 500;

	var KEY_CODES = {};
		KEY_CODES.ENTER = 13;

	var trackingURL = 'https://appleworldwidedeveloper.hb-api.omtrdc.net/api/v1/sessions';
	var trackingURLForSession = 'https://appleworldwidedeveloper.hb-api.omtrdc.net/api/v1/sessions/SESSION_ID/events';
	
	var video = document.getElementById("video");

	if(video !== null){


	video.oncanplay = function() {
		if($("#analytics-meta").attr("data-session-response-id") === ''){
			initAnalyticsSession(video);
		}
	};

	window.onbeforeunload = function() {

		if($("#analytics-meta").attr("data-session-response-id") === ''){
			initAnalyticsSession(video);
		}

		var videoDuration = video.duration;
		var currentVideoTime = video.currentTime;

		if(videoDuration - currentVideoTime > 60){

			
			var request={
				"playerTime": {
					"playhead": video.currentTime,
					"ts": (new Date).getTime()
				},
				"eventType": "sessionEnd"
			};

			$.ajax({
				type: "POST",
				url: trackingURLForSession.replace("SESSION_ID", $("#analytics-meta").attr("data-session-response-id")) ,
				data: JSON.stringify(request),
				headers: {
					'Content-Type':'application/json'
				},
				async: false,
				success: function(data, status, xhr) {
					
				}
			});	

		}else{

			if($("#analytics-meta").attr("data-session-response-id") === ''){
				initAnalyticsSession(video);
			}
			
			var request={
				"playerTime": {
					"playhead": video.currentTime,
					"ts": (new Date).getTime()
				},
				"eventType": "sessionComplete"
			};	
			
			$.ajax({
				type: "POST",
				url: trackingURLForSession.replace("SESSION_ID", $("#analytics-meta").attr("data-session-response-id")) ,
				data: JSON.stringify(request),
				headers: {
					'Content-Type':'application/json'
				},
				async: false,
				success: function(data, status, xhr) {
					
				}
			});
		}	
	
	};

	video.onplay = function() {

		if($("#analytics-meta").attr("data-session-response-id") === ''){
			initAnalyticsSession(video);
		}

		//on play
		if($("#analytics-meta").attr("data-session-response-id") != ''){
			var request={
				"playerTime": {
					"playhead": video.currentTime,
					"ts": (new Date).getTime()
				},
				"eventType": "play"
			};

			$.ajax({
				type: "POST",
				url: trackingURLForSession.replace("SESSION_ID", $("#analytics-meta").attr("data-session-response-id")) ,
				data: JSON.stringify(request),
				headers: {
					'Content-Type':'application/json'
				},
				success: function(data, status, xhr) {
					
				}
			});
		}

	};

	video.onpause = function() {

		if($("#analytics-meta").attr("data-session-response-id") === ''){
			initAnalyticsSession(video);
		}

		//on pause
		if($("#analytics-meta").attr("data-session-response-id") != ''){
			var request={
				"playerTime": {
					"playhead": video.currentTime,
					"ts": (new Date).getTime()
				},
				"eventType": "pauseStart"
			};

			$.ajax({
				type: "POST",
				url: trackingURLForSession.replace("SESSION_ID", $("#analytics-meta").attr("data-session-response-id")) ,
				data: JSON.stringify(request),
				headers: {
					'Content-Type':'application/json'
				},
				success: function(data, status, xhr) {
					
				}
			});
		}
	};

	window.setInterval(function(){

		if($("#analytics-meta").attr("data-session-response-id") === ''){
			initAnalyticsSession(video);
		}
		
		//heartbeat
		if($("#analytics-meta").attr("data-session-response-id") != ''){
			var request={
				"playerTime": {
					"playhead": video.currentTime,
					"ts": (new Date).getTime()
				},
				"eventType": "ping"
			};

			$.ajax({
				type: "POST",
				url: trackingURLForSession.replace("SESSION_ID", $("#analytics-meta").attr("data-session-response-id")) ,
				data: JSON.stringify(request),
				headers: {
					'Content-Type':'application/json'
				},
				success: function(data, status, xhr) {
					
				}
			});
		}
	  }, 10000);

	}

	// Functions
	function getSesionID() {
	return '_' + Math.random().toString(36).substr(2, 9);
	};

	function initAnalyticsSession(video){

		var videoSrc = video.currentSrc;
		var videoPlayer = 'HTML5';

		if(videoSrc.includes('blob:')){
			videoPlayer = 'HLSJS';
		}else{
			videoPlayer = 'HTML5';
		}

		var request={
				"playerTime": {
					"playhead": video.currentTime, 
					"ts": (new Date).getTime()
				},
				"eventType": "sessionStart",
				"params": {
					"media.showType": "fullEpisode", 
					"media.show": $("#analytics-meta").attr("data-event-name"), 
					"media.sdkVersion": "va-api-0.0.0", 
					"media.episode": $("#analytics-meta").attr("data-session-id"), 
					"media.name": $("#analytics-meta").attr("data-video-name"), 
					"analytics.reportSuite": "awdappledeveloper", 
					"appInstallationId":  getSesionID(), 
					"media.playerName": videoPlayer, 
					"media.id": $("#analytics-meta").attr("data-event-id"), 
					"analytics.enableSSL": true, 
					"media.channel": $("#analytics-meta").attr("data-event-name"), 
					"media.contentType": "VOD", 
					"media.length": video.duration, 
					"visitor.marketingCloudOrgId": "71EC21E65AE6EEBA0A495CC6@AdobeOrg", 
					"analytics.trackingServer": "appleworldwidedeveloper.sc.omtrdc.net", 
					"media.originator": "Apple" 
				}
			};

		var SESSION_ID_EXTRACTOR = '^\/api\/(.*)\/sessions\/(.*)';
		
		$.ajax({
			type: "POST",
			url: trackingURL,
			data: JSON.stringify(request),
			headers: {
				'Content-Type':'application/json'
			},
			success: function(data, status, xhr) {
				
				const [, apiVersion, sessionId] = 
				xhr.getResponseHeader('Location').match(SESSION_ID_EXTRACTOR); 
				var _sessionId = sessionId; 
				$("#analytics-meta").attr("data-session-response-id", _sessionId);
			}
		});

	}

	function sanitize(queryString) {
		
		return queryString.trim().replace(/[\!\#\$\%\&\(\)\*\+\,\-\/\:\;\<\=\>\?\^\_\`\{\}\~]/g, '');

	}

	function setActiveMenuTab(supplementId) {

		ui.tabs.map(function(index, elem) {
			elem = $(elem);
			elem.toggleClass('active', !!(elem.data('supplement-id') === supplementId));
		});

		if(supplementId === 'search') {
			ui.search.input.focus();
		}

	}

	function setActiveSupplement(supplementId) {

		ui.supplements.map(function(index, elem) {
			elem = $(elem);
			elem.toggleClass('active', elem.hasClass(supplementId));
		});

		ui.tabs.add(ui.supplements).map(function(index, elem) {

			elem = $(elem);

			// 'Search' supplement section should remain hidden until results are fetched
			if(supplementId === 'search' && elem.hasClass('supplement')) {
				return false;
			}

			elem.toggleClass('active', supplementId === elem.data('supplement-id'));

		});

	}

	function userHasSearched() {

		return !!(ui.search.results.children().length ||
					ui.search.summary.message.text().length);

	}

	function fetchSearchResults(queryString) {

		function success(results, status, xhr) {

			// Update the search summary
			updateSearchSummary(results);

			// Render each transcript result, and the 'More results' link
			renderSearchResults(results);

			// Display the search results supplement section
			setActiveSupplement('search');

		}

		function error(xhr, status, err) {

			// Clear the previous set of results
			ui.search.results.empty();

			// Display an error to the user
			ui.search.summary.error.fadeIn();

		}

		// Reset messaging in the results summary

		ui.search.summary.instructions.fadeOut();
		ui.search.summary.error.fadeOut();

		var id = ui.video.player.attr('data-id');

		var url = '/search/search_data.php?type=transcript&id=' + id + '&q=' + queryString;

		var xhrConfig = {
			'url': 		url,
			'method': 	'GET',
			'dataType': 'json',
			'success': 	success,
			'error': 	error
		};

		// Send a request to the transcript service

		$.ajax(xhrConfig);

	}

	function updateSearchSummary(results) {

		// Construct a summary message, including the submitted query string
		var html = parseInt(results.length) + ' results for <strong>"' + watchables.transcriptQueryString.get() + '"</strong>';

		ui.search.summary.message
			.html(html)
			.fadeIn();

	}

	function createResultListItem(result) {

		// Parse the transcript start time into a more readable format
		var start_time = result.human_start_time.replace(RE_LEADING_ZERO_PADDING, function(a,b) {
			return (parseInt(b)) ? b : '';
		});

		// Create new DOM elements for the transcript result

		var item 		= $('<li class="transcript-result">').data('start-time', result.sec_from),
			wrapper 	= $('<section class="column large-12 no-padding-top no-padding-bottom">'),
			anchor 		= $('<a href="/videos/play/' + result.event + '-' + result.session_id + '/?time=' + result.sec_from + '">'),
			timestamp 	= $('<span class="timestamp smaller lighter">').text(start_time),
			sentence 	= $('<span class="sentence smaller">').html(result.sentence);

		// Set up the element hierarchy

		item.append(wrapper.append(anchor.append(timestamp, sentence)));

		return item;

	}

	function renderSearchResults(results) {

		// Translate the set of JSON results to DOM structures
		ui.search.results.html(results.map(createResultListItem));

	}

	function setVideoPlaybackPosition(seconds, autoplay) {

		if(typeof seconds !== 'number') {
			seconds = 0;
		}

		if(typeof autoplay === 'undefined') {
			autoplay = true;
		}

		// Update 'time' parameter in the browser URL

		var params = window.getUrlParameters();

		params.time = seconds.toString();

		window.setUrlParameters(params);

		// Set the video player's current time

		var player = ui.video.player.get(0);

		player.currentTime = seconds + (VIDEO_STREAM_DELAY_MS / 1000);

		if(autoplay) {
			player.oncanplay = function() {
				player.play();
			}
		}

	}
	

	// UI reference cache

	var ui = {};

	ui.body = $('body');

	ui.video = {};
	ui.transcript = {};
	ui.search = {};
	ui.search.summary = {};

	// Watchables

	var watchables = {};

	watchables.transcriptQueryString = new Watchable(function setter(value) {
		if(typeof value === 'string') {
			return sanitize(value);
		}
	});

	// Timeouts

	var timeouts = {};

	timeouts.onFinishedTyping = new Timeout(function() {
		fetchSearchResults(watchables.transcriptQueryString.get());
	});

	// On document ready


	$(function() {

		function init() {

			// Display the first supplement wrapper
			ui.supplements.filter('[data-supplement-id="details"]').parent().removeClass('hidden');

			// Set the first tab in the menu to be active
			ui.tabs.filter('[data-supplement-id="details"]').trigger('click');

			// Fade in the searchbar
			ui.search.wrapper.delay(450).animate({ 'opacity': 1 }, 650);

			// Transform the transcript sentences into hyperlink shortcuts
			transformTranscriptText();

			// Add click listener to new sentence hyperlinks
			ui.transcript.sentences = ui.transcript.wrapper.find('.sentence');
			ui.transcript.sentences.on('click', handlers.onClickTranscriptLink);

		}

		function hlsInit() {

			var video = document.getElementById('video')
			
			if(video !== null){
				//check if native HLS supported
				if (video.canPlayType('application/vnd.apple.mpegurl')) {

					//get the video src and set it.
					var video_source = $('#video').attr('src');

					video.src = video_source;

					//auto play video.
					video.addEventListener('canplay', function () {

						video.oncanplay = function() {
							video.play();
						}

					})
				
				//not supported HSL
				}else if (Hls.isSupported()) {

					//strip out src.
					var video_source = $('#video').attr('src');

					$('#video').attr('src', '');

					var video = document.getElementById('video');

					//attach hls.js blob.
					var hls = new Hls({enablePerformanceLogging: false});

					hls.loadSource(video_source + '?' + Math.floor(Math.random() * 99999));

					hls.attachMedia(video);
					
					//play on HLS ok.
					hls.on(Hls.Events.MANIFEST_PARSED, function () {
						video.oncanplay = function() {
							video.play();
						}
					})
				}else{
					$('#video').addClass('hidden');
					$('.no-video-banner').removeClass('hidden');
					
				}
			}

		}

		function transformTranscriptText() {

			var videoBaseUrl = ui.transcript.wrapper.data('shortcut-base-url');

			var sentences = ui.transcript.sentences
				.each(function(index, elem) {

					var span = $(elem).find('span'),
						time = parseInt(span.data('start'));

					var anchor = $('<a class="sentence">')
						.data('start-time', time)
						.attr('href', videoBaseUrl + '?time=' + time)
						.text(span.text());

					$(elem).replaceWith(anchor);

				});

		}

		function downloadFile(filename, text) {
			var element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
			element.setAttribute('download', filename);
		  
			element.style.display = 'none';
			document.body.appendChild(element);
		  
			element.click();
		  
			document.body.removeChild(element);
		  }

		// UI references cache

		ui.video.wrapper = ui.body.find('.video-wrapper');
		ui.video.player	= ui.video.wrapper.find('video');

		ui.tabs = ui.body.find('.tab');

		ui.supplements = ui.body.find('.supplement');

		ui.transcript.wrapper = ui.supplements.filter('[data-supplement-id="transcript"]');
		ui.transcript.sentences = ui.transcript.wrapper.find('.sentence');
		ui.transcript.download = ui.transcript.wrapper.find('#get-transcript');

		ui.search.wrapper 	= ui.body.find('.searchbar-wrapper');
		ui.search.toggle 	= ui.search.wrapper.find('button');
		ui.search.input 	= ui.search.wrapper.find('input').filter(':visible');

		ui.search.summary.wrapper 		= ui.supplements.filter('.search').find('.transcript-results-summary');
		ui.search.summary.message		= ui.search.summary.wrapper.find('.message');
		ui.search.summary.instructions 	= ui.search.summary.wrapper.find('.instructions');
		ui.search.summary.error 		= ui.search.summary.wrapper.find('.error');

		ui.search.results 	= ui.supplements.filter('.search').find('.transcript-results');

		// Define event handlers

		var handlers = {};

		handlers.onClickMenuTab = function(e) {

			e.preventDefault();

			var targetTab = $(e.currentTarget);

			var targetSupplementId = targetTab.data('supplement-id');

			setActiveMenuTab(targetSupplementId);

			// Avoid displaying the 'search' supplement area if no results have been rendered
			if(targetSupplementId === 'search' && !userHasSearched()) {
				return;
			}

			setActiveSupplement(targetSupplementId);

		};

		handlers.onChangeTranscriptQueryString = function(e) {

			// Update the queryString watchable
			watchables.transcriptQueryString.set(ui.search.input.val());

			if(e.type === 'keyup' && e.keyCode === 13) {

				// Execute a new transcript search immediately
				timeouts.onFinishedTyping.set(10);

			} else {

				// Begin (or extend) the typing timeout
				timeouts.onFinishedTyping.set(1000);

			}

		};

		handlers.onClickTranscriptLink = function(e) {

			e.preventDefault();

			var seconds = $(e.currentTarget).data('start-time');

			setVideoPlaybackPosition(seconds);

		};

		handlers.parseTime = function(timeString) {
			var testTime = /^(\d+h)?(\d+m)?(\d+s)?/i,
				timeMatch = timeString.match(testTime),
				//timeGroups = timeMatch.groups,
				time = 0;

			if (timeMatch[0] === "") {
				// ?t=1000
				time = (parseInt(timeString, 10) || 0);
			} else {
				// ?t=1h20m4s
				if (timeMatch[1]) {
					time += (parseInt(timeMatch[1], 10) || 0) * 60 * 60;
				}
				if (timeMatch[2]) {
					time += (parseInt(timeMatch[2], 10) || 0) * 60;
				}
				if (timeMatch[3]) {
					time += (parseInt(timeMatch[3], 10) || 0);
				}
			}

			return time;
		};

		handlers.onBufferVideoStream = function(e) {

			// Set initial playback position of the video

			var params = window.getUrlParameters(),
				player;

			if('time' in params || 't' in params) {
				player = ui.video.player.get(0);
				player.currentTime = handlers.parseTime(params.time || params.t);
				player.oncanplay = function() {
					player.play();
				}
			}

			ui.video.player.off('canplaythrough', handlers.onBufferVideoStream);

		};

		handlers.onClickDownload = function(e) {

			// get the transcript
			var transcript  = $('.sentence').text().replace(/(\r\n|\n|\r)/gm,"").replace(/(  )/gm," ").replace(/\./g, '.\n');
			downloadFile('transcript.txt', transcript);

		};

		// User event listeners

		ui.tabs.on('click', handlers.onClickMenuTab);
		
		ui.transcript.download.on('click', handlers.onClickDownload);

		ui.search.input.on('keyup change paste', handlers.onChangeTranscriptQueryString);

		ui.search.results.on('click', '.transcript-result', handlers.onClickTranscriptLink);

		// Media event listeners

		ui.video.player.on('canplaythrough', handlers.onBufferVideoStream);

		// Initialize

		init();

		//HLS init
		hlsInit();

	});

}(window, jQuery));
