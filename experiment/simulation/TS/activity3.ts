let show_opp: boolean = false;
let tri: Chemistry.Polygon;
let left_bar: Chemistry.Rectangle;

//graph dots for all the orders
let center_dot: Chemistry.Geometry;
let first_upper_dot: Chemistry.Geometry;
let second_upper_dot: Chemistry.Geometry;

// line to represent y length
let y_line;
let x_line;
let text_x: Chemistry.Geometry;
let text_y: Chemistry.Geometry;
let text_y2: Chemistry.Geometry;

//laser rays
let source_ray: Chemistry.Line;
let center_ray: Chemistry.Line;
let first_up_ray: Chemistry.Line;
let first_up2_ray: Chemistry.Line;
let second_up_ray: Chemistry.Line;
let second_up2_ray: Chemistry.Line;

let d_y1: number = 395;
let d_y2: number = 395;


let screen_y1: number = 0;
let screen_y2: number = 0;

let current_color_code: 'fff'; 

let tab_obj;
let obs_started: boolean = false;


function activity3() {
	pp.clearleftpannel();
	pp.clearrightpannel();

	pp.addoffcanvas(3);

	//-----------------------------------------------------------------
	// for second offcanvas button
	pp.addoffcanvas(4);
	let offcnvbtns = document.getElementsByClassName('offcanvasbtn');
	let offcnvbtn: HTMLButtonElement = <HTMLButtonElement> offcnvbtns[1];
	offcnvbtn.style.position = 'absolute';
	offcnvbtn.style.top = '60px';
	let itag = document.getElementsByClassName('bi bi-arrow-bar-left offcanvasicon')[1];
	itag.className = 'bi bi-table offcanvasicon';
	let off4main: HTMLDivElement = <HTMLDivElement> document.getElementById('offcanvasRight4');

	off4main.style.width = '80vw';
	//----------------------------------------------------------------

	pp.showtitle(
		`<p id="exp-title">Diffraction grating: to determine the wavelength of laser</p>`,
		3
	);

	let left_panel_text = `
    <div style="position:absolute;" id="act3-left-content">

    <div style="position:absolute; top:3vw; left:2vw; width: 25vw; font-size: 1.2vw;" >
        <label style='font-size: 1.2vw;' for="">Slit length (mm)</label>
    
		 <input style='font-size: 1.2vw;' onchange='set_N();' oninput='set_N();' type="range" min="7" max="10" value="2" id="N-dd"> <br>
		 <span id='dsp-N'></span>
		 
    </div>


    <div style="position:absolute; top:3vw; left: 60vw; width:25vw;" >
        <label style='font-size: 1.2vw;' for="">Adj. distance L (m)</label>
        <input style='font-size: 1.2vw;' onchange='set_adj();' oninput='set_adj();' type="range" min="2" max="7" value="2" id="adj-inp"> <br>
		<span id='dsp-L'></span>
    </div>

    <input disabled style="position:absolute; left:51.2vw; top: 30vw; width:14vw; background-color:inherit; border:none; font-size: 1.2vw;" value=""  type="text" class="form-control" id="show-adj">

    <div style="position: absolute;  top:11vw; left:8vw; width:20vw">
        <label style='font-size: 1.2vw;' for="">Set Lambda Value</label>
        <input style='font-size: 1.2vw;' type="range" min='380' max='650' step='10' value="380" id='range' onchange="set_lambda();" oninput="set_lambda();">

   </div>

   <div style="position: absolute;  top:16vw; left:8vw; width:20vw">
        <label for="" style='font-size: 1.2vw;'>&lambda; Value = </label>
        <input disabled type='text' class='form-control' style="display: inline !important; width: 40%; background-color:inherit; font-size: 1.2vw; border: none;"  id='original-value'>
   </div>


   <input disabled type='button' class='btn btn-primary' value="Add Reading" style="position: absolute;top: 40vw; left:43vw; margin-left: 3%; width: 10vw; font-size: 1.2vw;" id='act3_button' onclick='update_table();'>

    `;

	pp.addtoleftpannel(left_panel_text);

	load_N_values();

	//define canvas
	pp.addcanvas('my_canvas');
	canvas = pp.canvas;
	context = canvas.getContext('2d');
	canvas.style.cursor = 'crosshair';
	rect = canvas.getBoundingClientRect();
	scene = new Scene();

	draw_rec();

	center_dot = new Chemistry.Circle(
		new Chemistry.Point(1500, 393),
		10,
		canvas
	);
	first_upper_dot = new Chemistry.Circle(
		new Chemistry.Point(1500, 393),
		7,
		canvas
	);
	second_upper_dot = new Chemistry.Circle(
		new Chemistry.Point(1500, 393),
		5,
		canvas
	);
	

	y_line = new Chemistry.DoubleArrowLine(1600, 393, 1600, 398, 'black', 10, canvas);
	x_line = new Chemistry.DoubleArrowLine(1080, 270, 1415, 270, 'black', 10, canvas);


	text_y = new Chemistry.Geo_Text(
		'Y1 = 0',
		new Chemistry.Point(1620, 393),
		canvas
	);

	text_y2 = new Chemistry.Geo_Text(
		'Y2 = 0',
		new Chemistry.Point(1620, 480),
		canvas
	);

	text_x = new Chemistry.Geo_Text(
		'L = 5 m',
		new Chemistry.Point(1360, 290),
		canvas
	);

	source_ray = new Chemistry.Line(
		new Chemistry.Point(158, 395),
		new Chemistry.Point(1080, 395),
		2,
		'red',
		canvas
	);
	center_ray = new Chemistry.Line(
		new Chemistry.Point(1080, 395),
		new Chemistry.Point(1500, 395),
		1.5,
		'red',
		canvas
	);
	first_up_ray = new Chemistry.Line(
		new Chemistry.Point(1080, d_y1),
		new Chemistry.Point(1500, 395),
		1,
		'red',
		canvas
	);

	first_up2_ray = new Chemistry.Line(
		new Chemistry.Point(1080, d_y2),
		new Chemistry.Point(1500, 395),
		1,
		'red',
		canvas
	);
	
	second_up_ray = new Chemistry.Line(
		new Chemistry.Point(1080, d_y1),
		new Chemistry.Point(1500, 395),
		0.7,
		'red',
		canvas
	);

	second_up2_ray = new Chemistry.Line(
		new Chemistry.Point(1080, d_y2),
		new Chemistry.Point(1500, 395),
		0.7,
		'red',
		canvas
	);

	scene.add(center_dot);
	scene.add(first_upper_dot);
	scene.add(second_upper_dot);
	scene.add(y_line);
	scene.add(x_line);

	scene.add(source_ray);
	scene.add(first_up_ray);
	scene.add(first_up2_ray);
	scene.add(second_up_ray);
	scene.add(second_up2_ray);
	scene.add(center_ray);

	scene.add(text_y);
	scene.add(text_y2);
	scene.add(text_x);

	window.onload = a2_windowresize;
	window.onresize = a2_windowresize;
	a2_windowresize();
	
}

function draw_rec() {
	let graph_unit = [
		new Chemistry.Geo_Text('1', new Chemistry.Point(1455, 393), canvas),
		new Chemistry.Geo_Text('2', new Chemistry.Point(1455, 420), canvas),
		new Chemistry.Geo_Text('3', new Chemistry.Point(1455, 448), canvas),
		new Chemistry.Geo_Text('4', new Chemistry.Point(1455, 474), canvas),
		new Chemistry.Geo_Text('5', new Chemistry.Point(1455, 502), canvas),
		new Chemistry.Geo_Text('6', new Chemistry.Point(1455, 528), canvas),
		new Chemistry.Geo_Text('7', new Chemistry.Point(1455, 554), canvas),
		new Chemistry.Geo_Text('8', new Chemistry.Point(1455, 582), canvas),
		new Chemistry.Geo_Text('9', new Chemistry.Point(1455, 610), canvas),
		new Chemistry.Geo_Text('10', new Chemistry.Point(1455, 638), canvas),
		new Chemistry.Geo_Text('11', new Chemistry.Point(1455, 665), canvas),
	];
	//define left_rectangle
	let left_rec = new Chemistry.Rectangle(
		canvas.height * 9,
		canvas.width * 2,
		new Chemistry.Point(100, 100),
		canvas
	);
	//define right_rectangle
	let right_rec = new Chemistry.Rectangle(
		canvas.height * 2.5,
		canvas.width * 2,
		new Chemistry.Point(1451, 100),
		canvas
	);

	//define left bar
	left_bar = new Chemistry.Rectangle(
		4,
		left_rec.w - 80,
		new Chemistry.Point(1075.5, 150),
		canvas
	);

	//define right bar
	let right_bar = new Chemistry.Rectangle(
		30,
		left_rec.w - 80,
		new Chemistry.Point(1415, 150),
		canvas
	);

	//define pointer triangle
	tri = new Chemistry.Polygon(new Chemistry.Point(1077.5, 150), 5, 3, canvas);

	let graph_img = new Chemistry.Custome_image(
		graph,
		new Chemistry.Point(1639, 400),
		327 * 1.13,
		545 * 1.1,
		canvas
	);
	let left_x_scale = new Chemistry.Custome_image(
		x_scale_left,
		new Chemistry.Point(775, 125),
		1822 * 0.74,
		198 * 0.25,
		canvas
	);

	let laser_img = new Chemistry.Custome_image(
		laser,
		new Chemistry.Point(133.5, 403),
		131 * 0.5,
		90 * 0.5,
		canvas
	);

	tri.stang = 30;
	tri.color = 'red';
	left_bar.color = 'black';
	right_bar.color = 'black';
	left_rec.color = 'white';
	right_rec.color = 'white';

	scene.add(left_rec);
	scene.add(right_rec);
	scene.add(left_x_scale);
	scene.add(graph_img);
	scene.add(left_bar);
	//scene.add(right_bar);
	//scene.add(tri);
	scene.add(laser_img);

	for (let i = 0; i < graph_unit.length; i++) {
		graph_unit[i].color = 'red';
		graph_unit[i].font = '20px Arial';
		scene.add(graph_unit[i]);
	}
}

function a2_windowresize() {
	//canvas size
	a2_canvas_size();

	//canvas mapping
	a2_canvas_mapping();

	//draw scene
	scene.draw();
}

function a2_canvas_size() {
	canvas.width = window.innerWidth * 0.91;
	canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
	lscale = canvas.width / 1920.0;
	document.getElementById('leftpannel').style.height =
		canvas.height + 5 + 'px';
	document.getElementById('leftpannel').style.margin = '0';
}

function a2_canvas_mapping() {
	context.translate(0, canvas.height);
	context.scale(1, -1);
}

function load_N_values() {
	let N_sel: HTMLSelectElement = <HTMLSelectElement>(
		document.getElementById('N-dd')
	);

	N_sel.innerHTML = `<option value=''>--Select--</option>`;

	for (let i = 0; i < N_values.length; i++) {
		N_sel.innerHTML += `<option value='${N_values[i]}'>${N_values[i]}</option>`;
	}
}

function set_N() {
	let N_sel: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('N-dd')
	);


	let adj_ele: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('adj-inp')
	);


	let dsp: HTMLSpanElement = <HTMLSpanElement> document.getElementById('dsp-N');

	if (N_sel.value) {
		selected_N = parseInt(N_sel.value);

		adj_ele.disabled = false;

		d_value = parseInt(N_sel.value);
		d_y1 = 395 - 2*(d_value);
		d_y2 = 395 + 2*(d_value);

		update_dots();
		update_d();
		update_color();
		update_y1_y2();
		

		scene.draw();
		enable_add_reading();

		selected_n = 2;
	} else {
		adj_ele.disabled = true;
	}

	dsp.innerHTML = `d = ${selected_N} mm`;
	
}

function update_d() {
	first_up_ray.y1 = d_y1;
	first_up_ray.y2 = 393 + 65000*selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3)));
	second_up_ray.y1 = d_y1;
	second_up_ray.y2 = 393 + 65000*selected_adj*Math.tan(Math.asin(2*selected_lambda*1e-9/(d_value*1e-3)));

	first_up2_ray.y1 = d_y2;
	first_up2_ray.y2 =  393 + 65000*selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3)));
	second_up2_ray.y1 = d_y2;
	second_up2_ray.y2 =  393 + 65000*selected_adj*Math.tan(Math.asin(2*selected_lambda*1e-9/(d_value*1e-3)));

	console.log(650000*selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3))));
	
}


function update_dots() {
	first_upper_dot.stpt.y = 393 + 65000*selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3)));
	second_upper_dot.stpt.y = 393 + 65000*selected_adj*Math.tan(Math.asin(2*selected_lambda*1e-9/(d_value*1e-3)));
}


function set_order() {
	let n_sel: HTMLSelectElement = <HTMLSelectElement>(
		document.getElementById('order-dd')
	);

	let slider_ele: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('range')
	);

	let adj_ele: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('adj-inp')
	);

	if (n_sel.value) {
		selected_n = parseInt(n_sel.value);

		slider_ele.disabled = false;

		adj_ele.disabled = false;
	} else {
		slider_ele.disabled = true;

		adj_ele.disabled = true;
	}
}

function set_lambda() {
	let slider_ele: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('range')
	);
	let reading: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('lambda-reading')
	);
	let btn: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('act3_button')
	);

	let original_lambda: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('original-value')
	);

	selected_lambda = parseInt(slider_ele.value);

	


	//reading.value = opp.toFixed(1);

	original_lambda.value = slider_ele.value + 'nm';

	btn.disabled = false;

	//let distance_array = [];

	//let arr0 = point_distance(selected_adj);
	//let arr1 = [];


	update_d();
	update_dots();
	update_color();
	update_y1_y2();

	scene.draw();

	enable_add_reading();
}

function set_adj() {
	let adj_ele: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('adj-inp')
	);

	let show: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('show-adj')
	);

	let reading: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('lambda-reading')
	);

	let dsp: HTMLSpanElement = <HTMLSpanElement> document.getElementById('dsp-L');

	if (adj_ele.value) {
		tri.stpt.x = 1077.5 - (parseInt(adj_ele.value) - 5) * 67.2;
		left_bar.stpt.x = 1075.5 - (parseInt(adj_ele.value) - 5) * 67.2;

		source_ray.x2 = left_bar.stpt.x;
		first_up_ray.x1 = left_bar.stpt.x;
		first_up2_ray.x1 = left_bar.stpt.x;
		second_up_ray.x1 = left_bar.stpt.x;
		second_up2_ray.x1 = left_bar.stpt.x;
		center_ray.x1 = left_bar.stpt.x;

		x_line.x1 = 1075 - (parseInt(adj_ele.value) - 5) * 67.2;
		text_x.text = `L = ${parseInt(adj_ele.value)} m`;
		scene.draw();
	}

	selected_adj = parseInt(adj_ele.value);

	if (show_opp) {
		let selected_index = 0;

		for (let i = 0; i < data.length; i++) {
			if (data[i][1] * 10 ** 8 == selected_lambda) {
				selected_index = i;
			}
		}

		// calculate_table(selected_n);
		// calculate_opp(selected_index);

		// calculate_opp(selected_index);
		reading.value = opp.toFixed(1);
	}

	// added to reflect change at adj. slider

	let selected_index = 0;

	for (let i = 0; i < data.length; i++) {
		if (Math.round(data[i][1] * 10 ** 8) == selected_lambda) {
			selected_index = i;
		}
	}

	d_y1 = 395 - 2*(d_value);
	d_y2 = 395 + 2*(d_value);

	update_dots();
	update_d();
	update_color();
	update_y1_y2();
	enable_add_reading();

	dsp.innerHTML = `L = ${selected_adj} m`;
}

function draw_dots(order: number, d_array: number[]) {
	center_dot.stpt.x = 1500;
	center_dot.stpt.y = 393;
	first_upper_dot.stpt.y = 1500;
	second_upper_dot.stpt.y = 1500;

	first_up_ray.y2 = first_upper_dot.stpt.y;
	first_up2_ray.y2 = first_upper_dot.stpt.y;
	second_up_ray.y2 = second_upper_dot.stpt.y;
	second_up2_ray.y2 = second_upper_dot.stpt.y;
	

	if (order == 1) {
		center_dot.stpt.x = 1500;
		center_dot.stpt.y = 393;
		first_upper_dot.stpt.y = 393 + d_array[0][7] * 5;

		first_up_ray.y2 = first_upper_dot.stpt.y;
		first_up2_ray.y2 = first_upper_dot.stpt.y;

		second_up_ray.y2 = 393;
		second_up2_ray.y2 = 393;
	
		y_line.y2 = 393 + d_array[0][7] * 5;
		text_y.text = `Y1 = ${(selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3)))).toFixed(6)} mm`;
		text_y2.text = `Y2 = ${(selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3)))).toFixed(6)} mm`;
		

		scene.draw();
	}

	if (order == 2) {
		center_dot.stpt.x = 1500;
		center_dot.stpt.y = 393;
		
		first_upper_dot.stpt.y = 393 + d_array[0][7] * 2;
		
		second_upper_dot.stpt.y = 393 + d_array[1][7] * 2;

		first_up_ray.y2 = first_upper_dot.stpt.y;
		first_up2_ray.y2 = first_upper_dot.stpt.y;

		second_up_ray.y2 = second_upper_dot.stpt.y;
		second_up2_ray.y2 = second_upper_dot.stpt.y;


		y_line.y2 = 393 + d_array[1][7] * 2;
		text_y.text = `Y1 = ${(selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3)))).toFixed(6)} mm`;
		text_y2.text = `Y2 = ${(selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3)))).toFixed(6)} mm`;

		scene.draw();
	}

	if (order == 3) {
		center_dot.stpt.x = 1500;
		center_dot.stpt.y = 393;
		first_upper_dot.stpt.y = 393 + d_array[0][7];
		second_upper_dot.stpt.y = 393 + d_array[1][7];

		first_up_ray.y2 = first_upper_dot.stpt.y;
		first_up2_ray.y2 = first_upper_dot.stpt.y;

		second_up_ray.y2 = second_upper_dot.stpt.y;
		second_up2_ray.y2 = second_upper_dot.stpt.y;


		y_line.y2 = 393 + d_array[2][7];
		text_y.text = `Y1 = ${(selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3)))).toFixed(6)} mm`;
		text_y2.text = `Y2 = ${(selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3)))).toFixed(6)} mm`;

		scene.draw();
	}
}

function update_color() {
	let color = nmToRGB(selected_lambda);
	let current_color_code = `rgb(${color[0]} ${color[1]} ${color[2]})`;

	center_dot.color = current_color_code;
	first_upper_dot.color = current_color_code;
	second_upper_dot.color = current_color_code;

	center_ray.color = current_color_code;
	first_up_ray.color = current_color_code;
	first_up2_ray.color = current_color_code;
	second_up_ray.color = current_color_code;
	second_up2_ray.color = current_color_code;


	source_ray.color = current_color_code;

}

function update_y1_y2() {
	text_y.text = 'Y1 = ' + (selected_adj*Math.tan(Math.asin(selected_lambda*1e-9/(d_value*1e-3))) * 1000).toFixed(5) + ' mm';
	text_y2.text = 'Y2 = ' + (selected_adj*Math.tan(Math.asin(2*selected_lambda*1e-9/(d_value*1e-3))) * 1000).toFixed(5) + ' mm';

	console.log(text_y.text, text_y2.text);
	
}

function show_offcanvas(id: number) {
	var bsOffcanvas = new bootstrap.Offcanvas(
		document.getElementById(`offcanvasRight${id}`)
	);
	bsOffcanvas.show();
}

function hide_offcanvas(id: number) {
	var bsOffcanvas = new bootstrap.Offcanvas(
		document.getElementById(`offcanvasRight${id}`)
	);
	bsOffcanvas.hide();
}

function enable_add_reading() {
	//diable add reading button
    let btn: HTMLInputElement = <HTMLInputElement> document.getElementById('act3_button');

    btn.disabled = false;
}


activity3();
