// const commentButton = document.querySelectorAll('.addcommentButtom');
// console.log('button update:', commentButton);
// commentButton.forEach(addcommentButtom => {
   
//     addcommentButtom.addEventListener('click', async (event) => {
//     event.preventDefault();

//     if (event.target.classList.contains('addcommentButtom')) {
//       const thoughtId = event.target.getAttribute('addComment-id');
//       const newcomment = document.querySelector('.addThought').value;
      
//       const data = {
//         text: newcomment
//       };
//       const response = await fetch(`/comment/${thoughtId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//       });

//       try {
//         const responseData = await response.json();
//         document.location.create(`/comment/${thoughtId}`);
//       } catch (err) {
//         console.error('Error updating note:', err);
//       }
//     } else {
//       console.error('Error: New thought is empty');
//     }
//   });
// });