const words = ['Food items' , 'Clothes items', 'Electronic items']; // Add more words here if needed
 let wordIndex = 0;
 let letterIndex = 0;
 let currentWord = '';
 let typingSpeed = 100; // Adjust typing speed here  
 function type() {
 if (letterIndex <= currentWord.length) {
     document.getElementById('dynamic-text').textContent = currentWord.substring(0, letterIndex);
     letterIndex++;
     setTimeout(type, typingSpeed);
 } else {
     setTimeout(erase, 1000);
 }
 }   
 function erase() {
 if (letterIndex >= 0) {
     document.getElementById('dynamic-text').textContent = currentWord.substring(0, letterIndex);
     letterIndex--;
     setTimeout(erase, typingSpeed / 2);
 } else {
     wordIndex = (wordIndex + 1) % words.length;
     currentWord = words[wordIndex]; // Convert word to uppercase
     setTimeout(type, 500);
 }
 }   
 setTimeout(type, 1000);