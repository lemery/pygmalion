var numAspects = 1;
var numSkills = 1;
var numTracks = 1;
var numConsequenceTypes = 1;
var numGMs = 1;
var numPlayers = 1;
var requiresApproval = false;

function incrementValue(id) {
	console.log("incrementing " + id);
	var name = document.getElementById(id);
	var val = name.value;
	val++;
	name.value = val;
}

function decrementValue(id) {
	console.log("decrementing " + id);
	var name = document.getElementById(id);
	var val = name.value;
	val--;
	name.value = val;	
}

function addAspect() {    
    var inGroup = document.createElement("div");
    inGroup.setAttribute("class", "input-group");
    inGroup.setAttribute("id", "aspect_input_group_" + numAspects);
    
    var typeLabel = document.createElement("span");
    typeLabel.setAttribute("class", "input-group-addon");
    typeLabel.appendChild(document.createTextNode("Aspect Type"));
    
    var aspectType = document.createElement("input");
    aspectType.setAttribute("class", "form-control");
    aspectType.setAttribute("type", "text");
    aspectType.setAttribute("id", "aspect_type_" + numAspects);
    aspectType.setAttribute("name", "aspect_type_" + numAspects);
    
    var removeSpan = document.createElement("span");
    removeSpan.setAttribute("class", "input-group-btn");
    
    var removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-default");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("onClick", "removeAspect(" + numAspects + ")");
    removeButton.setAttribute("id", "remove_aspect_" + numAspects + "_button");
    removeButton.appendChild(document.createTextNode("Remove"));
    
    inGroup.appendChild(typeLabel);
    inGroup.appendChild(aspectType);
    inGroup.appendChild(removeSpan);
    removeSpan.appendChild(removeButton);
    
    var body = document.getElementById("aspects_body");
    var btn = document.getElementById("add_aspect_button");
    body.insertBefore(inGroup, btn);

    incrementValue("num_aspects");
    numAspects++;
}

function removeAspect(num) {
    var inGroup = document.getElementById("aspect_input_group_" + num);
    inGroup.parentNode.removeChild(inGroup);
    for (x = num + 1; x < numAspects; x++) {
        var t = x-1;
        
        var inG = document.getElementById("aspect_input_group_" + x);
        inG.setAttribute("id", "aspect_input_group_" + t);
        
        var aspType = document.getElementById("aspect_type_" + x);
        aspType.setAttribute("id", "aspect_type_" + t);
        aspType.setAttribute("name", "aspect_type_" + t);
        
        var rmBtn = document.getElementById("remove_aspect_" + x + "_button");
        rmBtn.setAttribute("id", "remove_aspect_" + t + "_button");
        rmBtn.setAttribute("onClick", "removeAspect(" + t + ")");        
    }
	decrementValue("num_aspects")
	numAspects--;
}

function addSkill() {    
    var inGroup = document.createElement("div");
    inGroup.setAttribute("class", "input-group");
    inGroup.setAttribute("id", "skill_input_group_" + numSkills);
    
    var skillLabel = document.createElement("span");
    skillLabel.setAttribute("class", "input-group-addon");
    skillLabel.appendChild(document.createTextNode("Skill"));
    
    var skillName = document.createElement("input");
    skillName.setAttribute("class", "form-control");
    skillName.setAttribute("type", "text");
    skillName.setAttribute("id", "skill_name_" + numSkills);
    skillName.setAttribute("name", "skill_name_" + numSkills);
    
    var removeSpan = document.createElement("span");
    removeSpan.setAttribute("class", "input-group-btn");
    
    var removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-default");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("onClick", "removeSkill(" + numSkills + ")");
    removeButton.setAttribute("id", "remove_skill_" + numSkills + "_button");
    removeButton.appendChild(document.createTextNode("Remove"));
    
    inGroup.appendChild(skillLabel);
    inGroup.appendChild(skillName);
    inGroup.appendChild(removeSpan);
    removeSpan.appendChild(removeButton);
    
    var body = document.getElementById("skills_body");
    var btn = document.getElementById("add_skill_button");
    body.insertBefore(inGroup, btn);
    
    incrementValue("num_skills");
    numSkills++;
}

function removeSkill(num) {
    var inGroup = document.getElementById("skill_input_group_" + num);
    inGroup.parentNode.removeChild(inGroup);
    for (x = num + 1; x < numSkills; x++) {
        var t = x-1;
        
        var inG = document.getElementById("skill_input_group_" + x);
        inG.setAttribute("id", "skill_input_group_" + t);
        
        var skillName = document.getElementById("skill_name_" + x);
        skillName.setAttribute("id", "skill_name_" + t);
        skillName.setAttribute("name", "skill_name_" + t);
        
        var rmBtn = document.getElementById("remove_skill_" + x + "_button");
        rmBtn.setAttribute("id", "remove_skill_" + t + "_button");
        rmBtn.setAttribute("onClick", "removeSkill(" + t + ")");       
    }
    decrementValue("num_skills");
    numSkills--;
}

function addTrack() {
	var inGroupA = document.createElement("div");
	inGroupA.setAttribute("class", "input-group");
	
	var nameLabel = document.createElement("span");
	nameLabel.setAttribute("class", "input-group-addon");
	nameLabel.appendChild(document.createTextNode("Name"));
	
	var nameField = document.createElement("input");
	nameField.setAttribute("class", "form-control");
	nameField.setAttribute("type", "text");
	nameField.setAttribute("name", "stress_track_" + numTracks + "_name");
	nameField.setAttribute("id", "stress_track_" + numTracks + "_name");
	
	var inGroupB = document.createElement("div");
	inGroupB.setAttribute("class", "input-group");
	
	var numLabel = document.createElement("span");
	numLabel.setAttribute("class", "input-group-addon");
	numLabel.appendChild(document.createTextNode("Boxes"));
	
	var numBoxes = document.createElement("input");
	numBoxes.setAttribute("class", "form-control");
	numBoxes.setAttribute("type", "number");
	numBoxes.setAttribute("name", "stress_track_" + numTracks + "_size");
	numBoxes.setAttribute("id", "stress_track_" + numTracks + "_size");
	
	var inGroupC = document.createElement("div");
	inGroupC.setAttribute("class", "input-group");
	
	var skillLabel = document.createElement("span");
	skillLabel.setAttribute("class", "input-group-addon");
	skillLabel.appendChild(document.createTextNode("Skill"));
	
	var skillField = document.createElement("input");
	skillField.setAttribute("class", "form-control");
	skillField.setAttribute("type", "text");
	skillField.setAttribute("name", "stress_track_" + numTracks + "_skill");
	skillField.setAttribute("id", "stress_track_" + numTracks + "_skill");
	
    var removeSpan = document.createElement("span");
    removeSpan.setAttribute("class", "input-group-btn");
	
    var removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-default");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("onClick", "removeTrack(" + numTracks + ")");
    removeButton.setAttribute("id", "remove_track_" + numTracks + "_button");
    removeButton.appendChild(document.createTextNode("Remove"));
    
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    row.setAttribute("id", "stress_track_row_" + numTracks);
    
    var col1 = document.createElement("div");
    col1.setAttribute("class", "col-lg-3");
    
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-lg-3");
    
    var col3 = document.createElement("div");
    col3.setAttribute("class", "col-lg-4");	
    
    var col4 = document.createElement("div");
    col4.setAttribute("class", "col-lg-2");
	
    inGroupA.appendChild(nameLabel);
    inGroupA.appendChild(nameField);
    
    inGroupB.appendChild(numLabel);
    inGroupB.appendChild(numBoxes);
    
    inGroupC.appendChild(skillLabel);
    inGroupC.appendChild(skillField);
    
    removeSpan.appendChild(removeButton);
    
    col1.appendChild(inGroupA);
    col2.appendChild(inGroupB);
    col3.appendChild(inGroupC);
    col4.appendChild(removeSpan);
    
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
	
    var body = document.getElementById("stress_tracks_body");
    var btn = document.getElementById("add_track_button");
    body.insertBefore(row, btn);
    
    incrementValue("num_stress_tracks");
    numTracks++;
}

function removeTrack(num) {
    var row = document.getElementById("stress_track_row_" + num);
    row.parentNode.removeChild(row);
    for (x = num + 1; x < numTracks; x++) {
        var t = x-1;
        
        var nRow = document.getElementById("stress_track_row_" + x);
        nRow.setAttribute("id", "stress_track_row_" + t);
        
        var nameField = document.getElementById("stress_track_" + x + "_name");
        nameField.setAttribute("name", "stress_track_" + t + "_name");
        nameField.setAttribute("id", "stress_track_" + t + "_name");
        
        var numBoxes = document.getElementById("stress_track_" + x + "_size")
        numBoxes.setAttribute("name", "stress_track_" + t + "_size");
        numBoxes.setAttribute("id", "stress_track_" + t + "_size");
        
        var rmBtn = document.getElementById("remove_track_button_" + x);
        rmBtn.setAttribute("id", "remove_track_" + t + "_button");
        rmBtn.setAttribute("onClick", "removeTrack(" + t + ")");
        
    }
    decrementValue("num_stress_tracks");
    numTracks--;
}

function addConsequenceType() {
	var row = document.createElement("div");
	row.setAttribute("class", "row");
	row.setAttribute("id", "consequences_row_" + numConsequenceTypes);
	
	var col1 = document.createElement("div");
	col1.setAttribute("class", "col-lg-5");
	
	var inputGroup1 = document.createElement("div");
	inputGroup1.setAttribute("class", "input-group");
	
	var groupLabel = document.createElement("span");
	groupLabel.setAttribute("class", "input-group-addon");
	groupLabel.appendChild(document.createTextNode("Group"));
	
	var groupNameInput = document.createElement("input");
	groupNameInput.setAttribute("class", "form-control");
	groupNameInput.setAttribute("type", "text");
	groupNameInput.setAttribute("name", "consequence_type_" + numConsequenceTypes + "_name");
	groupNameInput.setAttribute("id", "consequence_type_" + numConsequenceTypes + "_name");
	
	var col2 = document.createElement("div");
	col2.setAttribute("class", "col-lg-5");
	
	var inputGroup2 = document.createElement("div");
	inputGroup2.setAttribute("class", "input-group");
	
	var sizesLabel = document.createElement("span");
	sizesLabel.setAttribute("class", "input-group-addon");
	sizesLabel.appendChild(document.createTextNode("Sizes"));
	
	var sizesInput = document.createElement("input");
	sizesInput.setAttribute("class", "form-control");
	sizesInput.setAttribute("type", "text");
	sizesInput.setAttribute("name", "consequence_type_" + numConsequenceTypes + "_sizes");
	sizesInput.setAttribute("id", "consequence_type_" + numConsequenceTypes + "_sizes");
	
	var col3 = document.createElement("div");
	col3.setAttribute("class", "col-lg-2");
	
	var removeButtonSpan = document.createElement("span");
	removeButtonSpan.setAttribute("class", "input-group-btn");
	
	var removeButton = document.createElement("button");
	removeButton.setAttribute("class", "btn btn-default");
	removeButton.setAttribute("type", "button");
	removeButton.setAttribute("onClick", "removeConsequenceType(" + numConsequenceTypes + ")");
	removeButton.setAttribute("id", "remove_consequence_type_" + numConsequenceTypes + "_button");
	removeButton.appendChild(document.createTextNode("Remove"));
	
	row.appendChild(col1);
	row.appendChild(col2);
	row.appendChild(col3);
	
	col1.appendChild(inputGroup1);
	col2.appendChild(inputGroup2);
	col3.appendChild(removeButtonSpan);
	
	inputGroup1.appendChild(groupLabel);
	inputGroup1.appendChild(groupNameInput);
	
	inputGroup2.appendChild(sizesLabel);
	inputGroup2.appendChild(sizesInput);
	
	removeButtonSpan.appendChild(removeButton);
	
    var body = document.getElementById("consequences_body");
    var btn = document.getElementById("add_consequence_type_button");
    body.insertBefore(row, btn);
    
    incrementValue("num_consequence_types");
    numConsequenceTypes++;
}

function removeConsequenceType(num) {
    var row = document.getElementById("consequences_row_" + num);
    row.parentNode.removeChild(row);
    for (x = num + 1; x < numConsequenceTypes; x++) {
        var t = x-1;
        
        var nRow = document.getElementById("consequences_row_" + x);
        nRow.setAttribute("id", "consequences_row_" + t);
        
        var nameField = document.getElementById("consequence_type_" + x + "_name");
        nameField.setAttribute("name", "consequence_type_" + t + "_name");
        nameField.setAttribute("id", "consequence_type_" + t + "_name");
        
        var numBoxes = document.getElementById("consequence_type_" + x + "_sizes")
        numBoxes.setAttribute("name", "consequence_type_" + t + "_sizes");
        numBoxes.setAttribute("id", "consequence_type_" + t + "_sizes");
        
        var rmBtn = document.getElementById("remove_consequence_type_" + x + "_button");
        rmBtn.setAttribute("id", "remove_consequence_type_" + t + "_button");
        rmBtn.setAttribute("onClick", "removeConsequenceType(" + t + ")");
        
    }
    decrementValue("num_consequence_types");
    numConsequenceTypes--;
}

function addGM() {
	var inGroup = document.createElement("div");
	inGroup.setAttribute("class", "input-group");
	inGroup.setAttribute("id", "gm_input_group_" + numGMs);
	
	var usernameLabel = document.createElement("span");
	usernameLabel.setAttribute("class", "input-group-addon");
	usernameLabel.appendChild(document.createTextNode("Username"));
	
	var username = document.createElement("input");
	username.setAttribute("class", "form-control");
	username.setAttribute("type", "text");
	username.setAttribute("id", "gm_username_" + numGMs);
	username.setAttribute("name", "gm_username_" + numGMs);
	
	var removeSpan = document.createElement("span");
	removeSpan.setAttribute("class", "input-group-btn");
	
	var removeButton = document.createElement("button");
	removeButton.setAttribute("class", "btn btn-default");
	removeButton.setAttribute("type", "button");
	removeButton.setAttribute("onClick","removeGM(" + numGMs + ")");
	removeButton.setAttribute("id", "remove_gm_" + numGMs + "_button");
	removeButton.appendChild(document.createTextNode("Remove"));
	
	inGroup.appendChild(usernameLabel);
	inGroup.appendChild(username);
	inGroup.appendChild(removeSpan);
	removeSpan.appendChild(removeButton);
	
	var body = document.getElementById("gms_body");
	var btn = document.getElementById("add_gm_button");
	body.insertBefore(inGroup, btn);
	
	incrementValue("num_gms");
	numGMs++;	    
}

function removeGM(num) {
    var inGroup = document.getElementById("gm_input_group_" + num);
    inGroup.parentNode.removeChild(inGroup);
    for (x = num + 1; x < numGMs; x++) {
        var t = x-1;
        
        var inG = document.getElementById("gm_input_group_" + x);
        inG.setAttribute("id", "gm_input_group_" + t);
        
        var GMName = document.getElementById("gm_username_" + x);
        GMName.setAttribute("id", "gm_username_" + t);
        GMName.setAttribute("name", "gm_username_" + t);
        
        var rmBtn = document.getElementById("remove_gm_" + x + "_button");
        rmBtn.setAttribute("id", "remove_gm_" + t + "_button");
        rmBtn.setAttribute("onClick", "removeGM(" + t + ")");       
    }
    decrementValue("num_gms");
    numGMs--;
}

function addPlayer() {
	var inGroup = document.createElement("div");
	inGroup.setAttribute("class", "input-group");
	inGroup.setAttribute("id", "player_input_group_" + numPlayers);
	
	var usernameLabel = document.createElement("span");
	usernameLabel.setAttribute("class", "input-group-addon");
	usernameLabel.appendChild(document.createTextNode("Username"));
	
	var username = document.createElement("input");
	username.setAttribute("class", "form-control");
	username.setAttribute("type", "text");
	username.setAttribute("id", "player_username_" + numPlayers);
	username.setAttribute("name", "player_username_" + numPlayers);
	
	var removeSpan = document.createElement("span");
	removeSpan.setAttribute("class", "input-group-btn");
	
	var removeButton = document.createElement("button");
	removeButton.setAttribute("class", "btn btn-default");
	removeButton.setAttribute("type", "button");
	removeButton.setAttribute("onClick", "removePlayer(" + numPlayers + ")");
	removeButton.setAttribute("id", "remove_player_" + numPlayers + "_button");
	removeButton.appendChild(document.createTextNode("Remove"));
	
	inGroup.appendChild(usernameLabel);
	inGroup.appendChild(username);
	inGroup.appendChild(removeSpan);
	removeSpan.appendChild(removeButton);
	
	var body = document.getElementById("players_body");
	var btn = document.getElementById("add_player_button");
	body.insertBefore(inGroup, btn);
	
	incrementValue("num_players");
	numPlayers++;	    
}

function removePlayer(num) {
    var inGroup = document.getElementById("player_input_group_" + num);
    inGroup.parentNode.removeChild(inGroup);
    for (x = num + 1; x < numGMs; x++) {
        var t = x-1;
        
        var inG = document.getElementById("player_input_group_" + x);
        inG.setAttribute("id", "player_input_group_" + t);
        
        var playerName = document.getElementById("player_username_" + x);
        playerName.setAttribute("id", "player_username_" + t);
        playerName.setAttribute("name", "player_username_" + t);
        
        var rmBtn = document.getElementById("remove_player_" + x + "_button");
        rmBtn.setAttribute("id", "remove_player_" + t + "_button");
        rmBtn.setAttribute("onClick", "removePlayer(" + t + ")");       
    }
    decrementValue("num_players");
    numPlayers--;
}

function replacePresetsLabel(newLabel) {
	var label = document.getElementById("presets_top_label");
	label.innerHTML = newLabel;
}

function skillArrangementChange(newArrangement) {
	var label = document.getElementById("arrangement_top_label");
	label.innerHTML = newArrangement;
	var field = document.getElementById("skill_arrangement");
	field.value=newArrangement;
}

function toggleRequiresApprovalText() {
	console.log("called requiresApproval");
	var txt = document.getElementById("requires_approval_current");
	if (requiresApproval == false) {
		txt.innerHTML = "Yes";
		requiresApproval = true;
	} else {
		txt.innerHTML = " No";
		requiresApproval = false;
	}
}

function fateCorePreset() {
	replacePresetsLabel("Fate Core");
	universalPresetCleanup(5, 18, 2, 1);
	// Aspects
	document.getElementById("aspect_type_0").value="High Concept";
	document.getElementById("aspect_type_1").value="Trouble";
	document.getElementById("aspect_type_2").value="Phase 1";
	document.getElementById("aspect_type_3").value="Phase 2";
	document.getElementById("aspect_type_4").value="Phase 3";
	// Skills
	document.getElementById("skill_name_0").value="Athletics";
	document.getElementById("skill_name_1").value="Burglary";
	document.getElementById("skill_name_2").value="Contacts";
	document.getElementById("skill_name_3").value="Crafts";
	document.getElementById("skill_name_4").value="Deceive";
	document.getElementById("skill_name_5").value="Drive";
	document.getElementById("skill_name_6").value="Empathy";
	document.getElementById("skill_name_7").value="Fight";
	document.getElementById("skill_name_8").value="Investigate";
	document.getElementById("skill_name_9").value="Lore";
	document.getElementById("skill_name_10").value="Notice";
	document.getElementById("skill_name_11").value="Physique";
	document.getElementById("skill_name_12").value="Provoke";
	document.getElementById("skill_name_13").value="Rapport";
	document.getElementById("skill_name_14").value="Resources";
	document.getElementById("skill_name_15").value="Shoot";
	document.getElementById("skill_name_16").value="Stealth";
	document.getElementById("skill_name_17").value="Will";
	skillArrangementChange("Pyramid");
	document.getElementById("num_skill_points").value=20;
	// Stress Tracks
	document.getElementById("stress_track_0_name").value="Physical";
	document.getElementById("stress_track_0_size").value=2;
	document.getElementById("stress_track_0_skill").value="Physique";
	document.getElementById("stress_track_1_name").value="Mental";
	document.getElementById("stress_track_1_size").value=2;
	document.getElementById("stress_track_1_skill").value="Will";
	// Consequences
	document.getElementById("consequence_type_0_name").value="Shared";
	document.getElementById("consequence_type_0_sizes").value="-2, -4, -6";
	// Stunts and Refresh
	document.getElementById("pc_refresh").value="6";
	document.getElementById("num_stunts").value="3";
	document.getElementById("num_max_stunts").value="5";
	
}

function fireflyPreset() {
	replacePresetsLabel("Firefly");
	universalPresetCleanup(5, 19, 2, 1);
	// Aspects
	document.getElementById("aspect_type_0").value="High Concept";
	document.getElementById("aspect_type_1").value="Trouble";
	document.getElementById("aspect_type_2").value="Role Amongst the Crew";
	document.getElementById("aspect_type_3").value="Call of the Black";
	document.getElementById("aspect_type_4").value="What Keeps You Grounded";
	// Skills
	document.getElementById("skill_name_0").value="Athletics";
	document.getElementById("skill_name_1").value="Brawl";
	document.getElementById("skill_name_2").value="Company";
	document.getElementById("skill_name_3").value="Culture";
	document.getElementById("skill_name_4").value="Doctor";
	document.getElementById("skill_name_5").value="Fence";
	document.getElementById("skill_name_6").value="Fly";
	document.getElementById("skill_name_7").value="Hustle";
	document.getElementById("skill_name_8").value="Inspect";
	document.getElementById("skill_name_9").value="Instinct";
	document.getElementById("skill_name_10").value="Mechanics";
	document.getElementById("skill_name_11").value="Rob";
	document.getElementById("skill_name_12").value="Physique";
	document.getElementById("skill_name_13").value="Preach";
	document.getElementById("skill_name_14").value="Provoke";
	document.getElementById("skill_name_15").value="Shoot";
	document.getElementById("skill_name_16").value="Stealth";
	document.getElementById("skill_name_17").value="Will";
	document.getElementById("skill_name_18").value="Read";
	
	skillArrangementChange("Pyramid");
	document.getElementById("num_skill_points").value=20;
	// Stress Tracks
	document.getElementById("stress_track_0_name").value="Physical";
	document.getElementById("stress_track_0_size").value=2;
	document.getElementById("stress_track_0_skill").value="Physique";
	document.getElementById("stress_track_1_name").value="Mental";
	document.getElementById("stress_track_1_size").value=2;
	document.getElementById("stress_track_1_skill").value="Will";
	// Consequences
	document.getElementById("consequence_type_0_name").value="Shared";
	document.getElementById("consequence_type_0_sizes").value="-2, -4, -6";
	// Stunts and Refresh
	document.getElementById("pc_refresh").value="6";
	document.getElementById("num_stunts").value="3";
	document.getElementById("num_max_stunts").value="5";
}

function kriegzeppelinPreset() {
	replacePresetsLabel("Kriegzeppelin Valkyrie")
	
	universalPresetCleanup(5, 13, 2, 1);
	// Aspects
	document.getElementById("aspect_type_0").value="High Concept";
	document.getElementById("aspect_type_1").value="Trouble";
	document.getElementById("aspect_type_2").value="Free";
	document.getElementById("aspect_type_3").value="Free";
	document.getElementById("aspect_type_4").value="During Play";
	// Skills
	document.getElementById("skill_name_0").value="Athletics";
	document.getElementById("skill_name_1").value="Deceive";
	document.getElementById("skill_name_2").value="Empathy";
	document.getElementById("skill_name_3").value="Fight";
	document.getElementById("skill_name_4").value="Machinery";
	document.getElementById("skill_name_5").value="Notice";
	document.getElementById("skill_name_6").value="Physique";
	document.getElementById("skill_name_7").value="Pilot";
	document.getElementById("skill_name_8").value="Rapport";
	document.getElementById("skill_name_9").value="Shoot";
	document.getElementById("skill_name_10").value="Swagger";
	document.getElementById("skill_name_11").value="Stealth";
	document.getElementById("skill_name_12").value="Will";
	
	skillArrangementChange("Pyramid");
	document.getElementById("num_skill_points").value=20;
	// Stress Tracks
	document.getElementById("stress_track_0_name").value="Physical";
	document.getElementById("stress_track_0_size").value=2;
	document.getElementById("stress_track_0_skill").value="Physique";
	document.getElementById("stress_track_1_name").value="Mental";
	document.getElementById("stress_track_1_size").value=2;
	document.getElementById("stress_track_1_skill").value="Will";
	// Consequences
	document.getElementById("consequence_type_0_name").value="Shared";
	document.getElementById("consequence_type_0_sizes").value="-2, -4, -6";
	// Stunts and Refresh
	document.getElementById("pc_refresh").value="6";
	document.getElementById("num_stunts").value="3";
	document.getElementById("num_max_stunts").value="5";
}

function universalPresetCleanup(presetNumAspects, presetNumSkills, presetNumTracks, presetNumConsequenceTypes) {
	// Handles number of aspects
	if (presetNumAspects > numAspects) {
		for (i = numAspects; i < presetNumAspects; i++) {
			addAspect();
		}
	} else {
		for (i = numAspects; i > presetNumAspects; i--) {
			removeAspect(i);
		}
	}
	// Handles number of skills
	if (presetNumSkills > numSkills) {
		for (i = numSkills; i < presetNumSkills; i++) {
			addSkill();
		}
	} else {
		for (i = numSkills; i > presetNumSkills; i--) {
			removeSkill(i-1);
		}
	}
	// Handles number of stress tracks
	if (presetNumTracks > numTracks) {
		for (i = numTracks; i < presetNumTracks; i++) {
			addTrack();
		}
	} else {
		for (i = numTracks; i > presetNumTracks; i--) {
			removeTrack(i-1);
		}
	}
	// Handles number of consequence types
	if (presetNumConsequenceTypes > numConsequenceTypes) {
		for (i = numConsequenceTypes; i < presetNumConsequenceTypes; i++) {
			addConsequenceType();
		}
	} else {
		for (i = numConsequenceTypes; i > presetNumConsequenceTypes; i--) {
			removeConsequenceType(i-1);
		}
	}
}

$(document).ready(function() {
	if ($("#permissions").val() == "Edit") {
		// Game name edit stuff
		$("#submit_gamename_change").click(function() {
			var url = "/edit/game/fate/" + $("#post-game-name").val() + "/name";
			$.post(
				url, 
				{new_val: $("#edit_game_name").val() },
				function(data, status, xhr) {
					window.location.replace("/view/games/fate/" + $("#edit_game_name").val())
					$("edit_game_name").prop("disabled", true);
					$("submit_gamename_change").hide();
				}
			);
					
		});
		$("#submit_gamename_change").hide();
		$("#show_gamename_field").click(function() {
			$("#edit_game_name").prop("disabled", false);
			$("#submit_gamename_change").show();
		});
		// Setting name change edit stuff
		$("#submit_settingname_change").click(function() {
			var url = "/edit/game/fate/" + $("#post-game-name").val() + "/setting_name";
			$.post(
				url, 
				{new_val: $("#edit_setting_name").val() },
				function(data, status, xhr) {
					$("#edit_setting_name").prop("disabled", true);
					$("#submit_settingname_change").hide();
				}
			);
					
		});
		$("#submit_settingname_change").hide();
		$("#show_settingname_field").click(function() {
			$("#edit_setting_name").prop("disabled", false);
			$("#submit_settingname_change").show();
		});
		// Aspect change edit stuff
		$('[id^="submit_aspect_"][id$="_change"]').each(function() {
			$(this).click(function() {
				$t = $((this).parents().get(2));
				var url = "/edit/game/fate/" + $("#post-game-name").val() + "/aspects";
				$.post(
					url,
					{new_val: getAspectsArray()},
					function(data, status, xhr) {
						$t.find('[id^="edit_aspect"]').prop("disabled", true);
						$t.find('[id^="submit_aspect"]').hide();
						$t.find('[id^="delete_aspect"]').hide();
					}
				);
			});
			$(this).hide();
		});
		
		$('[id^="delete_aspect_"][id$="_button"]').each(function() {
			$(this).click(function() {
				$t = $(this);
				var id = $t.attr("id").charAt($t.attr("id").search(/\d/));
				var url = "/edit/game/fate/" + $("#post-game-name").val() + "/aspects";
				console.log(getAspectsArray());
				var asp = getAspectsArray();
				asp.splice(id, 1);
				console.log(asp);
				$.post(
					url,
					{new_val: asp },
					function(data, status, xhr) {
						window.location.replace("/view/games/fate/" + $("#edit_game_name").val())
					}
				);
			});	
			$(this).hide();
		});
		
		$('[id^="show_aspect_"],[id$="_field"]').each(function() {
			$(this).click(function() {
				$td = $($(this).parents().get(1))
				
				$td.siblings().find('[id^="edit_aspect"]').prop("disabled", false);
				$td.siblings().find('[id^="submit_aspect"]').show();
				$td.siblings().find('[id^="delete_aspect"]').show();
			});
		});
		
	}
});

function getAspectsArray() {
	var arr = [];
	for (i = 0; i < $("#num_aspects").val(); i++) {
		arr.push($("#edit_aspect_" + i + "_name").val());
	}
	return arr;
}