
        // Sélectionnez le bouton par son ID
const loginButton = document.getElementById('login-button');

// Ajoutez un écouteur d'événement de clic au bouton
loginButton.addEventListener('click', () => {
    // Code à exécuter lorsque le bouton est cliqué
   

    // Par exemple, vous pourriez rediriger l'utilisateur vers une page de connexion
    window.location.href = "../frontend/sign_in_up.html";
});
    
  
    async function performSearch(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
    
    const searchQuery = document.getElementById('search-input').value;
    
    // Effectuer la recherche dans votre base de données (vous devez implémenter cette partie)
    try {
        const response = await fetch(`/search?query=${searchQuery}`); // Exemple d'URL d'API de recherche
        const results = await response.json();
        
        // Traitez les résultats de la recherche (affichage des résultats, par exemple)
        console.log('Résultats de la recherche:', results);
        // Ajoutez votre logique pour afficher les résultats sur la page
        
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
    }
}

   
    // Fonction pour afficher ou masquer la barre de recherche
function toggleSearchBar() {
    const searchBar = document.getElementById('search-bar');
    
    if (searchBar.style.display === 'none') {
        searchBar.style.display = 'block'; // Affiche la barre de recherche
    } else {
        searchBar.style.display = 'none'; // Masque la barre de recherche
    }
}

  