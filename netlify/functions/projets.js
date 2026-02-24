import { neon } from '@netlify/neon';
const sql = neon();

export default async function handler(req, res) {

  // LIRE tous les projets
  if (req.method === 'GET') {
    try {
      const data = await sql`
        SELECT * FROM projets 
        ORDER BY created_at DESC
      `;
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // AJOUTER un projet
  else if (req.method === 'POST') {
    try {
      const { nom, budget, avancement, commune, statut, description } = JSON.parse(req.body);
      const data = await sql`
        INSERT INTO projets (nom, budget, avancement, commune, statut, description)
        VALUES (${nom}, ${budget}, ${avancement}, ${commune}, ${statut}, ${description})
        RETURNING *
      `;
      res.json({ success: true, data: data[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // SUPPRIMER un projet
  else if (req.method === 'DELETE') {
    try {
      const { id } = JSON.parse(req.body);
      await sql`DELETE FROM projets WHERE id = ${id}`;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
```

---

Message de validation :
```
Fonction projets
