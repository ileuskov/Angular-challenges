import { FormControl } from '@angular/forms';
//Reusable custom validator

//naming doesn't matter. But 'restrictedWords: 'foo'' matters
// this outer function is not a validator yet. But it returns a validator function
export function restrictedWordsValidator(words: any) {
  //returning a validator function
  return (control: FormControl) => {
    //if no words passed in, then validate nothing
    if (!words) return null;

    //stores all the invalid words that need to be restricted
    const invalidWords = words
      // mapping all the words passed in as parameters and check if control.value includes them
      .map((w: any) => (control.value.includes(w) ? w : null))
      //filter out the nulls
      .filter((w: any) => w != null);

    //return all the invalid words as restricted words for angular. Separate them with comma
    return invalidWords && invalidWords.length > 0
      ? { restrictedWords: invalidWords.join(', ') }
      : null;
  };
}
