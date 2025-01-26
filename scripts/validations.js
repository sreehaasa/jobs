function validateForm() {
    let x = document.forms["signUp"]["fname"].value;
    if (x == "") {
      alert("You must fill out your name");
      return false;
    }
  }