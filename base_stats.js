function generateBaseStatsContent(pokemonId) {
   setTimeout(() => {
      initializeChart(pokemonId);
   }, 10);
   return '<div class="chart_div"><canvas id="myChart"></canvas></div>';
}

function initializeChart(pokemonId) {
   const pokemon = pokemons.find((p) => p.details.id.toString() === pokemonId);
   if (!pokemon) {
      console.error('Pokemon not found!');
      return;
   }

   const ctx = document.getElementById('myChart').getContext('2d');
   if (!ctx) {
      console.error('Unable to get canvas context!');
      return;
   }

   const labels = pokemon.details.stats.map((stat) => stat.stat.name.toUpperCase());
   const data = pokemon.details.stats.map((stat) => stat.base_stat);

   new Chart(ctx, {
      type: 'bar',
      data: {
         labels: labels,
         datasets: [
            {
               data: data,
               backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
               ],
               borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
               ],
               borderWidth: 1,
            },
         ],
      },
      options: {
        responsive:true,
        borderRadius: 10,
         indexAxis: 'y',
         plugins: {
            legend: {
               display: false, // Legende wird nicht angezeigt
            },
         },
         scales: {
            x: {
               beginAtZero: true,
            },
            y: {
               indexAxis: 'y',
            },
         },
      },
   });
}
