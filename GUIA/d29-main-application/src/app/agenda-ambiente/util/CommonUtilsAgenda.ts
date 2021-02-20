


export class CommonUtilsAgenda {


  constructor() {}

  static removeSelector() {
    var selector = document.getElementsByClassName("ui-chkbox ui-widget");
    selector[0].setAttribute("style", "display: none");
  }

}
