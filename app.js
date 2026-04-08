const SUPABASE_URL = "https://nhvivjuspmatgamjmhpe.supabase.co";
const SUPABASE_KEY = "sb_publishable_Je4_RH3xQxhtRYMkYA4SBg_3-O1C7F1";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// CREATE ROUND
async function createRound() {
  const code = Math.random().toString(36).substring(2, 7).toUpperCase();

  const { data, error } = await client
    .from("rounds")
    .insert([{ code }])
    .select()
    .single();

  if (error) {
    alert("Error creating round");
    console.error(error);
    return;
  }

  localStorage.setItem("roundId", data.id);
  showRound(code);
  alert("Round created! Code: " + code);
}

// JOIN ROUND
async function joinRound() {
  const codeInput = document.getElementById("joinCode");
  const code = codeInput.value.trim().toUpperCase();

  if (!code) {
    alert("Enter a round code");
    return;
  }

  const { data, error } = await client
    .from("rounds")
    .select("*")
    .eq("code", code)
    .single();

  if (error || !data) {
    alert("Invalid code");
    console.error(error);
    return;
  }

  localStorage.setItem("roundId", data.id);
  showRound(code);
  alert("Joined round!");
}

// SHOW ROUND SECTION
function showRound(code) {
  document.getElementById("roundSection").style.display = "block";
  document.getElementById("roundCode").innerText = code;
}

// ADD TEAM
async function addTeam(name) {
  const roundId = localStorage.getItem("roundId");

  if (!roundId) {
    alert("Create or join a round first");
    return;
  }

  const { data, error } = await client
    .from("teams")
    .insert([{ name, round_id: roundId }])
    .select()
    .single();

  if (error) {
    alert("Error creating team");
    console.error(error);
    return;
  }

  alert(name + " created. Team ID: " + data.id);
}

// BUTTON HELPER FOR TEAM CREATION
async function createTeam(name) {
  await addTeam(name);
}

// ADD PLAYER
async function addPlayer(teamId, name) {
  const { data, error } = await client
    .from("players")
    .insert([{ name, team_id: teamId }])
    .select()
    .single();

  if (error) {
    alert("Error adding player");
    console.error(error);
    return;
  }

  alert("Player added. Player ID: " + data.id);
}

// BUTTON HELPER FOR PLAYER CREATION
async function addPlayerToTeam() {
  const name = document.getElementById("playerName").value.trim();
  const teamId = document.getElementById("teamId").value.trim();

  if (!name || !teamId) {
    alert("Enter player name and team ID");
    return;
  }

  await addPlayer(teamId, name);
}

// SAVE SCORE
async function saveScore(playerId, hole, strokes) {
  const { error } = await client
    .from("scores")
    .insert([{ player_id: playerId, hole, strokes }]);

  if (error) {
    alert("Error saving score");
    console.error(error);
    return;
  }

  alert("Score saved");
}

// BUTTON HELPER FOR SAVING SCORE
async function submitScore() {
  const playerId = document.getElementById("playerId").value.trim();
  const hole = parseInt(document.getElementById("hole").value, 10);
  const strokes = parseInt(document.getElementById("strokes").value, 10);

  if (!playerId || !hole || !strokes) {
    alert("Enter player ID, hole, and strokes");
    return;
  }

  await saveScore(playerId, hole, strokes);
}
