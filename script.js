let countdown;
let secondsRemaining;
let initialDuration;
let isPaused = false;
let durations = {
    'pomodoro': 25,
    'short-break': 5,
    'long-break': 15
};

function startTimer(type) {
    initialDuration = durations[type] * 60; // Store the initial duration
    secondsRemaining = initialDuration;
    updateTimerDisplay();
    document.querySelector('.controls button.active').classList.remove('active');
    document.querySelector(`.controls button[data-type="${type}"]`).classList.add('active');
}

function toggleTimer() {
    if (!countdown || isPaused) {
        startCountdown();
    } else {
        pauseTimer();
    }
}

function startCountdown() {
    countdown = setInterval(updateCountdown, 1000);
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    isPaused = false;
}

function pauseTimer() {
    clearInterval(countdown);
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    isPaused = true;
}

function resetTimer() {
    clearInterval(countdown);
    isPaused = false;
    secondsRemaining = initialDuration;
    updateTimerDisplay();
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

function updateCountdown() {
    if (secondsRemaining <= 0) {
        clearInterval(countdown);
        return;
    }
    secondsRemaining--;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    document.getElementById('timer').textContent = `${displayMinutes}:${displaySeconds}`;
}

// Your existing functions...



function saveSettings() {
const pomodoroDuration = parseInt(document.getElementById("pomodoroDuration").value);
const shortBreakDuration = parseInt(document.getElementById("shortBreakDuration").value);
const longBreakDuration = parseInt(document.getElementById("longBreakDuration").value);

durations['pomodoro'] = pomodoroDuration;
durations['short-break'] = shortBreakDuration;
durations['long-break'] = longBreakDuration;

alert("Settings saved successfully!");
document.getElementById("pomodoro").scrollIntoView({ behavior: 'smooth' });

startTimer('pomodoro');
}

function searchVideos() {
const apiKey = "AIzaSyCJs6t6b6AFUX4FFumihGgoVegKNk4K5TM"; 
const searchQuery = document.getElementById("searchQuery").value;

fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchQuery}&type=video&part=snippet&maxResults=5`)
.then(response => response.json())
.then(data => {
displayVideos(data.items);
})
.catch(error => {
console.error("Error fetching data:", error);
});
}


 function displayVideos(videos) {
     const videoContainer = document.getElementById("videos");
     videoContainer.innerHTML = "";

     videos.forEach(video => {
         const videoId = video.id.videoId;
         const videoTitle = video.snippet.title;

         const iframe = document.createElement("iframe");
         iframe.width = "560";
         iframe.height = "315";
         iframe.src = 'https://www.youtube.com/embed/' + videoId;
         iframe.title = videoTitle;
         iframe.allowFullscreen = true;

         const title = document.createElement("h3");
         title.textContent = videoTitle;

         const videoDiv = document.createElement("div");
         videoDiv.appendChild(title);
         videoDiv.appendChild(iframe);

         videoContainer.appendChild(videoDiv);
     });
 }

 
 var totalTasks = 1;
 var completedTasks = 0;
 var progressBar = document.getElementById("progress");
 var todoList = document.querySelector(".todo-list");
 var addTaskButton = document.querySelector(".add-task-button");

 // Event listener for "Add Task" button
 addTaskButton.addEventListener("click", addTask);

 // Event delegation
 todoList.addEventListener("click", function(event) {
     var target = event.target;

     if (target.classList.contains("completed-button")) {
         markComplete(target.parentNode);
     } else if (target.classList.contains("delete-button")) {
         deleteTask(target.parentNode);
     }
 });

 function addTask() {
     totalTasks++;
     var newTask = document.createElement("div");
     newTask.classList.add("task");
     newTask.innerHTML = `
         <input type="text" value="Task ${totalTasks}">
         <button class="completed-button">Complete</button>
         <button class="delete-button">Delete</button>
     `;
     document.querySelector(".todo-list").insertBefore(newTask, addTaskButton);
     updateProgress();
 }

 function markComplete(task) {
     var taskInput = task.querySelector("input[type='text']");
     if (taskInput.value.trim() === "") {
         alert("Please enter a task name.");
         return;
     }
     var completedButton = task.querySelector(".completed-button");
     if (!completedButton.classList.contains("completed")) {
         completedButton.textContent = "Completed";
         completedButton.classList.add("completed");
         completedTasks++;
         updateProgress();
     }
 }

 function deleteTask(task) {
     task.remove();
     totalTasks--;
     var completedButton = task.querySelector(".completed-button");
     if (completedButton.classList.contains("completed")) {
         completedTasks--;
     }
     updateProgress();
 }

 function updateProgress() {
     var progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
     progressBar.style.width = progressPercentage + "%";
 }