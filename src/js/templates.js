import data from "./data.js";

const header = (content, page) => {
  const h4 = document.createElement("h4");
  h4.classList.add("header");
  h4.innerHTML = `
    <p class="title">${content}</p>
    <p class="page">Шаг ${page}/${data.length}</p>
    `;
  return h4;
};
// -----------------Radio card inputs----------------------

export const radio = (content, value) => {
  const label = document.createElement("label");
  label.classList.add("option");
  const id = Math.floor(Math.random() * 10000 * value);
  label.innerHTML = `
    <label for=${id}> ${content} </label>
    <input id=${id} type="radio" class="radio-input" name="answer" value="${value}" />
    <label class="custom-radio" for=${id}> </label>`;
  if (value === 1) label.required = true;

  return label;
};

// -----------------Main card template----------------------

export const container = (type, content, page, variants, selectType) => {
  const container = document.createElement("div");
  const form = document.createElement("form");
  const h4 = header(content, page);
  const className = type === "radio" ? "radio" : type === "select" ? "select" : "submit";

  container.classList.add("quiz-card");
  container.classList.add(className);

  container.append(h4);
  //Form
  const gridCols = `repeat(${variants.length > 4 ? "2" : "1"},1fr)`;
  form.classList.add(`${className}-form`);
  form.style.gridTemplateColumns = gridCols;
  // -----------------Quiz variants----------------------

  //radio
  if (type === "radio") {
    variants.forEach((variant) => {
      form.append(radio(variant, variants.indexOf(variant) + 1));
    });
  }

  //select
  if (type === "select") {
    form.innerHTML = `
        <div class="select-container">
              <span>${selectType}</span>
            <i class="fas fa-angle-down"></i>
          </div>
          <div class="options-list">
          </div>
    `;
    const optionsList = form.querySelector(".options-list");
    variants.forEach((variant) => {
      const option = document.createElement("div");
      option.classList.add("select-option");
      option.innerHTML = variant;
      optionsList.append(option);
    });
    form.append(optionsList);
  }

  //submit
  if (type === "submit") {
    form.innerHTML = `
   <input
   type="fname"
   autocomplete="given-name"
   class="input-name"
   placeholder="Как вас зовут?"/>
   <input
   type="tel"
   autocomplete="tel"
   class="input-phone"
   placeholder="Номер телефона"/>
   <input type="email" autocomplete="on" class="input-email" placeholder="E-mail" />
   <button class="btn submit-button">Получить подборку</button>
   <p class='caption'>Нажимая на кнопку, вы даете согласие на обработку своих <span> Персональных данных </span> </p>
`;
  }

  container.append(form);
  // -----------------Buttons----------------------

  return container;
};

export const buttonsContainer = (index) => {
  const next = document.createElement("button");
  const prev = document.createElement("button");
  const container = document.createElement("div");

  container.classList.add("card-buttons");
  next.classList.add("btn", "next");
  prev.classList.add("btn", "prev");
  next.setAttribute("disabled", true);

  if (index === 0) prev.style.visibility = "hidden";

  next.innerHTML = `Далее <i class="fa-solid fa-angle-right"></i>`;
  prev.innerHTML = `<i class="fa-solid fa-angle-left"></i>Назад`;

  container.append(prev);
  container.append(next);

  return container;
};

export const submitForm = () => {
  const form = document.createElement("form");
  form.classList.add("submit-form");
  const title = "Ваша подборка готова! 🥳 Куда нам отправить её?";
  const h4 = header(title, data.length);
  form.append(h4);
  form.innerHTML += `
        <input
        type="fname"
        autocomplete="given-name"
        class="input-name"
        placeholder="Как вас зовут?"/>
        <input
        type="tel"
        autocomplete="tel"
        class="input-phone"
        placeholder="Номер телефона"/>
        <input type="email" autocomplete="on" class="input-email" placeholder="E-mail" />
        <button class="submit-button">Получить подборку</button>
    `;

  return form;
};
