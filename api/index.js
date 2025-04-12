export default async function handler(req, res) {
  const search = req.query.search || "";
  const url = `https://api.battlemetrics.com/players?filter[search]=${search}&page[size]=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer export default async function handler(req, res) {
  const search = req.query.search || "";
  const url = `https://api.battlemetrics.com/players?filter[search]=${search}&page[size]=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU1YTA0MjIzM2U4ZTI4YTgiLCJpYXQiOjE3NDQwNDYzNjAsIm5iZiI6MTc0NDA0NjM2MCwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjoxMDE1NDk1In0.UZHq5KbHgXycv2nN2ogSvuUXTwHEU0lBVVNrUlCmkVU"
      }
    });

    const json = await response.json();

    // Exemple : tu filtres côté code si besoin
    const results = json.data.filter(player =>
      player.attributes?.game === "rust"
    );

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
}
"
      }
    });

    const json = await response.json();

    // Exemple : tu filtres côté code si besoin
    const results = json.data.filter(player =>
      player.attributes?.game === "rust"
    );

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
}
