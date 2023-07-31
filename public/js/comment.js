const updateButtons = document.querySelectorAll('.updateButtom');
console.log('button update:', updateButtons);
updateButtons.forEach(updateButton => {
   
  updateButton.addEventListener('click', async (event) => {
    event.preventDefault();

    if (event.target.classList.contains('updateButtom')) {
      const thoughtId = event.target.getAttribute('updateThought-id');
      const newTitle = document.querySelector('.updateTitle').value;
      const newText = document.querySelector('.updateThought').value;
      console.log('this is a new text',newText);
      const data = {
        title: newTitle,
        text: newText
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
        document.location.replace(`/edit/${thoughtId}`);
      } catch (err) {
        console.error('Error updating note:', err);
      }
    } else {
      console.error('Error: New thought is empty');
    }
  });
});