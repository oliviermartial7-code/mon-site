import { neon } from '@netlify/neon';
const sql = neon();

export default async function handler(req, res) {
  
  // LIRE toutes les actualités
  if (req.method === 'GET') {
    try {
      const data = await sql`
        SELECT * FROM actualites 
        ORDER BY created_at DESC
      `;
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // AJOUTER une actualité
  else if (req.method === 'POST') {
    try {
      const { titre, categorie, date_pub, statut, resume } = JSON.parse(req.body);
      const data = await sql`
        INSERT INTO actualites (titre, categorie, date_pub, statut, resume)
        VALUES (${titre}, ${categorie}, ${date_pub}, ${statut}, ${resume})
        RETURNING *
      `;
      res.json({ success: true, data: data[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // SUPPRIMER une actualité
  else if (req.method === 'DELETE') {
    try {
      const { id } = JSON.parse(req.body);
      await sql`DELETE FROM actualites WHERE id = ${id}`;
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
Fonction actualités
