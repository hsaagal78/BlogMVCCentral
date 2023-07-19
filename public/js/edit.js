const updateButtons = document.querySelectorAll('.updateButtom');
console.log('button update:', updateButtons);
updateButtons.forEach(updateButton => {
   
  updateButton.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (event.target.classList.contains('updateButtom')) {
      const thoughtId = event.target.getAttribute('data-updateThough-id');
      // const newThought = event.target.getAttribute('updateThought');
      console.log('Recipe ID to update:', thoughtId);

      const data = {
        // Proporciona los datos que quieres actualizar, por ejemplo: newThought: newThought
      };

      const response = await fetch(`/edit/${thoughtId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      try {
        const responseData = await response.json();
        console.log('Note updated successfully:', responseData.message);
        document.location.replace('/dashboard');
      } catch (err) {
        console.error('Error updating note:', err);
      }
    } else {
      console.error('Error: New thought is empty');
    }
  });
});


// Use the correct class selector for the delete buttons
const deleteButtons = document.querySelectorAll('.remove-button');
console.log('button delete:', deleteButtons);
// Loop through each delete button and attach the event listener
deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', async (event) => {
    event.preventDefault(); 
     if (event.target.classList.contains('remove-button')) {
        const recipeId = event.target.getAttribute('data-recipe-id');
        console.log('Recipe ID to delete:', recipeId);
 
    const response = await fetch(`/edit/${recipeId}`, {
      method: 'DELETE',
    });
    if (response.ok){
        document.location.replace('/')
    } else {
        alert('Failed to delete favorite');
    }
    }
  });
    
});