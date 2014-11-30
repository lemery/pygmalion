var numAspects = 1;
var numSkills = 1;
var numTracks = 1;

function addAspect() {    
    var inGroup = document.createElement("div");
    inGroup.setAttribute("class", "input-group");
    inGroup.setAttribute("id", "aspectInputGroup" + numAspects);
    
    var typeLabel = document.createElement("span");
    typeLabel.setAttribute("class", "input-group-addon");
    typeLabel.appendChild(document.createTextNode("Aspect Type"));
    
    var aspectType = document.createElement("input");
    aspectType.setAttribute("class", "form-control");
    aspectType.setAttribute("type", "text");
    aspectType.setAttribute("id", "aspectType" + numAspects);
    aspectType.setAttribute("name", "aspectType" + numAspects);
    
    var removeSpan = document.createElement("span");
    removeSpan.setAttribute("class", "input-group-btn");
    
    var removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-default");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("onClick", "removeAspect(" + numAspects + ")");
    removeButton.setAttribute("id", "removeAspectButton" + numAspects);
    removeButton.appendChild(document.createTextNode("Remove"));
    
    inGroup.appendChild(typeLabel);
    inGroup.appendChild(aspectType);
    inGroup.appendChild(removeSpan);
    removeSpan.appendChild(removeButton);
    
    var body = document.getElementById("aspects_body");
    var btn = document.getElementById("add_aspect_button");
    body.insertBefore(inGroup, btn);
    
    numAspects++;
}

function removeAspect(num) {
    var inGroup = document.getElementById("aspectInputGroup" + num);
    inGroup.parentNode.removeChild(inGroup);
    for (x = num + 1; x < numAspects; x++) {
        var t = x-1;
        
        var inG = document.getElementById("aspectInputGroup" + x);
        inG.setAttribute("id", "aspectInputGroup" + t);
        
        var aspType = document.getElementById("aspectType" + x);
        aspType.setAttribute("id", "aspectType" + t);
        aspType.setAttribute("name", "aspectType" + t);
        
        var rmBtn = document.getElementById("removeAspectButton" + x);
        rmBtn.setAttribute("id", "removeAspectButton" + t);
        rmBtn.setAttribute("onClick", "removeAspect(" + t + ")");        
    }
    numAspects--;
}

function addSkill() {    
    var inGroup = document.createElement("div");
    inGroup.setAttribute("class", "input-group");
    inGroup.setAttribute("id", "skillInputGroup" + numSkills);
    
    var skillLabel = document.createElement("span");
    skillLabel.setAttribute("class", "input-group-addon");
    skillLabel.appendChild(document.createTextNode("Skill"));
    
    var skillName = document.createElement("input");
    skillName.setAttribute("class", "form-control");
    skillName.setAttribute("type", "text");
    skillName.setAttribute("id", "skillName" + numSkills);
    skillName.setAttribute("name", "skillName" + numSkills);
    
    var removeSpan = document.createElement("span");
    removeSpan.setAttribute("class", "input-group-btn");
    
    var removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-default");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("onClick", "removeSkill(" + numSkills + ")");
    removeButton.setAttribute("id", "removeSkillButton" + numSkills);
    removeButton.appendChild(document.createTextNode("Remove"));
    
    inGroup.appendChild(skillLabel);
    inGroup.appendChild(skillName);
    inGroup.appendChild(removeSpan);
    removeSpan.appendChild(removeButton);
    
    var body = document.getElementById("skills_body");
    var btn = document.getElementById("add_skill_button");
    body.insertBefore(inGroup, btn);
    
    numSkills++;
}

function removeSkill(num) {
    var inGroup = document.getElementById("skillInputGroup" + num);
    inGroup.parentNode.removeChild(inGroup);
    for (x = num + 1; x < numSkills; x++) {
        var t = x-1;
        
        var inG = document.getElementById("skillInputGroup" + x);
        console.log("tried to set skillInputGroup" + x)
        inG.setAttribute("id", "skillInputGroup" + t);
        
        var skillName = document.getElementById("skillName" + x);
        skillName.setAttribute("id", "skillName" + t);
        skillName.setAttribute("name", "skillName" + t);
        
        var rmBtn = document.getElementById("removeSkillButton" + x);
        rmBtn.setAttribute("id", "removeSkillButton" + t);
        rmBtn.setAttribute("onClick", "removeSkill(" + t + ")");       
        console.log("Changed skill " + x + " to " + t);
    }
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
	nameField.setAttribute("name", "stressTrack" + numTracks + "name");
	nameField.setAttribute("id", "stressTrack" + numTracks + "name");
	
	var inGroupB = document.createElement("div");
	inGroupB.setAttribute("class", "input-group");
	
	var numLabel = document.createElement("span");
	numLabel.setAttribute("class", "input-group-addon");
	numLabel.appendChild(document.createTextNode("# of Boxes"));
	
	var numBoxes = document.createElement("span");
	numBoxes.setAttribute("class", "form-control");
	numBoxes.setAttribute("type", "text");
	numBoxes.setAttribute("name", "stressTrack" + numTracks + "size");
	numBoxes.setAttribute("id", "stressTrack" + numTracks + "size");
	
    var removeSpan = document.createElement("span");
    removeSpan.setAttribute("class", "input-group-btn");
	
    var removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-default");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("onClick", "removeTrack(" + numTracks + ")");
    removeButton.setAttribute("id", "removeTrackButton" + numTracks);
    removeButton.appendChild(document.createTextNode("Remove"));
    
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    row.setAttribute("id", "stress_track_row_" + numTracks);
    
    var col1 = document.createElement("div");
    col1.setAttribute("class", "col-lg-6");
    
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-lg-4");
    
    var col3 = document.createElement("div");
    col3.setAttribute("class", "col-lg-2");
	
    inGroupA.appendChild(nameLabel);
    inGroupA.appendChild(nameField);
    
    inGroupB.appendChild(numLabel);
    inGroupB.appendChild(numBoxes);
    
    removeSpan.appendChild(removeButton);
    
    col1.appendChild(inGroupA);
    col2.appendChild(inGroupB);
    col3.appendChild(removeSpan);
    
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
	
    var body = document.getElementById("stress_tracks_body");
    var btn = document.getElementById("add_track_button");
    body.insertBefore(row, btn);
    
    numTracks++;
}

function removeTrack(num) {
    var row = document.getElementById("stress_track_row_" + num);
    row.parentNode.removeChild(row);
    for (x = num + 1; x < numTracks; x++) {
        var t = x-1;
        
        var nRow = document.getElementById("stress_track_row_" + x);
        nRow.setAttribute("id", "stress_track_row_" + t);
        
        var nameField = document.getElementById("stressTrack" + x + "name");
        nameField.setAttribute("name", "stressTrack" + t + "name");
        nameField.setAttribute("id", "stressTrack" + t + "name");
        console.log("changed nameField ")
        
        var numBoxes = document.getElementById("stressTrack" + x + "size")
        numBoxes.setAttribute("name", "stressTrack" + t + "size");
        numBoxes.setAttribute("id", "stressTrack" + t + "size");
        
        var rmBtn = document.getElementById("removeTrackButton" + x);
        rmBtn.setAttribute("id", "removeTrackButton" + t);
        rmBtn.setAttribute("onClick", "removeTrack(" + t + ")");
        
    }
    numTracks--;
}