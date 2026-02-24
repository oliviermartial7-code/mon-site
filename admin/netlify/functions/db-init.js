import { neon } from '@netlify/neon';

const sql = neon();

export default async function handler(req, res) {
  try {
    // Créer les tables si elles n'existent pas encore
    await sql`
      CREATE TABLE IF NOT EXISTS actualites (
        id SERIAL PRIMARY KEY,
        titre TEXT NOT NULL,
        categorie TEXT,
        date_pub TEXT,
        statut TEXT DEFAULT 'Publié',
        resume TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS publications (
        id SERIAL PRIMARY KEY,
        titre TEXT NOT NULL,
        type_pub TEXT,
        date_pub TEXT,
        fichier TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS projets (
        id SERIAL PRIMARY KEY,
        nom TEXT NOT NULL,
        budget TEXT,
        avancement INTEGER DEFAULT 0,
        commune TEXT,
        statut TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        nom TEXT NOT NULL,
        categorie TEXT,
        date_doc TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    res.json({ 
      success: true, 
      message: 'Base de données initialisée avec succès !' 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
```

---

Une fois collé, descendez en bas, dans la case **"Message de validation"** tapez :
```
Création des tables base de données
