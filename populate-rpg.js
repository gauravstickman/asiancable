fetch('http://localhost:5000/api/rpg-group-page')
  .then(res => res.json())
  .then(json => {
      const data = json.data;
      data.heroImage = '/assets/rpggroup/rpgheaderIcon.png';
      data.heroMobileImage = '/assets/rpggroup/rpgheaderIcon.png';
      
      return fetch('http://localhost:5000/api/rpg-group-page', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });
  })
  .then(res => res.json())
  .then(json => console.log('Successfully updated RPG Group DB:', json))
  .catch(err => console.error(err));
