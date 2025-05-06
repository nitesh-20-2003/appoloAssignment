#  Assignment: Destination Page Clone

Thank you for your interest in our internship opening. As a next step, we are expecting you to complete a short assignment.

**Task**  
You have to clone the destination page only, using Next.js (with Off-page SEO implemented) for:

- **Doctor's listing**  
- **Filters**  
- **Header**

Use an SQL or NoSQL database of your choice, and serve data via a backend you build with REST APIs.

- **APIs required**  
  1. `add-doctor`  
  2. `list-doctor-with-filter` (with pagination)

- **UI**  
  - Only the destination page (as per: https://www.apollo247.com/specialties/general-physician-internal-medicine)  
  - Filters must be functional; other components may be static (no click logic).

---

## TECH STACK

### Frontend
- Next.js (App Router)
- React (with Client Components where needed)
- Tailwind CSS
- ShadCN UI (optional)
- Off-page SEO meta tags (robots.txt, sitemap, structured data)

### Backend
- Node.js & Express (or any framework of your choice)
- REST API routes under `app/api/`
  - `addDoctors/route.js`
  - `getDoctors/route.js`
- CORS, body-parser, etc.

### Database
- MongoDB (Mongoose) **or** PostgreSQL/MySQL (Prisma)

---

## Project Structure
<pre>
my-nextjs-app/
│
├── app/ (Next.js App Router)
│ │
│ ├── api/ (Backend Routes)
│ │ ├── addDoctors/
│ │ │ └── route.js
│ │ │
│ │ └── getDoctors/
│ │ └── route.js
│ │
│ ├── globals.css
│ ├── page.jsx # Destination page
│ └── layout.jsx # Shared layout (Header only)
│
├── components/ (UI Components)
│ │
│ ├── Header.jsx
│ ├── Filters.jsx
│ ├── DoctorCard.jsx
│ └── Pagination.jsx
│
├── lib/ (utils & database clients)
│ ├── db.js
│ └── prisma.js # or mongoose.js
│
├── public/
│ └── robots.txt
│
├── next.config.js
├── package.json
└── README.md
</pre>
