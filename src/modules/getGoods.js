const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");
  const viewAll = document.querySelector(".more");

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector(".long-goods-list");

    goodsContainer.innerHTML = "";

    goods.forEach((good) => {
      const goodBlock = document.createElement("div");

      goodBlock.classList.add("col-lg-3");
      goodBlock.classList.add("col-sm-6");

      goodBlock.innerHTML = `
      <div class="goods-card">
      <span class="label${good.label ? null : "d-none"}">${good.label}</span>
      <img
        src="db/${good.img}"
        alt="${good.name}"
        class="goods-image"
      />
      <h3 class="goods-title">${good.name}</h3>
      <p class="goods-description">${good.description}</p>
      <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
        <span class="button-price">$${good.price}</span>
      </button>
    </div>
    `;
      goodsContainer.append(goodBlock);
    });
  };

  const getData = (value, category) => {
    fetch("/db/db.json") // работа с локальными файлами
      .then((res) => res.json()) //ответ от сервера
      .then((data) => {
        const array = category
          ? data.filter((item) => item[category] === value)
          : data; // возвращает только true

        localStorage.setItem("goods", JSON.stringify(array)); // сохраняемя полученные с сервера данные в локальное хранилище
        if (window.location.pathname !== "/goods.html") {
          window.location.href = "/goods.html";
        } else {
          renderGoods(array);
        }
      });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // предотвращаем стандартное поведение event
      const linkValue = link.textContent;
      const category = link.dataset.field;

      getData(linkValue, category);
    });
  });

  if (
    localStorage.getItem("goods") &&
    window.location.pathname === "/goods.html"
  ) {
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  }

  if (viewAll) {
    viewAll.addEventListener("click", (event) => {
      event.preventDefault();
      getData();
    });
  }
};

export default getGoods;
