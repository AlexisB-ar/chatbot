      const form = document.getElementById("chatForm");
      const input = document.getElementById("chatInput");
      const messages = document.getElementById("chatMessages");

      function shuffleWords(text) {
        const words = text.trim().split(/\s+/);
        for (let i = words.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [words[i], words[j]] = [words[j], words[i]];
        }
        return words.join(" ");
      }

      function sublimePhrase(text) {
        let words = text.trim().split(/\s+/);
        const embellishments = ["magnifiquement", "lumineux", "extraordinaire", "harmonieux", "brillant", "inspirant"];

        if (words.length > 3 && Math.random() < 0.5) {
          const removeIndex = Math.floor(Math.random() * words.length);
          words.splice(removeIndex, 1);
        }

        if (Math.random() < 0.7) {
          const addIndex = Math.floor(Math.random() * (words.length + 1));
          const embellishment = embellishments[Math.floor(Math.random() * embellishments.length)];
          words.splice(addIndex, 0, embellishment);
        }

      }

      function randomPhrase() {
        const phrases = [
          "Un développeur peut transformer du café en code ",
          "Le bug d’aujourd’hui est la fonctionnalité de demain ",
          "Apprendre JavaScript, c’est comme apprendre une nouvelle magie ",
          "Chaque commit est une petite victoire dans l’univers du code ",
          "CSS est parfois plus mystérieux que la mécanique quantique ",
          "Un bon algorithme est comme une recette parfaite ",
          "Le code propre est un cadeau pour ton futur toi ",
          "Déboguer, c’est discuter avec ton ordinateur jusqu’à ce qu’il avoue ",
          "Git est ton journal intime du développement ",
          "Un développeur heureux est celui qui a compilé sans erreur "
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
      }

      function addMessage(content, sender = "user") {
        const article = document.createElement("article");
        article.className = `message message--${sender}`;

        const bubble = document.createElement("div");
        bubble.className = "message__bubble";
        bubble.innerHTML = `<p>${content}</p>`;

        if (sender === "bot") {
          const avatar = document.createElement("div");
          avatar.className = "message__avatar";
          avatar.textContent = "🤖";
          article.appendChild(avatar);
          article.appendChild(bubble);
        } else {
          article.appendChild(bubble);
          const avatar = document.createElement("div");
          avatar.className = "message__avatar";
          avatar.textContent = "🧑";
          article.appendChild(avatar);
        }

        messages.appendChild(article);
        messages.scrollTop = messages.scrollHeight;
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userText = input.value.trim();
        if (!userText) return;

        addMessage(userText, "user");

        const rand = Math.random();
        let botReply;
        if (rand < 0.33) {
          botReply = shuffleWords(userText);
        } else if (rand < 0.66) {
          botReply = sublimePhrase(userText);
        } else {
          botReply = randomPhrase();
        }

        setTimeout(() => {
          addMessage(botReply, "bot");
        }, 600);

        input.value = "";
      });
