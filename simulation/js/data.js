var selected_N = 2500;
var selected_n = 2;
var selected_lambda = 380;
var selected_adj = 2; // in meters
var d_value = 8; // in mm
var opp;
var opp_order1;
var opp_order2;
var opp_order3;
var N_values = [2500, 5929, 10000, 15000];
var n_values = [1, 2, 3];
// table for data from col f to j
//sno, selected wavelength, slit to screen distance L, slit with d (mm), center spot to first maxmim Y1, centerla spot ot second maxima Y2
var table_heading = [];
var data = [
    [1, null, null, null, null, null]
];
var tab_data = [];
let nmToRGB = function (wavelength) {
    var Gamma = 0.80, IntensityMax = 255, factor, red, green, blue;
    if ((wavelength >= 380) && (wavelength < 440)) {
        red = -(wavelength - 440) / (440 - 380);
        green = 0.0;
        blue = 1.0;
    }
    else if ((wavelength >= 440) && (wavelength < 490)) {
        red = 0.0;
        green = (wavelength - 440) / (490 - 440);
        blue = 1.0;
    }
    else if ((wavelength >= 490) && (wavelength < 510)) {
        red = 0.0;
        green = 1.0;
        blue = -(wavelength - 510) / (510 - 490);
    }
    else if ((wavelength >= 510) && (wavelength < 580)) {
        red = (wavelength - 510) / (580 - 510);
        green = 1.0;
        blue = 0.0;
    }
    else if ((wavelength >= 580) && (wavelength < 645)) {
        red = 1.0;
        green = -(wavelength - 645) / (645 - 580);
        blue = 0.0;
    }
    else if ((wavelength >= 645) && (wavelength < 781)) {
        red = 1.0;
        green = 0.0;
        blue = 0.0;
    }
    else {
        red = 0.0;
        green = 0.0;
        blue = 0.0;
    }
    ;
    // Let the intensity fall off near the vision limits
    if ((wavelength >= 380) && (wavelength < 420)) {
        factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
    }
    else if ((wavelength >= 420) && (wavelength < 701)) {
        factor = 1.0;
    }
    else if ((wavelength >= 701) && (wavelength < 781)) {
        factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);
    }
    else {
        factor = 0.0;
    }
    ;
    if (red !== 0) {
        red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
    }
    if (green !== 0) {
        green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
    }
    if (blue !== 0) {
        blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
    }
    console.log([red, green, blue]);
    return [red, green, blue];
};
//nmToRGB(500);
//# sourceMappingURL=data.js.map