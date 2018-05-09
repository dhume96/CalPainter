import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core'
import { MatCalendar } from '@angular/material/datepicker';

@Injectable()
export class PainterService {

  factoryResolver: ComponentFactoryResolver;
  rootViewContainer

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicComponent(minDate: Date, maxDate: Date) {
    let mat = MatCalendar;
    const factory = this.factoryResolver
                        .resolveComponentFactory(MatCalendar)
    const component = factory
      .create(this.rootViewContainer.parentInjector)
    
      component.instance.minDate = minDate;
      component.instance.maxDate = maxDate;

    this.rootViewContainer.insert(component.hostView)
  }

  clear() {
    this.rootViewContainer.clear();
  }
}
