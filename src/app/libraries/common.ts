export class Common {

  public static capitalizeFirstLetter(text: string){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  public static breakCamelCase(text: string){
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}

