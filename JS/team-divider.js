  // Domainiksi "tiimijakaja.fi, joukkuejako.fi"
  document.addEventListener("DOMContentLoaded", function () {

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

      if (localStorage.getItem('data') != null) {

          // Get given players
          const checkPlayerCount = JSON.parse(localStorage.getItem('data'));

          //Check if there is 3 or more players in (show 'make teams button')
          if (checkPlayerCount.length >= 3) {
              inputField.style.display = 'none';
              addPlayer.style.display = 'none';
              allPlayersInContainer.style.display = 'none';
              makeTeams.style.display = 'block';
              addMorePlayers.style.display = 'block';
              reset.style.display = 'block';
          }
      }

      // Automatically check in input field
      inputField.addEventListener("keyup", function () {

          const inputFieldValue = document.getElementById('EnterData').value;

          // Check if input field is empty and disable "add player" button if input field is empty
          if (inputFieldValue.length <= 0) {

              addPlayer.disabled = true;

          } else {

              addPlayer.disabled = false;

          }

      });

      // "Add new player" button functions
      addPlayer.addEventListener('click', function () {

          const new_player = document.getElementById('EnterData').value;

          if (localStorage.getItem('data') == null) {
              localStorage.setItem('data', '[]');
          }

          const added_player = JSON.parse(localStorage.getItem('data'));

          added_player.push(new_player);

          localStorage.setItem('data', JSON.stringify(added_player));

          inputField.value = '';

          addPlayer.disabled = true;

          // Get given players
          const checkPlayerCount = JSON.parse(localStorage.getItem('data'));

          //Check if there is 3 or more players in (show 'make teams button')
          if (checkPlayerCount.length >= 3) {
              allPlayersInContainer.style.display = 'block';
          }

          // Delete list of added players before creating new one
          if (enteredPlayers.childNodes.length > 0) {

              enteredPlayers.innerHTML = '';
          }

          // Create new list of added players
          for (const added_players of added_player) {
              const createItem = document.createElement('li');
              const insertPlayer = document.createTextNode(added_players);
              createItem.appendChild(insertPlayer);
              enteredPlayers.appendChild(createItem);
          }

      });

      const makeTeams2 = document.getElementsByClassName('make_teams');
      for (const makeTeam of makeTeams2) {

          // "Make teams" button functions
          makeTeam.addEventListener('click', function () {

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

          });

      }



      // "Step two" button functions
      stepTwo.addEventListener('click', function () {
          inputField.style.display = 'none';
          addPlayer.style.display = 'none';
          allPlayersInContainer.style.display = 'none';
          reset.style.display = 'block';
          makeTeams.style.display = 'block';
          addMorePlayers.style.display = 'block';
          enteredPlayers.style.display = 'none';
      });

      // "Reset" button functions
      reset.addEventListener('click', function () {
          localStorage.removeItem('data');
          inputField.style.display = 'block';
          addPlayer.style.display = 'block';
          reset.style.display = 'none';
          addMorePlayers.style.display = 'none';
          makeTeams.style.display = 'none';
          getTeamOneList.innerHTML = '';
          getTeamTwoList.innerHTML = '';
          enteredPlayers.innerHTML = '';
      });

      // "Add more players" button functions
      addMorePlayers.addEventListener('click', function () {
          inputField.style.display = 'block';
          addPlayer.style.display = 'block';
          makeTeams.style.display = 'none';
          addMorePlayers.style.display = 'none';
          reset.style.display = 'none';
          getTeamOneList.innerHTML = '';
          getTeamTwoList.innerHTML = '';
          enteredPlayers.style.display = 'block';
      });

  });