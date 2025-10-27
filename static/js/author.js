document.addEventListener("DOMContentLoaded", function () {
    const titles = [
      "Red Team Enthusiast",
      "Somewhere Between 0's and 1's",
      "Let's Hack the Planet",
      "Bug Bounty Hunter",
      "Phishing for Fun and Profit",
      "White Hat Warrior"
    ];
  
    let index = 0;
    let charIndex = 0;
    const speed = 80;
    const titleElement = document.querySelector(".author-title");
  
    function typeEffect() {
      if (charIndex < titles[index].length) {
        titleElement.innerHTML = titles[index].substring(0, charIndex + 1) + `<span class="cursor"></span>`;
        charIndex++;
        setTimeout(typeEffect, speed);
      } else {
        setTimeout(eraseEffect, 1200);
      }
    }
  
    function eraseEffect() {
      if (charIndex > 0) {
        titleElement.innerHTML = titles[index].substring(0, charIndex - 1) + `<span class="cursor"></span>`;
        charIndex--;
        setTimeout(eraseEffect, speed / 2);
      } else {
        index = (index + 1) % titles.length;
        setTimeout(typeEffect, speed);
      }
    }
  
    typeEffect();
});
