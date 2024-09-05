# Wait, read

<p align="center">
  <img width="300" src="https://github.com/user-attachments/assets/e617aebe-6100-4c10-9841-2b383bdab801" alt="" />
</p>
<p align="center">Personal reading list.</p>

- ⚒️ All content files are located in [Supabase](https://supabase.com);
- 👨‍🚀 Built on top of [Astro](https://astro.build);
- ✨ Uses [Tailwind CSS](https://tailwindcss.com);

# Database

```sql
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  topic TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  favorite BOOLEAN NOT NULL,
  tags TEXT[] NOT NULL,
  status TEXT NOT NULL,
);
```

> [INFO] Yep, only one table.

# License

[MIT](https://choosealicense.com/licenses/mit/)

---

⭐️ Built on top of [Astro](https://astro.build), [Vercel](https://vercel.com) and [Supabase](https://supabase.com).
