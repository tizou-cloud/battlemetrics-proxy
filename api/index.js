export default async function handler(req, res) {
  const { search, steam, id } = req.query;

  if (!search && !id) {
    return res.status(400).json({ error: "Paramètre ?search= ou ?id= requis" });
  }

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU1YTA0MjIzM2U4ZTI4YTgiLCJpYXQiOjE3NDQwNDYzNjAsIm5iZiI6MTc0NDA0NjM2MCwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjoxMDE1NDk1In0.UZHq5KbHgXycv2nN2ogSvuUXTwHEU0lBVVNrUlCmkVU";

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  try {
    let url = "https://api.battlemetrics.com/players";

    if (id) {
      url += `/${id}`;
    } else if (steam) {
      url += `?filter[steamID]=${search}`;
    } else {
      url += `?filter[search]=${search}`;
    }

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ error: "Erreur BattleMetrics", details: data });
    }
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
}
