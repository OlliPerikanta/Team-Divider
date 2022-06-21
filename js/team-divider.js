  // Domainiksi "tiimijakaja.fi, joukkuejako.fi"
  document.addEventListener("DOMContentLoaded", function () {

      /* ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

      Define DOM id's and classes

      ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡ */

      // Add player button
      const addPlayer = document.getElementById('addPlayer');

      // Are all players in button
      const stepTwo = document.getElementById('goToStep2');

      // Are all players in container
      const allPlayersInContainer = document.getElementById('allPlayersInContainer');

      // Make teams button
      const makeTeams = document.getElementById('makeTeams');

      //Reset button
      const reset = document.getElementById('resetEverything');

      // Add more players button
      const addMorePlayers = document.getElementById('addMorePlayers');

      // Input id
      const inputField = document.getElementById('EnterData');

      // Create team 2
      const getTeamTwoList = document.getElementById('team2');

      // Create team 1
      const getTeamOneList = document.getElementById('team1');

      // Entered Players
      const enteredPlayers = document.getElementById('enteredPlayers');

      // Entered Players
      const sharedTeams = document.getElementById('sharedTeams');

      //Teams Container
      const teamsContainer = document.getElementById('teamsContainer');

      // Loading animation
      const loadingAnimation = document.getElementById('loadingAnimation');

      /* ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

      Custom functions

      ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡ */

      function playerData() {

          // Get given players
          const getPlayersList = JSON.parse(localStorage.getItem('data'));

          // Delete list of added players before creating new one
          if (enteredPlayers.childNodes.length > 0) {

              enteredPlayers.innerHTML = '';
          }

          // Create new list of added players
          for (const getPlayersLists of getPlayersList) {
              const createItem = document.createElement('li');
              const insertPlayer = document.createTextNode(getPlayersLists);
              createItem.appendChild(insertPlayer);
              enteredPlayers.appendChild(createItem);
          }

      }

      // Team shuffle function
      function teamShuffle() {

          if (localStorage.getItem('data') != null) {

              // Get given players
              const array = JSON.parse(localStorage.getItem('data'));

              // Shuffle players
              function shuffleArray(array) {
                  for (let i = array.length - 1; i > 0; i--) {
                      const j = Math.floor(Math.random() * (i + 1));
                      const temp = array[i];
                      array[i] = array[j];
                      array[j] = temp;
                  }
                  return array;
              };

              // Shuffled players
              const shuffledArray = shuffleArray(array);

              // Cut shuffled players in to two different teams
              const fullListPlayers = shuffledArray;
              const half = Math.ceil(fullListPlayers.length / 2);

              const firstHalf = fullListPlayers.slice(0, half);
              const secondHalf = fullListPlayers.slice(half);

              // Delete old team 1 before creating new team
              if (getTeamOneList.childNodes.length > 0) {
                  getTeamOneList.innerHTML = '';
              }

              for (const teamOne of firstHalf) {
                  const createItem = document.createElement('li');
                  const insertPlayer = document.createTextNode(teamOne);

                  createItem.appendChild(insertPlayer);

                  getTeamOneList.appendChild(createItem);
              }

              // Delete old team 2 before creating new team
              if (getTeamTwoList.childNodes.length > 0) {

                  getTeamTwoList.innerHTML = '';
              }

              for (const teamTwo of secondHalf) {
                  const createItem = document.createElement('li');
                  const insertPlayer = document.createTextNode(teamTwo);
                  createItem.appendChild(insertPlayer);
                  getTeamTwoList.appendChild(createItem);
              }

          }
      }

      // CreateTeam function
      function createTeam() {
          makeTeams.disabled = true;
          makeTeams.classList.add('disabled-button');
          reset.disabled = true;
          addMorePlayers.disabled = true;
          addMorePlayers.classList.add('disabled-button');
          sharedTeams.style.display = 'none';
          loadingAnimation.style.display = 'block';
          setTimeout(() => {
              // Call teamShuffle function
              teamShuffle();
              sharedTeams.style.display = 'block';
              loadingAnimation.style.display = 'none';
              makeTeams.disabled = false;
              makeTeams.classList.remove('disabled-button');
              reset.disabled = false;
              addMorePlayers.disabled = false;
              addMorePlayers.classList.remove('disabled-button');
          }, "1400")
      }

      /* ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

      Page reloaded (refreshed) setup

      ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡ */

      loadingAnimation.style.display = 'none';

      // Disable "add player" button for start and wait user write something
      addPlayer.disabled = true;

      // Hide "Make teams" button
      makeTeams.style.display = 'none';

      // Hide "reset" button
      reset.style.display = 'none';

      // Hide "All players in container"
      allPlayersInContainer.style.display = 'none';

      // Hide "Add more players" button
      addMorePlayers.style.display = 'none';

      // Hide "Shared teams container" button
      sharedTeams.style.display = 'none';

      // Hide teams container
      teamsContainer.style.display = 'none';

      if (addPlayer.disabled == true) {
          addPlayer.classList.add('disabled-button');
      }

      if (localStorage.getItem('data') != null) {

          // Call teamShuffle function
          teamShuffle();

          playerData();

          // Get given players
          const checkPlayerCount = JSON.parse(localStorage.getItem('data'));

          //We have entered data, so we need to show right view
          if (checkPlayerCount.length >= 3) {
              inputField.style.display = 'none';
              addPlayer.style.display = 'none';
              allPlayersInContainer.style.display = 'none';
              makeTeams.style.display = 'block';
              addMorePlayers.style.display = 'block';
              reset.style.display = 'block';
              sharedTeams.style.display = 'block';
              teamsContainer.style.display = 'flex';
              enteredPlayers.style.display = 'none';
          }
      }



      /* ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

      User changes

      ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡ */



      // Automatically check in input field
      inputField.addEventListener("keyup", function () {

          const inputFieldValue = document.getElementById('EnterData').value;

          // Check if input field is empty and disable "add player" button if input field is empty
          if (inputFieldValue.length <= 0) {

              addPlayer.disabled = true;

          } else {

              addPlayer.disabled = false;
              addPlayer.classList.remove('disabled-button');

          }

      });

      // "Add new player" button functions
      addPlayer.addEventListener('click', function () {

          const new_player = document.getElementById('EnterData').value;

          if (localStorage.getItem('data') == null) {
              localStorage.setItem('data', '[]');
          }

          // Get given players
          const getPlayersList = JSON.parse(localStorage.getItem('data'));

          getPlayersList.push(new_player);

          localStorage.setItem('data', JSON.stringify(getPlayersList));

          inputField.value = '';

          addPlayer.disabled = true;
          addPlayer.classList.add('disabled-button');

          //Check if there is 3 or more players in (show 'make teams button')
          if (getPlayersList.length >= 3) {
              allPlayersInContainer.style.display = 'block';
          }

          playerData();

      });

      // "Create teams again" button functions
      makeTeams.addEventListener('click', function () {
          createTeam();
      });

      // "Step two" button functions
      stepTwo.addEventListener('click', function () {
          inputField.style.display = 'none';
          addPlayer.style.display = 'none';
          allPlayersInContainer.style.display = 'none';
          reset.style.display = 'block';
          makeTeams.style.display = 'block';
          addMorePlayers.style.display = 'block';
          enteredPlayers.style.display = 'none';
          teamsContainer.style.display = 'flex';
          createTeam();
          /* sharedTeams.style.display = 'grid'; */
      });

      // "Reset" button functions
      reset.addEventListener('click', function () {
          localStorage.removeItem('data');
          inputField.style.display = 'block';
          addPlayer.style.display = 'block';
          reset.style.display = 'none';
          addMorePlayers.style.display = 'none';
          makeTeams.style.display = 'none';
          sharedTeams.style.display = 'none';
          getTeamOneList.innerHTML = '';
          getTeamTwoList.innerHTML = '';
          enteredPlayers.innerHTML = '';
          enteredPlayers.style.display = 'block';
          teamsContainer.style.display = 'none';
      });

      // "Add more players" button functions
      addMorePlayers.addEventListener('click', function () {
          inputField.style.display = 'block';
          addPlayer.style.display = 'block';
          makeTeams.style.display = 'none';
          addMorePlayers.style.display = 'none';
          sharedTeams.style.display = 'none';
          reset.style.display = 'none';
          getTeamOneList.innerHTML = '';
          getTeamTwoList.innerHTML = '';
          enteredPlayers.style.display = 'block';
          teamsContainer.style.display = 'none';
      });

  });