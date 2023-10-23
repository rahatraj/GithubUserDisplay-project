// Variables

const searchbar = document.querySelector(".search-bar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const input = get("user-input");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const data = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;


// Event Listner

btnsubmit.addEventListener("click", function() {
    if(input.value !== ""){
        getUserdata(url + input.value);
    }
});

input.addEventListener("keydown", function(e) {
    if(e.key === "Enter"){
        if(input.value !== ""){
            getUserdata(url + input.value);
        }
    }
},
 false
);


//  event listner for dark and light mode
input.addEventListener("input", function() {
    noresults.style.display = "none";
});

btnmode.addEventListener("click", function() {
    if(darkMode === false){
        darkModeProperties();
    }else{
        lightModeProperties();
    }
});


//  api call
async function getUserdata(gitUrl){
    try {
        const response = await fetch(gitUrl);
        const data = await response.json();
        console.log(data);
        updateProfile(data);
    } catch (error) {
        console.log("error",error);
    }
}

//  Render the data to the UI 

function updateProfile(data){
    if(data.message !== "Not Found"){
        noresults.style.display = "none";
        function checkNull(param1, param2){
            if(param1 === "" || param1 === null){
                param2.style.opacity = 0.9;
                param2.previousElementSibling.style = 0.9;
                return false;
            }else{
                return true;
            }
        }
        // set the data to the variable

        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;
        datasegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joinded ${datasegments[2]} ${months[datasegments[1] -1]} ${datasegments[0]}`;
        bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");

    }else{
        noresults.style.display = "block";
    }
}

//  Switch to dark mode --- darkModeProperties();

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("lm-shadow-xl", "rgba(70, 88, 109, 0.15");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}

//  Switch to light mode -- lightModeProperties();

function lightModeProperties(){
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  console.log("darkmode changed to " + darkMode);

  localStorage.setItem("dark-mode", false);
}


//   initialize the ui 

function init(){
    darkMode = false;
    const value = localStorage.getItem("dark-mode");
    if(value === null){
        lightModeProperties();
    }else if(value === "true"){
        darkModeProperties();
    }else if(value === "false"){
        lightModeProperties();
    }
    getUserdata(url + "rahatraj");
}
init();