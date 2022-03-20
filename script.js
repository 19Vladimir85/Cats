function createRate(rate, card) {
    const divRate = document.createElement("div");
    divRate.classList.add("card_rate", "inp");
    divRate.setAttribute("name", "rate");
    for (let i = 0; i < 10; i++) {
      const img = document.createElement("img");
      if (rate > i) {
        img.setAttribute("src", "/img/cat-fill.svg");
        img.setAttribute("id", "true");
      } else {
        img.setAttribute("src", "/img/cat-stroke.svg");
        img.setAttribute("id", "false");
      }
  
      card.appendChild(divRate);
    }
  }
  
  function createCard(cat) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", cat.id);
  
    const name = document.createElement("div");
    name.classList.add("card_name", "inp");
    name.innerText = cat.name || "Безымянный";
    name.setAttribute("name", "name");
  
    const age = document.createElement("div");
    age.classList.add("card_age", "inp");
    age.innerText = cat.age || "Возраст не определен";
    age.setAttribute("name", "age");
  
    const descripton = document.createElement("div");
    descripton.classList.add("card_descripton", "inp");
    descripton.innerText = cat.descripton || "Без описания";
    descripton.setAttribute("name", "description");
  
    const favourite = document.createElement("div");
    favourite.classList.add("card_favourite", "inp");
    favourite.innerText = cat.favourite || false;
    favourite.setAttribute("name", "favourite");
    // if(cat.favourite) {
  
    // } else {
  
    // }
  
    const img = document.createElement("img");
    img.classList.add("card_img", "inp");
    img.classList.add("name", "img");
    img.setAttribute("src", cat.img_link);
  
    const deleteIcon = document.createElement("div");
    deleteIcon.innerText = "X";
    deleteIcon.setAttribute("class", "delete");
    deleteIcon.setAttribute("name", cat.id);
    deleteIcon.onclick = (e) => deleteCat(cat.id);
  
    const updateIcon = document.createElement("div");
    updateIcon.innerText = "Update";
    updateIcon.setAttribute("class", "update");
    updateIcon.setAttribute("name", cat.id);
    updateIcon.onclick = (e) => updateCat(cat.id, card);
  
    const container = document.querySelector(".container");
    container.appendChild(card);
    card.appendChild(name);
    card.appendChild(age);
    card.appendChild(descripton);
    card.appendChild(favourite);
    card.appendChild(img);
    card.appendChild(deleteIcon);
    card.appendChild(updateIcon);
    createRate(cat.rate, card);
  }
  
  function createCat() {
    const addCat = document.querySelector("#addCat");
    const inputs = addCat.querySelectorAll("input");
    const button = addCat.querySelectorAll(".addCatButton");
  
    //   addCat.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     const bodyJSON = {};
    //     inputs.forEach((input) => {
    //       if (input.name === "favourite") {
    //         bodyJSON[input.name] = input.checked;
    //       } else {
    //         bodyJSON[input.name] = input.value;
    //       }
    //     });
  
    //     api.addCat(bodyJSON);
    //   });
  
    button.onclick = (e) => {
      e.preventDefault();
      const bodyJSON = {};
      inputs.forEach((input) => {
        if (input.name === "favourite") {
          bodyJSON[input.name] = input.checked;
        } else {
          bodyJSON[input.name] = input.value;
        }
      });
  
      api.addCat(bodyJSON);
    };
  }
  
  function deleteCat(id) {
    console.log("delete cat", id);
    //   api.deleteCat(id).then((e) => showAllCats());
  }
  
  function updateCat(id, card) {
    const divs = card.querySelectorAll(".inp");
    console.log("i am here", id, card, divs);
  
    divs.forEach((div) => {
      const input = document.querySelector("input");
      const name = div.getAttribute("name");
      if (name === "favoutite") {
        input.setAttribute("type", "checkbox");
        input.checked = Boolean(div.innerText);
      }
      if (name === "age" || name === "rate") {
        input.setAttribute("type", "number");
        input.value = div.innerText;
      } else {
        input.setAttribute("type", "text");
        input.value = div.innerText;
      }
      div.appendChild(input);
    });
  }
  
  function showAllCats() {
    api
      .getAllCats()
      .then((dataFromBack) => dataFromBack.data.filter((el) => el.id))
      .then((cats) => {
        cats.forEach((cat) => createCard(cat));
      });
  }
  
  showAllCats();