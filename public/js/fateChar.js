var usedSkills = []
var allSkills;

// access with skillMap[column, row], indexing starts from top-left
var skillMap;
var arrangement;
var skillPoints;
var pointsRemaining;

var skillCols = 7;
var skillRows = 5;

$(document).ready(function() {
	$("#img_url").keyup(function(event) {
		if (event.which == 13) {
			$("#char_pic").attr("src", $("#img_url").val());
		}
	});
});

// Skills Stuff
$(document).ready(function() {
	initSetup();
	initializeSkillMap();
	newSkillSelection();
});

function initSetup() {
	allSkills = JSON.parse($("#skill_list").val());
	arrangement = $("#skill_arrangement").val();
	skillPoints = $("#skill_points").val();
	pointsRemaining = skillPoints;
}

function initializeSkillMap() {
	skillMap = [,,,,,,];
	for (i = 0; i < skillCols; i++) {
		skillMap[i] = [];
		for (x = 0; x < skillRows; x++) {
			skillMap[i].push(false);
		}
	}
}

function replaceLabel(item_id, newLabel) {
	console.log("settingInnerHTML");
	$("#" + item_id).html(newLabel);
}

function idToIndices(item_id) {
	var t = item_id.split("_");
	t.splice(t.indexOf("row"), 1);
	t.splice(t.indexOf("col"), 1);
	t.splice(t.indexOf("skill"), 1);
	t[0] = parseInt(t[0]);
	t[1] = parseInt(t[1]);
	return t;
}

function getSkillsOfPlus(row) {
	var val = 0;
	for (i = 0; i < skillCols; i++) {
		if (skillMap[i][row]) {
			val++;
		}
	}
	return val;
} 

function chooseSkill(item_id, newlabel) {
	var t = idToIndices(item_id);
	var rowcounter = "#skills_at_" + (skillRows - t[0]);
	var btn = $("#" + item_id).parent();
	if (newlabel == "(None)") {
		skillMap[t[1]][t[0]] = false;
		$(rowcounter).val(getSkillsOfPlus(t[0]));
	} else {
		skillMap[t[1]][t[0]] = true;
		$(rowcounter).val(getSkillsOfPlus(t[0]));
	}
	if (btn.attr("skill") != "(None)") {
		usedSkills.splice(btn.attr("skill"), 1)
		allSkills.push(btn.attr("skill"));
	} 
	allSkills.splice(allSkills.indexOf(newlabel), 1);
	if (newlabel != "(None)") {
		usedSkills.push(newlabel);
	}
	btn.attr("skill", "newlabel");
	replaceLabel(item_id, newlabel);
	newSkillSelection();
}

function newSkillSelection() {
	totalPoints();
	for (row = 0; row < skillRows; row++) {
		for (col = 0; col < skillCols; col++) {
			// Determines totals
			console.log("Checking row " + row + " and col " + col);
			var id = "#row_" + row + "_col_" + col + "_skill";
			// Checks for skills, hiding them in dropdown as needed
//			console.log("hunting for " + id);
			var dropdownMenu = $(id).parent().siblings().children();
//			console.log(dropdownMenu);
//			console.log(dropdownMenu.get(0).innerHTML);
			for (i = 0; i < dropdownMenu.length; i++) {
				if (usedSkills.indexOf(dropdownMenu.get(i).firstChild.innerHTML) != -1) {
					dropdownMenu.get(i).style.display = 'none';
//					console.log("Hiding ");
				} else {
					if (dropdownMenu.get(i).style.display == 'none') {
						dropdownMenu.get(i).style.display = 'inline';
					}
				}
			}
			// Hides invalid buttons
			console.log("Valid =" + validSkillSlots(row, col));
			if (validSkillSlots(row, col)) {
				$(id).parent().prop("disabled", false);
				console.log("Setting row " + row + " col " + col + " to gold ");
				console.log("Extra check - valid = " + validSkillSlots(row, col));
			} else {
				if (skillMap[col][row] == false) {
					$(id).parent().prop("disabled", true);
					console.log("Setting row " + row + " col " + col + " to white ");
				}
			}
			// Sets (None) objects to low opacity
			if (skillMap[col][row] == false) {
				if ($(id).parent().prop("disabled") == false) {
					$(id).parent().fadeTo(20, 0.7);
				} else {
					$(id).parent().css('opacity', '');
				}
				$(id).parent().css('background-color', '');
			} else {
				$(id).parent().fadeTo(20, 1);
				$(id).parent().css('background-color', '#1B1B1B');
			}
		}
	}
}

function totalPoints() {
	var total = skillPoints;
	for (col = 0; col < skillCols; col++) {
		for (row = 0; row < skillRows; row++) {
			if (skillMap[col][row] == true) {
				total -= (5 - row);
			} 
			pointsRemaining = total;
		}
	}
	$("#skill_points_remaining").html(pointsRemaining.toString());
}

function validSkillSlots(row, col) {
	if (col > 0) {
		if (skillMap[col-1][row] == false) {
			return false;
		}
	}
//	console.log("called validSkillSlots on row " + row + " col " + col);
	if ((skillRows - row) > pointsRemaining) {
		console.log("Cost of " + (skillRows - row) + " greater than remaining points of " + pointsRemaining);
		return false;
	} else if (arrangement == "Pyramid") {
//		console.log("Arrangement is Pyramid");
		if (row == skillRows-1) {
//			console.log("Bottom row");
			return true;
		} else {
			if (col < skillCols-1) {
//				console.log("Col < skillCols -1");
				if ((skillMap[col+1][row+1] == true) && (skillMap[col][row+1] == true)) {
					return true;
				}
			} else {
//				console.log("Far right column")
				return false;
			}
		}
	} else if (arrangement == "Column") {
		if (row == skillRows-1) {
			return true;
		} else {
			if (skillMap[col][row+1] == true) {
				return true;
			} else {
				return false;
			}
		}
	} else {
		 return true;
	}
}