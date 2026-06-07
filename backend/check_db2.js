fetch('http://localhost:5000/api/case-studies').then(r => r.json()).then(res => {
  console.log(res.map(c => ({ id: c._id, title: c.title, slug: c.slug })));
});
