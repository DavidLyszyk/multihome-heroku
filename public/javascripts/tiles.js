var devices = [
	[ 11,	"Main",			 "Ceiling Light",	 3,	 	0,		 3		],
	[ 12,	"Main",			 "Boiler",			 1,	 	1,		 0		],
	[ 13,	"Room",			 "Light",			 4,	 	0,		 1		],
	[ 14,	"Room",			 "Light",			 5,	 	1,		 0		],
	[ 15,	"Room",			 "Curtain",			 10,	0,		 0		],
	[ 16,	"Bathroom",		 "Heater",			 2,	 	1,		 2		]
];
	
	
$( window ).resize(function() {
		compute_layout();
});

$("#tiles").on("show", function() {
	create_tiles();
});
	
function create_tiles() {
	
	//alert("create_tiles");
	
	$("#container-devices-tiles").empty();
	
	var template_device = null;
	
	if ('content' in document.createElement('template')) {
	// initialize all templates here
	
		template_device = document.querySelector('#device-template');
	}
	
	devices.forEach(function(item, index) {
		if (template_device != null) {
			//SetTemplateValue(template_device, "#info", item.id);
			SetTemplateValue(template_device, "#name", "DD"+index);
			//var c = template_device.content.querySelector(".item");
			//if (index == 0)	c.classList.add("active");
			//else c.classList.remove("active");
			var clone = document.importNode(template_device.content, true);
			clone.querySelector(".device").id = "device" + (index+1);
			clone.querySelector(".dev-details").id = "dev-details" + (index+1);
			clone.querySelector(".dev-timers").id = "dev-timers" + (index+1);
			$("#container-devices-tiles").append(clone);
		}
		
		/*var device_tile_html = '<button class="device" id="device';
		device_tile_html = device_tile_html + (index+1) + '">DD' + index + '</button>';
		$("#container-devices-tiles").append(device_tile_html);
		
		var device_details_html = '<button class="dev-details" id="dev-details';
		device_details_html = device_details_html + (index+1) + '"><i class="glyphicon glyphicon-edit gi-2x"></i></button>';
		$("#container-devices-tiles").append(device_details_html);
		
		var device_timers_html = '<button class="dev-timers" id="dev-timers';
		device_timers_html = device_timers_html + (index+1) + '"><i class="glyphicon glyphicon-time gi-2x"></i></button>';
		$("#container-devices-tiles").append(device_timers_html);*/
	});
	compute_layout();
}

function compute_layout() {

	const min_width = 200;
	const max_width = 400;
	const sec_width = 50;
	const hmargin = 10;
	const hsep1 = 10;
	const hsep2 = 5;
	const hpadding = 10;

	const block_part_width = 2*hsep1 + sec_width + hsep2;
	
	var N = devices.length;

	var i;
	var screen_width = 0;
	for (i = 0; i < 10; i++) {
		screen_width = $( window ).width()*0.98;
	}
	
	var w1 = (screen_width - hmargin * 2 - N * block_part_width) / N;
	if (w1 < min_width)	w1 = min_width;
	if (w1 > max_width)	w1 = max_width;
	console.log("screen_width = " + screen_width + " ; w1 = " + w1);
	var N2 = ~~((screen_width - hmargin * 2) / (w1 + block_part_width));
	var w2 = (screen_width - hmargin * 2 - N2 * block_part_width) / N2;
	console.log("N2 = " + N2 + " ; w2 = " + w2);
	
	var pleft = hmargin;
	var ptop = $("#container-devices-tiles").offset().top;
	
	devices.forEach(function(item, index) {
		var device_tile = $("#device" + (index+1));
		device_tile.width(w2 - hsep1 - hpadding);
		device_tile.offset( { left: pleft, top: ptop });
		var device_details = $("#dev-details" + (index+1));
		device_details.width(sec_width);
		pleft = pleft + w2 + hsep2;
		device_details.offset( { left: pleft, top: ptop} );
		var device_timers = $("#dev-timers" + (index+1));
		device_timers.width(sec_width);
		device_timers.offset( { left: pleft, top: ptop + 51} );
		pleft = pleft + hsep1*3 + sec_width;
		if ((index+1) % N2 == 0) {
			pleft = hmargin;
			ptop = ptop + hmargin + 100;
		}
	});
}

function onDeviceMouseMove(element, event) {
	//alert(element.id);
	element.innerHTML = "mouse : " + event.offsetX + " ; " + event.offsetY;
}


