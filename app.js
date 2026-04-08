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
    return;
  }

  localStorage.setItem("roundId", data.id);
  alert("Round created! Code: " + code);
}

// JOIN ROUND
async function joinRound() {
  const code = document.getElementById("joinCode").value.toUpperCase();

  const { data, error } = await client
    .from("rounds")
    .select("*")
    .eq("code", code)
    .single();

  if (error || !data) {
    alert("Invalid code");
    return;
  }

  localStorage.setItem("roundId", data.id);
  alert("Joined round!");
}

// ADD TEAM
async function addTeam(name) {
  const roundId = localStorage.getItem("roundId");

  await client.from("teams").insert([{ name, round_id: roundId }]);
}

// ADD PLAYER
async function addPlayer(teamId, name) {
  await client.from("players").insert([{ name, team_id: teamId }]);
}

// SAVE SCORE
async function saveScore(playerId, hole, strokes) {
  await client.from("scores").insert([
    { player_id: playerId, hole, strokes }
  ]);
}
