
const $footballPlayerForm = document.getElementById("footballPlayerForm");
const $playerList = document.querySelector("#playerList");
const $inputs = $footballPlayerForm.querySelectorAll(".formInput");
const $countryFilter = document.getElementById("countryFilter");
const $clubFilter = document.getElementById("clubFilter");
const $ageFilter = document.getElementById("ageFilter");
const $positionFilter = document.getElementById("positionFilter");

const ALL_PLAYERS = JSON.parse(localStorage.getItem("Players")) || [];

function Player(country, club, name, age, position) {
    this.country = country;
    this.club = club;
    this.name = name;
    this.age = age;
    this.position = position;
}

const renderPlayers = (players) => {
    while ($playerList.firstChild) {
        $playerList.removeChild($playerList.firstChild);
    }

    if (players.length === 0) {
        $playerList.innerHTML = "No Players found";
    } else {
        players.forEach(player => {
            const $playerItemDiv = document.createElement("div");
            $playerItemDiv.className = "flex gap-[10px] items-center";
            $playerItemDiv.innerHTML = `
                <div class="border-b-[3px] w-full text-white">
                    <p><strong>Country:</strong> ${player.country}</p>
                    <p><strong>Club:</strong> ${player.club}</p>
                    <p><strong>Player Name:</strong> ${player.name}</p>
                    <p><strong>Age:</strong> ${player.age}</p>
                    <p><strong>Position:</strong> ${player.position}</p>
                </div>
            `;
            $playerList.appendChild($playerItemDiv);
        });
    }
}

renderPlayers(ALL_PLAYERS);

const addPlayer = (e) => {
    e.preventDefault();

    const values = Array.from($inputs).map(input => input.value.trim());

    if (values.every(value => value)) {
        const player = new Player(...values);
        ALL_PLAYERS.push(player);
        localStorage.setItem("Players", JSON.stringify(ALL_PLAYERS));
        renderPlayers(ALL_PLAYERS);
        $inputs.forEach(input => input.value = "");
    } else {
        alert("Please fill in all the fields.");
    }
}

const filterPlayers = (criteria) => {
    let filteredPlayers;
    switch (criteria) {
        case 'country':
            const country = prompt("Enter country to filter by:");
            filteredPlayers = ALL_PLAYERS.filter(player => player.country.toLowerCase() === country.toLowerCase());
            break;
        case 'club':
            const club = prompt("Enter club to filter by:");
            filteredPlayers = ALL_PLAYERS.filter(player => player.club.toLowerCase() === club.toLowerCase());
            break;
        case 'age':
            const age = prompt("Enter age to filter by:");
            filteredPlayers = ALL_PLAYERS.filter(player => player.age === age);
            break;
        case 'position':
            const position = prompt("Enter position to filter by:");
            filteredPlayers = ALL_PLAYERS.filter(player => player.position.toLowerCase() === position.toLowerCase());
            break;
        default:
            filteredPlayers = ALL_PLAYERS;
    }
    renderPlayers(filteredPlayers);
}

$footballPlayerForm.addEventListener("submit", addPlayer);
$countryFilter.addEventListener("click", () => filterPlayers('country'));
$clubFilter.addEventListener("click", () => filterPlayers('club'));
$ageFilter.addEventListener("click", () => filterPlayers('age'));
$positionFilter.addEventListener("click", () => filterPlayers('position'));

const $playButton = document.getElementById("playButton");
const $stopButton = document.getElementById("stopButton");
const $championsLeagueAudio = document.getElementById("championsLeagueAudio");

$playButton.addEventListener("click", () => {
    $championsLeagueAudio.play();
});

$stopButton.addEventListener("click", () => {
    $championsLeagueAudio.pause();
    $championsLeagueAudio.currentTime = 0;
});

new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});