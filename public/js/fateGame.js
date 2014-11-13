var numAspects = 1;
var numSkills = 1;

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
        
        numAspects--;
    }
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
    for (x = num + 1; x <= numSkills; x++) {
        var t = x-1;
        
        var inG = document.getElementById("skillInputGroup" + x);
        inG.setAttribute("id", "skillInputGroup" + t);
        
        var skillName = document.getElementById("skillName" + x);
        skilName.setAttribute("id", "skillName" + t);
        skillName.setAttribute("name", "skillName" + t);
        
        var rmBtn = document.getElementById("removeSkillButton" + x);
        rmBtn.setAttribute("id", "removeSkillButton" + t);
        rmBtn.setAttribute("onClick", "removeSkill(" + t + ")");
        
        numSkills--;
    }
}