
interface todoRegex {
  [key: string]: RegExp
}

export class QueryHelper {

  static bodyToRegex(body: any): todoRegex {
    let filterRegex: todoRegex = {};
    for (let [key, value] of Object.entries(body)) {
      let regExp = new RegExp('' + value);
      filterRegex[key] = regExp;
    }
    return filterRegex;
  }

  static addNotExistsOrMatchtValue(baseFilter: any, valueName: string, value: any) {
    let filterA: any = Object.assign({}, baseFilter);
    filterA[valueName] = {$exists: false};
    let filterB: any = Object.assign({}, baseFilter);
    filterB[valueName] = value;
    return {$or: [filterA, filterB]}
  }
}
