function set_table_in_offcanvas() {
    table_heading = ['S No.', `Selected &lambda; (nm)`, `L (m)`, `Slit width d (mm)`, `Central spot to <br> first Maxima Y1 (mm)`, `Central spot to <br> Second Maxima Y2 (mm)`];
    let parent_ele = document.getElementById('pannel4');
    tab_obj = new Verify_Rows_Cols_Custom_Fixed_Update1(table_heading, data, [0], [[1, 2, 3, 4, 5]], '', parent_ele, true, true, () => { alert('Success'); }, 5);
    tab_obj.load_table();
}
function update_table() {
    if (!obs_started) {
        data = [];
        obs_started = true;
    }
    let y1 = (selected_adj * Math.tan(Math.asin(selected_lambda * 1e-9 / (d_value * 1e-3)))) * 1000;
    let y2 = (selected_adj * Math.tan(Math.asin(2 * selected_lambda * 1e-9 / (d_value * 1e-3)))) * 1000;
    let ar = [data.length + 1, selected_lambda, selected_adj, d_value, y1, y2];
    data.push(ar);
    table_heading = ['S No.', `Selected &lambda; (nm)`, `L (m)`, `Slit width d (mm)`, `Central spot to <br> first Maxima Y1 (mm)`, `Central spot to <br> Second Maxima Y2 (mm)`];
    let parent_ele = document.getElementById('pannel4');
    parent_ele.innerHTML = ``;
    tab_obj = new Verify_Rows_Cols_Custom_Fixed_Update1(table_heading, data, [data.length - 1], [[1, 2, 3]], '', parent_ele, true, true, () => { hide_offcanvas(4); }, 5);
    tab_obj.load_table();
    show_offcanvas(4);
    //diable add reading button
    let btn = document.getElementById('act3_button');
    btn.disabled = true;
    if (data.length == 5) {
        alert('You have taken 5 reading successfully!!');
        activity4();
    }
}
set_table_in_offcanvas();
//# sourceMappingURL=obs_table.js.map