async function getCategories(event) {
    closeSidebar()
    removeSearchBox()
    removeContainer()
    event.preventDefault()
    toggleSpinner()
    let data = await fetchRequest("https://www.themealdb.com/api/json/v1/1/categories.php")
    if (data.categories != null) {
        let cols = '<div class="row py-4 g-4 mt-4">'
        for (let i = 0; i < data.categories.length; i++) {
            cols += ` <div class="col-md-3 col-sm-12">
            <div class="cat-item ">
                <img src="${data.categories[i].strCategoryThumb}" class="w-100 rounded-2" alt="not-loaded">
                <div class="cat-info-item rounded-2">
                    <div class="cat-content-info" onclick="filterByCategory('${data.categories[i].strCategory}')">
                        <h3 class="text-center ">${data.categories[i].strCategory}</h3>
                        <p class="text-center">${cutDescription(data.categories[i].strCategoryDescription)}</p>
                    </div>
                </div>
            </div>
        </div>`

        }
        cols += '</div>'
        toggleSpinner()
        document.querySelector(".container").innerHTML = cols
    }
}

function cutDescription(desc) {
    let str = ""
    let count = 0
    for (let i = 0; i < desc.length; i++) {
        if (desc[i] == " ") {
            if (++count == 20) {
                break
            }
        }
        str += desc[i]
    }
    return str
}

async function getArea(event) {
    closeSidebar()
    removeSearchBox()
    removeContainer()
    event.preventDefault()
    toggleSpinner()
    let data = await fetchRequest("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    if (data.meals != null) {
        let cols = '<div class="row py-5 mt-4">'
        for (let i = 0; i < data.meals.length; i++) {
            cols += `<div class="col-md-3 py-2 mx-auto ">
            <div class="reogin text-white text-center" onclick="filterByArea('${data.meals[i].strArea}')">
                <i class="fa-solid fa-house-laptop "></i>
                <h2>${data.meals[i].strArea}</h2>
            </div>
         </div>`
        }
        cols += '</div>'
        toggleSpinner()
        document.querySelector(".container").innerHTML = cols
    }

}

async function getIngredients(event) {
    closeSidebar()
    removeSearchBox()
    removeContainer()
    event.preventDefault()
    toggleSpinner()
    let data = await fetchRequest("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    if (data.meals != null) {
        let length = data.meals.length > 20 ? 20 : data.meals.length
        let cols = '<div class="row py-5 mt-4">'
        for (let i = 0; i < length; i++) {
            if (data.meals[i].strDescription != null && data.meals[i].strDescription.trim() != "") {
                cols += ` <div class="col-md-3 ">
                <div class="reogin text-white text-center" onclick="filterByIngredients('${data.meals[i].strIngredient}')">
                    <i class="fa-solid fa-drumstick-bite"  ></i>
                    <h3>${data.meals[i].strIngredient}</h3>
                <p>
                ${cutDescription(data.meals[i].strDescription)}
                </p>
                </div>
            </div>`
            }
        }
        cols += '</div>'
        toggleSpinner()
        document.querySelector(".container").innerHTML = cols
    }
}

async function searchByName() {
    removeContainer()
    toggleSpinner()
    const nameInput = document.querySelector('#search-box input[placeholder="Search By Name"]');
    const name = nameInput.value;
    let data = await fetchRequest(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    if (data.meals != null) {
        setMeals(data.meals)

    }

}

async function searchByFirstLetter() {
    removeContainer()
    toggleSpinner()
    const letterInput = document.querySelector('#search-box input[placeholder="Search By First Letter"]');
    const letter = letterInput.value;
    let data = await fetchRequest(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    if (data.meals != null) {
        setMeals(data.meals)
    }
}

async function Search(event) {
    closeSidebar()
    removeContainer()
    event.preventDefault();
    document.querySelector("#search-box").innerHTML = `
            <div class="col-md-5 mt-5">
                <input type="text" class="form-control p-2 bg-black text-white" onkeyup="searchByName()" placeholder="Search By Name">
            </div>
            <div class="col-md-5 mt-5">
                <input type="text" class="form-control p-2 bg-black text-white" maxlength="1" onkeyup="searchByFirstLetter()" placeholder="Search By First Letter">
            </div>
        `
    try {
        await searchByName();
    } catch (ex) {
        console.error(ex);
    }
}

async function filterByCategory(categoryName) {
    removeSearchBox()
    removeContainer()
    toggleSpinner()
    let data = await fetchRequest(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    if (data.meals != null) {
        setMeals(data.meals)
    }

}

async function filterByArea(areaName) {
    removeSearchBox()
    removeContainer()
    toggleSpinner()
    let data = await fetchRequest(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
    if (data.meals != null) {
        setMeals(data.meals)
    }

}

async function filterByIngredients(ingredientsName) {
    removeSearchBox()
    removeContainer()
    toggleSpinner()
    let data = await fetchRequest(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientsName}`)
    if (data.meals != null) {
        setMeals(data.meals)
    }

}

async function getMealDetails(mealID) {
    closeSidebar()
    removeSearchBox()
    removeContainer()
    toggleSpinner()
    let data = await fetchRequest(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    if (data.meals != null) {
        setMealDetails(data.meals[0])
    }
}

function toggleSpinner() {
    document.querySelector(".spinner").classList.toggle("in-active")
}

function removeSearchBox() {
    document.querySelector("#search-box").innerHTML = ""
}

function removeContainer() {
    document.querySelector(".container").innerHTML = ""
}

function setMeals(meals) {
    let length = meals.length
    let cols = '<div class="row py-4 g-4 mt-4">'
    for (let i = 0; i < length; i++) {
        cols += ` <div class="col-md-3">
            <div class="item ">
              <img src="${meals[i].strMealThumb}" class="w-100 rounded-2" alt="not-loaded">
              <div class="info-item rounded-3" onclick="getMealDetails(${meals[i].idMeal})">
                  <div class="content-info" >
                  <h3 class="">${meals[i].strMeal}</h3>
                  </div>
              </div>
            </div>
          </div>`
    }
    cols += `</div>`
    toggleSpinner()
    document.querySelector(".container").innerHTML = cols
}

function setMealDetails(meal) {
    let cols = ` <div class="details">
    <div class="row p-5 mt-4">
        <div class="col-md-4">
            <div class="photo">
                <img src="${meal.strMealThumb}" class="w-100 rounded-2" alt="not-loaded">
                <h2>${meal.strMeal}</h2>
            </div>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p class="">${meal.strInstructions}</p>

            <h3>Area : ${meal.strArea}</h3>
            <h3>Category : ${meal.strCategory}</h3>
            <h3>Recipes :</h3>
            
            <ul class="d-flex flex-wrap p-0">`;
    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`
        const measureKey = `strMeasure${i}`
        if (meal[measureKey] !== null && meal[measureKey].trim() !== "") {
            cols += `<li>${meal[measureKey]} ${meal[ingredientKey]}</li>`;
        }
    }
    cols += `</ul>
            <h2 class="mt-4">Tags :</h2>`
    if (meal.strTags != null && meal.strTags != "") {
        let tags = meal.strTags.split(",")
        for (let i = 0; i < tags.length; i++) {
            cols += `<span style="color: red;" class="p-2 bg-white rounded-2 d-inline-block mt-2 me-2">${tags[i]}</span>`
        }

    }

    cols += `<div class="botton mt-4">
            <a class="btn btn-success" href="${meal.strSource}" target="_blank">Source</a>
            <a class="btn btn-danger"  href="${meal.strYoutube}" target="_blank">YouTube</a>
           </div>
        </div>

    </div>
    </div>`

    toggleSpinner()
    document.querySelector(".container").innerHTML = cols
}

async function fetchRequest(url) {
    let respone = await fetch(url)
    let data = await respone.json()
    return data
}

function validateName() {
    let nameInput = document.getElementById("user-name")
    let nameError = document.getElementById("name-error")
    const nameRegex = /^[A-Za-z\s]+$/;
    if (nameRegex.test(nameInput.value)) {
        if (!nameError.classList.contains("in-active")) {
            nameError.classList.add("in-active")
        }
        return true
    }
    if (nameError.classList.contains("in-active")) {
        nameError.classList.remove("in-active")
    }
    return false

}

function validateEmail() {
    let emailInput = document.getElementById("user-email")
    let emailError = document.getElementById("email-error")
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (emailRegex.test(emailInput.value)) {
        if (!emailError.classList.contains("in-active")) {
            emailError.classList.add("in-active")
        }
        return true
    }
    if (emailError.classList.contains("in-active")) {
        emailError.classList.remove("in-active")
    }
    return false
}

function validatePhone() {
    let phoneInput = document.getElementById("user-phone")
    let phoneError = document.getElementById("phone-error")
    const phoneRegex = /^0\d{10,11}$/;
    if (phoneRegex.test(phoneInput.value)) {
        if (!phoneError.classList.contains("in-active")) {
            phoneError.classList.add("in-active")
        }
        return true
    }
    if (phoneError.classList.contains("in-active")) {
        phoneError.classList.remove("in-active")
    }
    return false

}

function validateAge() {
    let ageInput = document.getElementById("user-age")
    let ageError = document.getElementById("age-error")
    const ageRegex = /^(?!0)\d{1,2}$/;
    if (ageRegex.test(ageInput.value)) {
        if (!ageError.classList.contains("in-active")) {
            ageError.classList.add("in-active")
        }
        return true
    }
    if (ageError.classList.contains("in-active")) {
        ageError.classList.remove("in-active")
    }
    return false
}

function validatePassword() {
    let passInput = document.getElementById("user-pass")
    let passError = document.getElementById("pass-error")
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (passwordRegex.test(passInput.value)) {
        if (!passError.classList.contains("in-active")) {
            passError.classList.add("in-active")
        }
        return true
    }
    if (passError.classList.contains("in-active")) {
        passError.classList.remove("in-active")
    }
    return false
}

function validateRepassword() {
    let repassInput = document.getElementById("uesr-repass")
    let passInput = document.getElementById("user-pass")
    let repassError = document.getElementById("repass-error")
    console.log(repassInput);
    console.log(passInput);
    if (repassInput.value == passInput.value) {
        if (!repassError.classList.contains("in-active")) {
            repassError.classList.add("in-active")
        }
        return true
    }
    if (repassError.classList.contains("in-active")) {
        repassError.classList.remove("in-active")
    }
    return false
}

function validate() {
    let submitInput = document.getElementById("submit")
    if (validateName() && validateEmail() && validatePhone() && validateAge() && validatePassword() && validateRepassword()) {
        submitInput.disabled = false
    } else {
        submitInput.disabled = true
    }
}

function validateInput(inputNumber) {
    let nameInput = document.getElementById("user-name")
    let emailInput = document.getElementById("user-email")
    let phoneInput = document.getElementById("user-phone")
    let ageInput = document.getElementById("user-age")
    let passInput = document.getElementById("user-pass")
    let repassInput = document.getElementById("uesr-repass")

    switch (inputNumber) {
        case 1:
            validateName()
            break;
        case 2:
            validateEmail()
            break;
        case 3:
            validatePhone()
            break;
        case 4:
            validateAge()
            break;
        case 5:
            validatePassword()
            break;
        case 6:
            validateRepassword()
            break;


    }
    if (nameInput.value != "" && emailInput.value != "" && phoneInput.value != "" && ageInput.value != "" && passInput.value != ""
        && repassInput.value != "") {
        validate()
    }
}

function contactUs(event) {
    event.preventDefault()
    document.querySelector(".container").innerHTML = `<div class="row d-flex justify-content-center align-content-center g-4 pt-4 vh-100">
    <div class="col-md-5  ">
        <input type="text" onkeyup="validateInput(1)" name="userName" class="form-control p-2 " id="user-name" placeholder="Enter Your Name">
        <p class="alert alert-danger text-center mt-2 in-active" id="name-error">Special characters and numbers not allowed</p>
    </div>
    <div class="col-md-5">
        <input type="email" onkeyup="validateInput(2)" class="form-control p-2 " id="user-email" placeholder="Enter Your Email">
        <p class="alert alert-danger text-center mt-2 in-active " id="email-error">Email not valid *exemple@yyy.zzz</p>
    </div>
    <div class="col-md-5  ">
        <input type="tel" onkeyup="validateInput(3)" class="form-control p-2 " id="user-phone" placeholder="Enter Your Phone">
        <p class="alert alert-danger text-center mt-2 in-active" id="phone-error">  Enter valid Phone Number</p>
    </div>
    <div class="col-md-5">
        <input type="number" onkeyup="validateInput(4)" class="form-control p-2 " id="user-age" placeholder="Enter Your Age">
        <p class="alert alert-danger text-center mt-2 in-active" id="age-error">  Enter valid age</p>
    </div>
    <div class="col-md-5  ">
        <input type="password" onkeyup="validateInput(5)"  class="form-control p-2 " id="user-pass" placeholder="Enter Your Password">
        <p class="alert alert-danger text-center mt-2 in-active" id="pass-error">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
    </div>
    <div class="col-md-5 ">
        <input id="uesr-repass" type="password"  onkeyup="validateInput(6)" class="form-control p-2 "  placeholder="Repassword">
        <p class="alert alert-danger text-center mt-2 in-active" id="repass-error" >Enter valid repassword</p>
    </div>
    <div class="d-flex justify-content-center align-content-center  mt-4">
    <button class="btn btn-outline-danger fs-6" disabled="true" id="submit">Submit</button>
    </div>
   </div>`
    closeSidebar()

}


function closeSidebar() {
    document.querySelector("#close").classList.add("in-active")
    document.getElementById("open").classList.remove("in-active")
    document.querySelector("nav").classList.remove("open")
    $("#links li:nth(0)").fadeOut();
    $("#links li:nth(1)").fadeOut();
    $("#links li:nth(2)").fadeOut();
    $("#links li:nth(3)").fadeOut();
    $("#links li:nth(4)").fadeOut();
}
function openSidebar() {
    document.getElementById("open").classList.add("in-active")
    document.querySelector("#close").classList.remove("in-active")
    document.querySelector("nav").classList.add("open")
    $("#links li:nth(0)").fadeIn(1000);
    $("#links li:nth(1)").fadeIn(1700);
    $("#links li:nth(2)").fadeIn(2400);
    $("#links li:nth(3)").fadeIn(3000);
    $("#links li:nth(4)").fadeIn(3500);

}

(async function mealsDefult() {
    toggleSpinner()
    let data = await fetchRequest(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    if (data.meals != null) {
        document.querySelector("nav").classList.remove("in-active")
        setMeals(data.meals)
    }
})()