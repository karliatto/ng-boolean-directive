import { Directive, Input, forwardRef, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

/**
 * It maches all the inputs with checkbox type that include the booleanValue directive
 * <input type="checkbox" booleanValue trueValue="yes" falseValue="nope">
 */
@Directive({
  selector: 'input[type=checkbox][booleanValue]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BooleanValueDirective),
      multi: true
    }
  ]
})
export class BooleanValueDirective implements ControlValueAccessor {
  @Input() trueValue = true;
  @Input() falseValue = false;
  private propagateChange = (_: any) => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('change', ['$event'])
  onHostChange(ev) {
    this.propagateChange(ev.target.checked ? this.trueValue : this.falseValue);
  }

  /**
    Writes a new value to the element.
    This method will be called by the forms API to write to the view when programmatic (model -> view) changes are requested.
   */
  writeValue(obj: any): void {
    console.log('writeValue obj', obj);
    if (obj === this.trueValue) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'checked', true);
    } else {
      this.renderer.setProperty(this.elementRef.nativeElement, 'checked', false);
    }
  }

  /**
    Registers a callback function that should be called when the control's value changes in the UI.
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  /**
    Registers a callback function that should be called when the control receives a blur event.
   */
  registerOnTouched(fn: any): void {}


  /**
    This function is called by the forms API when the control status changes to or from "DISABLED".
    Depending on the value, it should enable or disable the appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean): void {}
}
