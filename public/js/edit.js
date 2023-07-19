const updateButtons = document.querySelectorAll('.updateButtom');

updateButtons.forEach(updateButton => {
  updateButton.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (event.target.classList.contains('updateButtom')) {
      const thoughtId = event.target.getAttribute('data-updateThough-id');
      // const newThought = event.target.getAttribute('updateThought');

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
