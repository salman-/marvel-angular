export class CustomFunctions{

  doesNotContainSubstring(mainString: string, substring: string): boolean {
    return mainString.indexOf(substring) === -1;
  }

}
