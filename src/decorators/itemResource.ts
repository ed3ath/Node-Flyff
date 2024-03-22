export function DataMember(options: {
  name: string;
  defaultValue?: any;
}): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    // Define getter and setter for the property
    Object.defineProperty(target, propertyKey, {
      get() {
        // Read value from instance property
        return this[`__${String(propertyKey)}__`] ?? options.defaultValue;
      },
      set(value) {
        // Write value to instance property
        this[`__${String(propertyKey)}__`] = value;
      },
      enumerable: true, // Make it enumerable for serialization
      configurable: true, // Make it configurable
    });
  };
}

// Decorator for marking a property to be ignored during data transformation
export function IgnoreDataTransformation(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    // Define getter and setter for the property
    Object.defineProperty(target, propertyKey, {
      get() {
        // Read value from instance property
        return this[`__${String(propertyKey)}__`];
      },
      set(value) {
        // Write value to instance property
        this[`__${String(propertyKey)}__`] = value;
      },
      enumerable: false, // Make it non-enumerable
      configurable: true, // Make it configurable
    });
  };
}
