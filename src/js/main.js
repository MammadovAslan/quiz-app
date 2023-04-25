import data from "./data.js";
import "../css/style.css";

import { buttonsContainer, container } from "./templates.js";

const cardsContainer = document.querySelector("#cards-container");
const modal = document.querySelector(".modal-message");
const loader = document.querySelector(".loader");
let currentCardIndex = 0;
let currentCard = data[currentCardIndex];

// -----------------Next question----------------------
const nextCard = () => {
  if (currentCardIndex < data.length) {
    const currentCardElement = document.querySelector(
      `.quiz-card:nth-child(${currentCardIndex + 1})`
    );
    currentCardIndex++;
    currentCard = data[currentCardIndex];
    const nextCardElement = document.querySelector(`.quiz-card:nth-child(${currentCardIndex + 1})`);
    currentCardElement.style.display = "none";
    nextCardElement.style.display = "flex";
  }
};

// -----------------Prev question----------------------

const prevCard = () => {
  if (currentCardIndex > 0) {
    const currentCardElement = document.querySelector(
      `.quiz-card:nth-child(${currentCardIndex + 1})`
    );
    currentCardIndex--;
    currentCard = data[currentCardIndex];
    const prevCardElement = document.querySelector(`.quiz-card:nth-child(${currentCardIndex + 1})`);
    currentCardElement.style.display = "none";
    prevCardElement.style.display = "flex";
  }
};

// -----------------Render cards----------------------

const showCards = () => {
  data.forEach((quiz, ind) => {
    //selectors
    const card = container(quiz.type, quiz.content, quiz.id, quiz.variants, quiz.selectType);
    const buttons = buttonsContainer(ind);
    const next = buttons.querySelector(".next");
    const prev = buttons.querySelector(".prev");
    //events
    next.addEventListener("click", nextCard);
    prev.addEventListener("click", prevCard);
    if (ind !== currentCardIndex) card.style.display = "none";
    if (quiz.type === "radio") {
      card.append(buttons);
      cardsContainer.append(card);

      //set active option in radio
      const radioInputs = card.querySelectorAll(".radio-input");
      radioInputs.forEach((input) => {
        input.addEventListener("change", () => {
          const form = input.closest(".radio-form");
          const labels = form.querySelectorAll(".option");
          labels.forEach((label) => {
            label.classList.remove("active");
          });
          const selectedLabel = input.closest(".option");
          selectedLabel.classList.add("active");
          next.disabled = false;
          nextCard();
        });
      });
    }

    if (quiz.type === "select") {
      card.append(buttons);
      cardsContainer.append(card);

      const select = card.querySelector(".select-container");
      const options_list = card.querySelector(".options-list");
      const options = card.querySelectorAll(".select-option");

      //show & hide options list
      select.addEventListener("click", () => {
        options_list.classList.toggle("active");
        select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
      });

      //select option
      options.forEach((option) => {
        option.addEventListener("click", () => {
          options.forEach((option) => {
            option.classList.remove("selected");
          });
          select.querySelector("span").innerHTML = option.innerHTML;
          option.classList.add("selected");
          options_list.classList.toggle("active");
          select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
          next.disabled = false;
        });
      });
    }

    if (quiz.type === "submit") {
      cardsContainer.append(card);
      const form = card.querySelector("form");

      //   AJAX
      const formSubmit = async (e) => {
        e.preventDefault();
        loader.style.display = "inline-block";
        await new Promise((resolve) => setTimeout(resolve, 3000));
        loader.style.display = "none";
        modal.style.display = "flex";

        await new Promise((resolve) => setTimeout(resolve, 3000));
        modal.style.display = "none";
      };

      form.addEventListener("submit", formSubmit);
    }
  });
};

showCards();
