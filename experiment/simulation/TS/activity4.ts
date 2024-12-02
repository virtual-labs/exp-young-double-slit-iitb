let verify_count: number = 0;

let res_1: number;
let res_2: number;

function activity4() {
	pp.clearleftpannel();
	pp.clearrightpannel();

	pp.addoffcanvas(3);

	pp.showtitle('', 3);
	pp.showdescription('', 3);



	let success_text = `<br><br><h3 style='text-align: center;' >Experiment Completed Successfully</h3> <br> <br> <button class='btn btn-primary' onclick='start_again();' >Start Again<button>`;
	
	pp.addtoleftpannel(success_text);

}


function start_again() {
	window.location.reload();
}

//activity4();



