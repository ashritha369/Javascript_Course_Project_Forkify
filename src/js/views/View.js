import icons from "url:../../img/icons.svg"; //parcel 2

export default class View {
  //   declaring data
  _data;
  // here render will receive all data(i.e model.state.recipe) from API( by controller.js) and will set data to this. #data
  render(data) {
    // if there is no data then we have to return error data immediately (this case appears when we try to search query which is not in data ex: fgdbccshcb in search box)
    //case: 1 --> !data--> checks for null or undefined
    //case : 2 --> (Array.isArray(data) && data.length === 0) --> if recevied data is [] i.e empty array
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
  //RENDER SPINNER
  //Here "renderSpinner" is a public method
  renderSpinner() {
    const markup = ` <div class="spinner">
                        <svg>
                          <use href="${icons}#icon-loader"></use>
                        </svg>
                    </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // ERROR MESSAGE
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    // clearing the parent element
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // SUCCESS MESSAGE
  renderMessage(message = this._successMessage) {
    const markup = `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    // clearing the parent element
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
