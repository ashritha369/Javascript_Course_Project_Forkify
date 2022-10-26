class SearchView {
  _parentEl = document.querySelector(".search");

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
  }

  //   Publisher and subscriber model
  addhandlerSearch(handler) {
    // we add event listener to parent element and there will listen to submit event
    this._parentEl.addEventListener("submit", function (e) {
      // we know that default behavior of form is when we submit it , it will reload the page, we want to prevent it so
      e.preventDefault();
      //   calling handler function as below
      handler();
    });
  }
}
// exporting the instance of class
export default new SearchView();
