

export function batchTypeString(type: number) {
    let typeString: string = ""
  switch (type) {
    case 10:
      typeString = "341 Hand written";
      break;
    case 50:
      typeString = "Section 56";
      break;
    case 51:
      typeString = "Section 56 By-Law";
      break;
  }

  return typeString
}
