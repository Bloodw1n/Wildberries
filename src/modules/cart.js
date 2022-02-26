const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeBtn = cart.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods");
  const modalForm = document.querySelector(".modal-form");
  const totalPrice = document.querySelector(".card-table__total");

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.filter((good) => {
      return good.id !== id;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };
  // реализация метода удаления товара из корзины

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };
  // реализация метода увеличения числа товара в корзине

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.map((good) => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--;
        }
      }
      return good;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };
  // реализация метода уменьшения числа товара в корзине

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find((good) => good.id === id);
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    if (cart.some((good) => good.id === clickedGood.id)) {
      console.log("увеличить");
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };
  // реализация метода добавления товара в корзину

  if (goodsContainer) {
    goodsContainer.addEventListener("click", (event) => {
      const buttonToCart = event.target.closest(".add-to-cart");
      const goodId = buttonToCart.dataset.id;

      addToCart(goodId);
    });
  }
  // отлавливание нужного родительского класса

  cart.addEventListener("click", (event) => {
    if (
      !event.target.closest(".modal") &&
      event.target.classList.contains("overlay")
    ) {
      cart.style.display = "";
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cart.style.display = "";
    }
  });

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = "";

    const totalPriceArray = [];

    goods.forEach((good) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${good.name}</td>
      <td>${good.price}</td>
      <td><button class="cart-btn-minus"">-</button></td>
      <td>${good.count}</td>
      <td><button class=" cart-btn-plus"">+</button></td>
      <td>${+good.price * +good.count}</td>
      <td><button class="cart-btn-delete"">x</button></td>
      `;

      cartTable.append(tr);

      tr.addEventListener("click", (event) => {
        if (event.target.classList.contains("cart-btn-minus")) {
          minusCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-plus")) {
          plusCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-delete")) {
          deleteCartItem(good.id);
        }
      });

      totalPriceArray.push(`${+good.price * +good.count}`);
    });

    const finalPrice = totalPriceArray.reduce(
      (previousValuev, currentValue) => previousValuev + Number(currentValue),
      0
    );
    totalPrice.textContent = `${finalPrice}`;
  };

  const sendForm = () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cart,
        name: "",
        phone: "",
      }),
    }).then(() => {
      cart.style.display = "";
    });
  };

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendForm();
  });

  cartBtn.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    renderCartGoods(cartArray);

    cart.style.display = "flex";
  });
  closeBtn.addEventListener("click", () => (cart.style.display = ""));
};

export default cart;

//инкапсуляция кода
