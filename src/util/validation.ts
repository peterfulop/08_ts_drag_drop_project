interface Validatable {
  name: string;
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export class ValidatableInput {
  constructor(public input: Validatable) {}
  public validate(): boolean {
    let validatableInput: Validatable = this.input;
    let isValid: boolean = true;

    if (validatableInput.required) {
      isValid =
        isValid && validatableInput.value.toString().trim().length !== 0;
      if (!isValid) {
        alert(`${validatableInput.name} kitöltése kötelező!`);
        return false;
      }
    }
    if (
      validatableInput.minLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length > validatableInput.minLength;
      if (!isValid) {
        alert(
          `${validatableInput.name} hossza minimum ${validatableInput.minLength}!`
        );
        return false;
      }
    }
    if (
      validatableInput.maxLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length > validatableInput.maxLength;
      if (!isValid) {
        alert(
          `${validatableInput.name} hossza maximum ${validatableInput.maxLength}!`
        );
        return false;
      }
    }
    if (
      validatableInput.min != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
      if (!isValid) {
        alert(
          `${validatableInput.name} értéke minimum ${validatableInput.min}!`
        );
        return false;
      }
    }
    if (
      validatableInput.max != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
      if (!isValid) {
        alert(
          `${validatableInput.name} értéke maximum ${validatableInput.max}!`
        );
        return false;
      }
    }
    return isValid;
  }
}
