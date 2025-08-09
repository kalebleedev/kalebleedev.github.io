
fetch('https://portfolio-proxy-blush.vercel.app/api/repos?user=kalebleedev')
    .then(r => r.json())
    .then(repos => {
      const list = document.getElementById('projects-list');
      repos.forEach(repo => {
        const div = document.createElement('div');
        div.className = 'projects-text';
        div.innerHTML = `
          <p><strong>${repo.name}</strong></p>
          <p>${repo.description ?? ''}</p>
          <p><a href="${repo.url}" target="_blank">View on GitHub</a></p>
          <hr style="border-color: gray; width: 80%;">
        `;
        list.appendChild(div);
      });
    })
    .catch(console.error);