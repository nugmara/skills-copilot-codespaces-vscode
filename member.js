function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var memberText = document.getElementById("memberText");
    var skillsText = document.getElementById("skillsText");
    var memberButton = document.getElementById("memberButton");
    var skillsButton = document.getElementById("skillsButton");
    member.style.display = "block";
    skills.style.display = "none";
    memberText.style.display = "block";
    skillsText.style.display = "none";
    memberButton.style.backgroundColor = "#f1f1f1";
    skillsButton.style.backgroundColor = "#ffffff";
}